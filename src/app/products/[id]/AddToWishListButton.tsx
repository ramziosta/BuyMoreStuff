"use client";

import {useState, useTransition} from "react";

interface AddToWishListButtonProps {
    productId: string;
    incrementProductQuantity: (productId: string) => Promise<void>;
}

export default function AddToWishListButton({
                                                productId,
                                                incrementProductQuantity,
                                            }: AddToWishListButtonProps) {
    const [isPending, startTransition] = useTransition();
    const [success, setSuccess] = useState(false);

    return (
        <div className="flex items-center gap-2">
            <div className="flex-col">

                <button
                    className="btn-secondary btn block"
                    onClick={() => {
                        setSuccess(false);
                        startTransition(async () => {
                            await incrementProductQuantity(productId);
                            setSuccess(true);
                        });
                    }}
                >
                    Add to WishList
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5"
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

                </button>
                {isPending && <span className="loading loading-spinner loading-md"/>}
                {!isPending && success && (
                    <span className="text-secondary">Added to WishList.</span>
                )}
            </div>
        </div>
    );
}