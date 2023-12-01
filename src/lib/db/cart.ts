import {Prisma} from "@prisma/client";
import {cookies} from "next/dist/client/components/headers";
import prisma from "./prisma";

export type CartWithProducts = Prisma.CartGetPayload<{
    include: { items: { include: { product: true } } };
}>;

export type ShoppingCart = CartWithProducts & {
    size: number;
    subtotal: number;
};


// create a cart
export async function createCart(): Promise<ShoppingCart> {
    const newCart = await prisma.cart.create({
        data: {},
    });

// Note: Needs encryption + secure settings in real production app
// when the user add a new product to the cart, we need to add the product to the local storage if the user is not logged in
    cookies().set("localCartId", newCart.id);

    return {
        ...newCart,
        items: [],
        size: 0,
        subtotal: 0,
    };
}

// get the cart
/* the shopping cart is stored in local storage if the user is not logged in using cookies
ternary operator is used to check if there is a cart in local storage: localCartId
if there is a cart then we use it otherwise its null ( empty cart)
if cart = localstorage ? cart uses localStorageId: otherwise null */
export async function getCart(): Promise<ShoppingCart | null> {
    const localCartId = cookies().get("localCartId")?.value;
    const cart = localCartId ?
        await prisma.cart.findUnique({
            where: {id: localCartId},
            include: {items: {include: {product: true}}},
        })
        : null;

    if (!cart) {
        return null;
    }
    const items = cart.items;
/* This uses JS reduce function to calculate the total number of items in the cart, and the total price in the cart
item.reduce((total, item)=>{ function for what we want to do with the item}, 0: starting point)
Quantity: item.reduce((total, item) => {total + item.quantity}, 0)
Total Price: item.reduce((total, item) => {total + item.quantity * item.price}, 0)*/
    return {
        ...cart,
        size: items.reduce((total, item) => total + item.quantity, 0),
        subtotal: items.reduce(
            (total, item) => total + item.quantity * item.product.price,
            0
        ),
    };
}