import prisma from "@/lib/db/prisma";
import {redirect} from "next/navigation";
import FormSubmitButton from "@/components/FormSubmitButton";

export const metadata = {
    title: "Buy More Stuff",
};

async function addProduct(formData: FormData) {
    "use server";


    const name = formData.get("name")?.toString();
    const description = formData.get("description")?.toString();
    const imageUrl = formData.get("imageUrl")?.toString();
    const price = Number(formData.get("price")?.toString() || 0);

    if (!name || !description || !imageUrl || !price) {
        throw Error("Missing required fields");
    }

try {
    await prisma.product.create({
        data: {name, description, imageUrl, price},
    });
} catch (error) {
    console.error("Prisma operation failed:", error);
}
  prisma.$disconnect();
    redirect("/");
}

export default async function AddProductPage() {
    console.log("1️⃣")
    console.log(FormData)

    return (
        <div>
            <h1 className="mb-3 text-lg font-bold">Add Product</h1>
            <form action={addProduct}>
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
                <FormSubmitButton  className=" btn-block">Add Product</FormSubmitButton>
            </form>
        </div>
    );
}