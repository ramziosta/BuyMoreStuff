"use server";

import {createWishList, getWishList,} from "@/lib/db/wishList";
import prisma from "@/lib/db/prisma";
import {revalidatePath} from "next/cache";

export async function incrementWishList(productId: string) {
    const wishList = (await getWishList()) ?? (await createWishList());

    const articleInWishList = wishList.items.find((item) => item.productId === productId);

    if (articleInWishList) {
        await prisma.wishListItem.update({
            where: {id: articleInWishList.id},
            data: {quantity: {increment: 1}},
        });
    } else {
        await prisma.wishListItem.create({
            data: {
                wishListId: wishList.id,
                productId,
                quantity: 1,
            },
        });
    }

    revalidatePath("/products/[id]");
}