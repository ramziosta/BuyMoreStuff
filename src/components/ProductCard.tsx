import {Product} from "@prisma/client";
import Link from "next/link";
import Image from "next/image";
import PriceTag from "@/components/PriceTag";

interface ProductCardProps {
    product: Product;
}

export default function ProductCard({product}: { product: Product }) {
    const isNew = Date.now() - new Date(product.createdAt).getTime() < 1000 * 60 * 60 * 24 * 7;
    return (
        <>
            <Link href={"/products/" + product.id}>
                <div className="card w-full hover:shadow-xl bg-base-100 trasnsition-shadow">
                    <figure><Image className="h-48  object-cover" src={product.imageUrl} width={800} height={400}
                                   alt={product.name}/></figure>
                    <div className="card-body">
                        <h2 className="card-title">{product.name}</h2>
                        {isNew && <div className="badge badge-secondary">New</div>}
                        <p>{product.description}</p>
                        <PriceTag price={product.price}/>
                        <div className="card-actions justify-end">
                            <button className="btn btn-primary">Buy Now!</button>
                        </div>
                    </div>
                </div>
            </Link>
        </>
    );
}