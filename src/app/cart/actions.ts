"use server";

import { createCart, getCart } from "@/lib/db/cart";
import prisma from "@/lib/db/prisma";
import { revalidatePath } from "next/cache";

export async function setProductQuantity(productId: string, quantity: number) {
  const cart = (await getCart()) ?? (await createCart());
// gets the items from the cart
  const articleInCart = cart.items.find((item) => item.productId === productId);
// if the product quantity is 0 remove it from the cart
  if (quantity === 0) {
    if (articleInCart) {
      await prisma.cart.update({
        where :{ id: cart.id},
        data :{
          items :{
            delete :{id :articleInCart.id}
          }
        }
      })
    }
  } else {
    // if there are items in the cart update the item quantity
    if (articleInCart) {
      await prisma.cart.update({
        where :{ id: cart.id},
        data :{
          items: {
           update: {
              where : { id: articleInCart.id},
             data: {quantity}
            }
          }
        }
      })
    } else {
      // if there are no items create a new cart

      await prisma.cart.update({
        where :{ id: cart.id},
        data :{
          items: {
            create: {
             productId,
              quantity
            }
          }
        }
      })

    }
  }

  revalidatePath("/cart");
}