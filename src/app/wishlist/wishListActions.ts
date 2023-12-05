"use server";

import { createWishList, getWishList } from "@/lib/db/wishList";
import prisma from "@/lib/db/prisma";
import { revalidatePath } from "next/cache";

export async function setWishListQuantity(productId: string, quantity: number) {
  const wishList = (await getWishList()) ?? (await createWishList());

  const articleInWishList = wishList.items.find((item) => item.productId === productId);

  if (quantity === 0) {
    if (articleInWishList) {
      await prisma.wishListItem.delete({
        where: { id: articleInWishList.id },
      });
    }
  } else {
    if (articleInWishList) {
      await prisma.wishListItem.update({
        where: { id: articleInWishList.id },
        data: { quantity },
      });
    } else {
      await prisma.wishListItem.create({
        data: {
          wishListId: wishList.id,
          productId,
          quantity,
        },
      });
    }
  }

  revalidatePath("/wishList");
}