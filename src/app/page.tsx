import prisma from "@/lib/db/prisma";
import ProductCard from "@/components/ProductCard";


export default async function Home() {
  const product = await prisma.product.findMany({
    orderBy: {id: "desc"}
  })

  return (
    <main >
  <h1 className="mb-3 text-lg font-bold">Home</h1>
      <ProductCard product={product[0]} />
    </main>
  )
}
