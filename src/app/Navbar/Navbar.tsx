import logo from "../assets/buymorestuff.png";
import {getCart} from "@/lib/db/cart";
import Image from "next/image";
import Link from "next/link";
import {redirect} from "next/navigation";
import ShoppingCartButton from "./ShoppingCartButton";
import WishListButton from "./WishListButton";
import {getWishList} from "@/lib/db/wishList";

async function searchProducts(formData: FormData) {
    //server component
    "use server";
    // the search query from the form data
    const searchQuery = formData.get("searchQuery")?.toString();

    if (searchQuery) {
        // Next.js redirect to search page with query parameter
        redirect("/search?query=" + searchQuery);
    }
}


export default async function Navbar() {
    const cart = await getCart();
    const wishList = await getWishList();

    return (
        <div className="bg-base-100">
            <div className="navbar m-auto max-w-7xl flex-col gap-2 sm:flex-row h-40  items-center">
                <div className="flex-1 flex-row mb-4">
                    <Link href="/" className="btn-ghost btn text-xl normal-case">
                        <Image src={logo} height={70} width={70} alt="Buy More Stuff logo" className="rounded-full "/>
                        Buy More Stuff
                    </Link>
                </div>
                <div className="flex-none gap-2">
                    <form action={searchProducts}>
                        <div className="form-control">
                            <input
                                name="searchQuery"
                                placeholder="Search"
                                className="input-bordered input w-full min-w-[300px]"
                            />
                        </div>
                    </form>
                    <ShoppingCartButton cart={cart}/>
                    <WishListButton  wishlist={wishList}/>
                </div>
            </div>
        </div>
    );
}

//TODO fix the navbar styling and hover effect for better UX