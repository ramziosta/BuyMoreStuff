"use client";

import {WishList} from "@/lib/db/wishList";
import {formatPrice} from "@/lib/format";
import Link from "next/link";

interface WishListCartButtonProps {
    wishlist: WishList | null;
}

export default function WishListButton({wishlist}: WishListCartButtonProps) {
    function closeDropdown() {
        const elem = document.activeElement as HTMLElement;
        if (elem) {
            elem.blur();
        }
    }

    return (
        <div className="dropdown-end dropdown">
            <label tabIndex={0} className={`btn-ghost btn-circle btn ${wishlist ? 'border-fullWishlist' : 'border-neutral'}`}>
                <div className="indicator">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                          className={`h-7 w-7 ${wishlist ? 'text-fullWishlist' : 'text-neutral'} ${wishlist ? 'fill-fullWishlist' : 'fill-neutral'}`}
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M12 20l-1.45-1.32C5.4 15 2 12.36 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.86-3.4 6.5-8.55 10.18L12 20z"
                        />
                    </svg>
                    <span className={`badge badge-sm indicator-item ${wishlist ? 'border-fullWishlist' : 'border-neutral'}`}>
            {wishlist?.size || 0}
          </span>
                </div>
            </label>
            <div
                tabIndex={0}
                className="card dropdown-content card-compact z-30 mt-3 w-52 bg-base-100 shadow"
            >
                <div className="card-body">
                    <span className="text-lg font-bold">{wishlist?.size || 0} Items</span>
                    <span className="text-info">
            Subtotal: {formatPrice(wishlist?.subtotal || 0)}
          </span>
                    <div className="card-actions">
                        <Link
                            href="/wishlist"
                            className="btn-primary btn-block btn"
                            onClick={closeDropdown}
                        >
                            View Wishlist
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}