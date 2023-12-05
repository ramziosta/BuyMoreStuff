import { getWishList } from "@/lib/db/wishList";
import { formatPrice } from "@/lib/format";
import WishListEntry from "./WishListEntry";
import { setWishListQuantity } from "./wishListActions";

export const metadata = {
  title: "Your WishList - Buy More Stuff",
};

export default async function WishListPage() {
  const wishList = await getWishList();

  return (
    <div>
      <h1 className="mb-6 text-3xl font-bold">WishList</h1>
      {wishList?.items.map((wishListItem) => (
        <WishListEntry
          wishListItem={wishListItem}
          key={wishListItem.id}
          setWishListQuantity={setWishListQuantity}
        />
      ))}
      {!wishList?.items.length && <p>Your WishList is empty.</p>}
      <div className="flex flex-col items-end sm:items-center">
        <p className="mb-3 font-bold">
          Total: {formatPrice(wishList?.subtotal || 0)}
        </p>
        <button className="btn-primary btn sm:w-[200px]">Move to Cart</button>
      </div>
    </div>
  );
}