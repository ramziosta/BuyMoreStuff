import {Prisma} from "@prisma/client";
import {cookies} from "next/dist/client/components/headers";
import prisma from "./prisma";

export type WishListWithProducts = Prisma.WishListGetPayload<{
    include: { items: { include: { product: true } } };
}>;

export type WishListItemsWithProducts  = Prisma.WishListItemGetPayload<{
    include: { product: true };
}>;
export type WishList = WishListWithProducts & {
    size: number;
    subtotal: number;
};

/* the shopping wishlist is stored in local storage if the user is not logged in using cookies
ternary operator is used to check if there is a wishlist in local storage: localWishListId
 if there is a wishlist then we use it otherwise its null ( empty wishlist)
 if wishlist = localstorage ? wishlist uses localStorageId: otherwise null */
export async function getWishList(): Promise<WishList | null> {
    const localWishListId = cookies().get("localWishListId")?.value;
    const wishList = localWishListId ?
        await prisma.wishList.findUnique({
            where: {id: localWishListId},
            include: {items: {include: {product: true}}},
        })
        : null;

    if (!wishList) {
        return null;
    }
    const items = wishList.items;

/* This uses JS reduce function to calculate the total number of items in the wishlist, and the total price in the wishlist
item.reduce((total, item)=>{ function for what we want to do with the item}, 0: starting point)
Quantity: item.reduce((total, item) => {total + item.quantity}, 0)
Total Price: item.reduce((total, item) => {total + item.quantity * item.price}, 0) */
    return {
        ...wishList,
        size: items.reduce((total, item) => total + item.quantity, 0),
        subtotal: items.reduce(
            (total, item) => total + item.quantity * item.product.price,
            0
        ),
    };
}

export async function createWishList(): Promise<WishList> {
    const newWishList = await prisma.wishList.create({
        data: {},
    });

// Note: Needs encryption + secure settings in real production app
    cookies().set("localWishListId", newWishList.id);

    return {
        ...newWishList,
        items: [],
        size: 0,
        subtotal: 0,
    };
}

//TODO need to edit sending the items from wishlist to cart or checkout, delete items from the wishjlist