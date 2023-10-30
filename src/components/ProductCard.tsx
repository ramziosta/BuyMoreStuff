import {Product} from "@prisma/client";
import Link from "next/link";
interface ProductCardProps {
    product: Product;
}
export default function ProductCard({product}: { product: Product }) {
    return (
        <>
        <Link href={"/products/" + product.id}>
        <div className="card w-96 glass hover:shadow-xl bg-base-100 trasnsition-shadow">
            <figure><img src={product.imageUrl} alt="product Image" /></figure>
            <div className="card-body">
                <h2 className="card-title">{product.name}</h2>
                <p>{product.description}</p>
                <div className="card-actions justify-end">
                    <button className="btn btn-primary">Buy Now!</button>
                </div>
            </div>
        </div>
            </Link>
            </>
    );
}