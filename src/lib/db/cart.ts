import {Cart, CartItem, Prisma} from "@prisma/client";
import {cookies} from "next/dist/client/components/headers";
import prisma from "./prisma";
import {getServerSession} from "next-auth";
import {authOptions} from "@/app/api/auth/[...nextauth]/route";


// this defines the type for the cart  that has products. It includes the data associated with the product
export type CartWithProducts = Prisma.CartGetPayload<{
    include: { items: { include: { product: true } } };
}>;
// this type defines the shopping cart, size is number of items and subtotal is total price of all items in the cart
export type ShoppingCart = CartWithProducts & {
    size: number;
    subtotal: number;
};

//this  type defines getting the data about the item in the cart, we get the data about the product
export type CartItemData = Prisma.CartItemGetPayload<{
    include: { product: true };
}>;

// this function is used to get the cart
/* the shopping cart is stored in local storage if the user is not logged in using cookies
ternary operator is used to check if there is a cart in local storage: localCartId
if there is a cart then we use it otherwise its null ( empty cart)
if cart = localstorage ? cart uses localStorageId: otherwise null */
export async function getCart(): Promise<ShoppingCart | null> {
// if the user is logged in we grab the cart from the database otherwise the cart is what cart is found in local storage
    const session = await getServerSession(authOptions);
    let cart: CartWithProducts | null = null;

    if (session) {
        cart = await prisma.cart.findFirst({
            where: {userId: session.user.id},
            include: {items: {include: {product: true}}},
        })

    } else {
        const localCartId = cookies().get("localCartId")?.value;
        cart = localCartId ?
            await prisma.cart.findUnique({
                where: {id: localCartId},  // stores only the product id
                include: {items: {include: {product: true}}}, // prisma find the product from db
                /* we get the product from the database, not from the local storage, in case the product is updated
                the local storage only stores the product id, not the whole product object
                */
            })
            : null;
    }

    if (!cart) {
        return null;
    }
    const items = cart.items;
    /* This uses JS reduce function to calculate the total number of items in the cart, and the total price in the cart
    item.reduce((total, item)=>{ function for what we want to do with the item}, 0: starting point)
    Quantity: item.reduce((total, item) => {total + item.quantity}, 0)
    Total Price: item.reduce((total, item) => {total + item.quantity * item.price}, 0)*/
    // we return the cart items with the total number of items and the total price
    return {
        ...cart,
        size: items.reduce((total, item) => total + item.quantity, 0),
        subtotal: items.reduce(
            (total, item) => total + item.quantity * item.product.price,
            0
        ),
    };
}

// this function is used to create a new cart
export async function createCart(): Promise<ShoppingCart> {
// checks if the user is logged in and creates and new cart for the user and attaches thhe id of the user to it
// otherwise it will be an anonymous cart
    const session = await getServerSession(authOptions);
    let newCart: Cart;

    if (session) {
        newCart = await prisma.cart.create({
            data: {
                userId: session.user.id
            },
        });
    } else {
        newCart = await prisma.cart.create({
            data: {},
        });

// Note: Needs encryption + secure settings in real production app
// when the user add a new product to the cart, we need to add the product to the local storage if the user is not logged in
        cookies().set("localCartId", newCart.id);
    }
    return {
        ...newCart,
        items: [],
        size: 0,
        subtotal: 0,
    };
}


//send items from anonymous cart to log in cart

export async function mergeAnonymousCartIntoUserCart(userId: string) {
    const localCartId = cookies().get("localCartId")?.value;

    const localCart = localCartId
        ? await prisma.cart.findUnique({
            where: { id: localCartId },
            include: { items: true },
        })
        : null;

    if (!localCart) return;

    const userCart = await prisma.cart.findFirst({
        where: { userId },
        include: { items: true },
    });

    await prisma.$transaction(async (tx) => {
        if (userCart) {
            const mergedCartItems = mergeCartItems(localCart.items, userCart.items);

            await tx.cartItem.deleteMany({
                where: { cartId: userCart.id },
            });

            
            await tx.cart.update({
                where: { id: userCart.id },
                data :{
                    items: {
                        createMany : {
                            data: mergedCartItems.map((item) => ({
                                productId: item.productId,
                                quantity: item.quantity,
                            })),
                        }
                    },
                    updatedAt: new Date(),
                    //TODO ned to add this to all the update queries
                },
            });
        } else {
            await tx.cart.create({
                data: {
                    userId,
                    items: {
                        createMany: {
                            data: localCart.items.map((item) => ({
                                productId: item.productId,
                                quantity: item.quantity,
                            })),
                        },
                    },
                },
            });
        }

        await tx.cart.delete({
            where: { id: localCart.id },
        });
        // throw Error("Transaction failed");
        cookies().set("localCartId", "");
    });
}

function mergeCartItems(...cartItems: CartItem[][]): CartItem[] {
    return cartItems.reduce((total, items) => {
        items.forEach((item) => {
            const existingItem = total.find((i) => i.productId === item.productId);
            if (existingItem) {
                existingItem.quantity += item.quantity;
            } else {
                total.push(item);
            }
        });
        return total;
    }, [] as CartItem[]);
}