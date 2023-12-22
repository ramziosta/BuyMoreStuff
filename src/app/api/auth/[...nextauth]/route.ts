import prisma from "@/lib/db/prisma";
import { env } from "@/lib/env";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { NextAuthOptions } from "next-auth";
import { Adapter } from "next-auth/adapters";
import NextAuth from "next-auth/next";
import GoogleProvider from "next-auth/providers/google";
import {mergeAnonymousCartIntoUserCart} from "@/lib/db/cart";
import {mergeAnonymousWishListIntoUserCart} from "@/lib/db/wishList";

export const authOptions: NextAuthOptions = {
    adapter: PrismaAdapter(prisma) as Adapter,
    providers: [
        GoogleProvider({
            clientId: env.GOOGLE_CLIENT_ID,
            clientSecret: env.GOOGLE_CLIENT_SECRET,
        }),
    ],
    // we create a type for the user id in the @types folder and export it to the whole project
    callbacks:{
        session({session, user}){
            session.user.id = user.id;
            return session;
        }
    },
    events: {
        async signIn ({user }) {
            await mergeAnonymousCartIntoUserCart( user.id);
            await mergeAnonymousWishListIntoUserCart( user.id);
        }
    }
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };



//TODO need to read about the types and exporting of NextAuth handlers to the whole project
//TODO need to add user email and password to the login auth options

