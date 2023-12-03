import PriceTag from "@/components/PriceTag";
import prisma from "@/lib/db/prisma";
import {Metadata} from "next";
import Image from "next/image";
import {notFound} from "next/navigation";
import {cache} from "react";
import {incrementProductQuantity} from "@/app/products/[id]/actions";
import AddToCartButton from "@/app/products/[id]/AddToCartButton";
import AddToWishListButton from "@/app/products/[id]/AddToWishListButton";

interface ProductPageProps {
    params: {
        id: string,

    };
}

//we cache the product in order not to get the product from the database twice for the card and for the mnetadata
const getProduct = cache(async (id: string) => {
    const product = await prisma.product.findUnique({where: {id}});
    if (!product) notFound();
    return product;
});

export async function generateMetadata({params: {id},}: ProductPageProps): Promise<Metadata> {
    const product = await getProduct(id);

    return {
        title: product.name + " - BuyMoreStuff",
        description: product.description,
        openGraph: {
            images: [{url: product.imageUrl}],
        },
    };
}

export default async function ProductPage({params: {id},}: ProductPageProps) {
    const product = await getProduct(id);

    return (
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center h-screen">
            <Image
                src={product.imageUrl}
                alt={product.name}
                width={500}
                height={500}
                className="rounded-lg"
                priority
            />

            <div>
                <h1 className="text-5xl font-bold">{product.name}</h1>
                <PriceTag price={product.price} className="mt-4"/>
                <p className="py-6">{product.description}</p>
                {product.details && <p className="mb-6">{product.details}</p>}
            <div className="flex-col gap-2">
                 <AddToWishListButton productId={product.id} incrementProductQuantity={incrementProductQuantity}/>
                    <AddToCartButton productId={product.id} incrementProductQuantity={incrementProductQuantity}/>

                </div>
            </div>
        </div>
    );
}