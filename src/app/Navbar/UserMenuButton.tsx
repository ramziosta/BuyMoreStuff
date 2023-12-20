"use client";

import profilePicPlaceholder from "@/app/assets/profile-pic-placeholder.png";
import { Session } from "next-auth";
import { signIn, signOut } from "next-auth/react";
import Image from "next/image";

interface UserMenuButtonProps {
    session: Session | null;
}

export default function UserMenuButton({ session }: UserMenuButtonProps) {
    const user = session?.user;

    return (
        <div className="dropdown-end dropdown">
            <label tabIndex={0} className="btn-ghost btn-circle btn">
                {user ? (
                    <Image
                        src={user?.image || profilePicPlaceholder}
                        alt="Profile picture"
                        width={40}
                        height={40}
                        className="w-10 rounded-full"
                    />
                ) : (
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 448 512"
                        className="inline-block h-7 w-7 stroke-current"
                    >
                        <path
                            height="40" width="40"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M304 128a80 80 0 1 0 -160 0 80 80 0 1 0 160 0zM96 128a128 128 0 1 1 256 0A128 128 0 1 1 96 128zM49.3 464H398.7c-8.9-63.3-63.3-112-129-112H178.3c-65.7 0-120.1 48.7-129 112zM0 482.3C0 383.8 79.8 304 178.3 304h91.4C368.2 304 448 383.8 448 482.3c0 16.4-13.3 29.7-29.7 29.7H29.7C13.3 512 0 498.7 0 482.3z"/>
                    </svg>

                )}
            </label>
            <ul
                tabIndex={0}
                className="dropdown-content menu rounded-box menu-sm z-30 mt-3 w-52 bg-base-100 p-2 shadow"
            >
                <li>
                    {user ? (
                        <button onClick={() => signOut({ callbackUrl: "/" })}>
                            Sign Out
                        </button>
                    ) : (
                        // we can also direct to a Link and href , but this method is better
                        <button onClick={() => signIn()}>Sign In</button>
                    )}
                </li>
            </ul>
        </div>
    );
}
