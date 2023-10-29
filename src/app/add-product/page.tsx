import {Metadata} from "next";
import  prisma from "@/lib/db/prisma";
import { redirect } from "next/navigation";
export const metadata: Metadata = {
    title: 'Buy More Stuff',
    description: 'E-commerce app',
}

// change formDate fromm any to formData
async function addProduct( formData: any){
    "use server";
    const name = formData.get("name")?.toString();
    const description = formData.get("description")?.toString();
    const imageUrl = formData.get("imgUrl")?.toString();
    const price = Number(formData.get("price")?.toString() || 0);

    if (!name || !description || !imageUrl || !price) {
    throw Error("Missing required fields");
  }

  await prisma.product.create({
    data: { name, description, imageUrl, price },
  });

  redirect("/");


}

export default function addProductPage() {
    return (
          <div>
      <h1 className="mb-3 text-lg font-bold">Add Product</h1>
      <form>
        <input
          required
          name="name"
          placeholder="Name"
          className="input-bordered input mb-3 w-full"
        />
        <textarea
          required
          name="description"
          placeholder="Description"
          className="textarea-bordered textarea mb-3 w-full"
        />
        <input
          required
          name="imageUrl"
          placeholder="Image URL"
          type="url"
          className="input-bordered input mb-3 w-full"
        />
        <input
          required
          name="price"
          placeholder="Price"
          type="number"
          className="input-bordered input mb-3 w-full"
        />
        <button className="btn btn-primary btn-block" type="submit">Add Product</button>
      </form>
    </div>
    )

}