"use server";

import {createCart, getCart} from "@/lib/db/cart";
import prisma from "@/lib/db/prisma";
import {revalidatePath} from "next/cache";

export async function incrementProductQuantity(productId: string) {
    // when we add item, we get the cart from local storage if one already exist, if not we create a new cart
    const cart = (await getCart()) ?? (await createCart());

    const articleInCart = cart.items.find((item) => item.productId === productId);
    /* Search through the items in the cart and compare the product ID with the product ID of each item
     If the article is already in the cart, we increment the quantity by 1
     If the article is not in the cart, we create a new item in the cart
    * */
    if (articleInCart) {
        await prisma.cart.update({
            where :{ id: cart.id},
            data :{
                items: {
                    update: {
                        where : { id: articleInCart.id},
                        data: {quantity: articleInCart.quantity + 1},
                        // data: {quantity: {increment: 1}}
                    }
                }
            }
        })
    } else {
        await prisma.cart.update({
            where :{ id: cart.id},
            data :{
                items: {
                    create: {
                        productId,
                        quantity: 1
                    }
                }
            }
        })
    }

    revalidatePath("/products/[id]");
/*
to ensure that a specific page is re-rendered with the latest data,
even if the user hasn't visited that page directly.
In this case, we're specifying the path /products/[id]
to ensure that all pages under the /products route are revalidated,
which will cause them to re-render with the latest cart data.*/
}