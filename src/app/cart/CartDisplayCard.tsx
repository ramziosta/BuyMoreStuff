"use client";

import { CartItemData } from "@/lib/db/cart";
import { formatPrice } from "@/lib/format";
import Image from "next/image";
import Link from "next/link";
import { useTransition } from "react";

//this type for the props that we are passing to the card,
// data about the cart item in the cart that we want to display in the UI as a card and the function to update the quantity
interface CartItemProps {
  cartItem: CartItemData;
  setProductQuantity: (productId: string, quantity: number) => Promise<void>;
}

export default function CartDisplayCard({
  cartItem: { product, quantity },
  setProductQuantity,
}: CartItemProps) {
  const [isPending, startTransition] = useTransition();

  // this is a JSX element to create 99 quantity options as an array
  const quantityOptions: JSX.Element[] = [];

  for (let i = 1; i <= 99; i++) {
    quantityOptions.push(
      <option value={i} key={i}>
        {i}
      </option>
    );
  }

  // this creates a card that has an image, a link that leads back to product page
  // and a quantity selector from 0(delete item from cart) to 100
  // we use quantityOption component as an object to display the 100 quantities for simplicity

  return (
    <div>
      <div className="flex flex-wrap items-center gap-3">
        <Image
          src={product.imageUrl}
          alt={product.name}
          width={200}
          height={200}
          className="rounded-lg"
        />
        <div>
          {/* since we are creating a card we use the id  of the product as the key*/}
          <Link href={"/products/" + product.id} className="font-bold">
            {product.name}
          </Link>
          <div>Price: {formatPrice(product.price)}</div>
          <div className="my-1 flex items-center gap-2">
            Quantity:
            {/* when we select a quantity from the options we read the change and set the new quantity, this ins
             instead of using state */}
            <select
              className="select-bordered select w-full max-w-[80px]"
              defaultValue={quantity}
              onChange={(e) => {
                const newQuantity = parseInt(e.currentTarget.value);
                startTransition(async () => {
                  await setProductQuantity(product.id, newQuantity);
                });
              }}
            >
              <option value={0}>0 (Remove)</option>
              {/*this is 99 quantity options from 1 to 99*/}
              {quantityOptions}
            </select>
          </div>
          <div className="flex items-center gap-3">
            Total: {formatPrice(product.price * quantity)}
            {isPending && (
              <span className="loading loading-spinner loading-sm" />
            )}
          </div>
        </div>
      </div>
      <div className="divider" />
    </div>
  );
}