import prisma from "@/lib/db/prisma";
import {redirect} from "next/navigation";
import FormSubmitButton from "@/components/FormSubmitButton";
import {authOptions} from "@/app/api/auth/[...nextauth]/route";
import {getServerSession} from "next-auth";
import NavigateButton from "@/components/NavigateButton";

export const metadata = {
    title: "Buy More Stuff",
};

async function addProduct(formData: FormData) {
    "use server";

    const session = await getServerSession(authOptions);

    if (!session) {
        redirect("/api/auth/signin?callbackUrl=/add-product")
    }

    const name = formData.get("name")?.toString();
    const description = formData.get("description")?.toString();
    const imageUrl = formData.get("imageUrl")?.toString();
    const price = Number(formData.get("price")?.toString() || 0);
    const details = formData.get("details")?.toString() || "";
    if (!name || !description || !imageUrl || !price) {
        throw Error("Missing required fields");
    }

    try {
        await prisma.product.create({
            data: {name, description, imageUrl, price, details,},
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
    const session = await getServerSession(authOptions);

    if (!session) {
        redirect("/api/auth/signin?callbackUrl=/add-product")
    }

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
                <textarea
                    name="details"
                    placeholder="Details"
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
                <FormSubmitButton className=" btn-block">Add Product</FormSubmitButton>

            </form>
            <div className="flex justify-center mt-5">
                <NavigateButton title={"home"} className={"btn-secondary"} url={"/"}/>
            </div>
        </div>
    );
}

//TODO add new fields to the form to match the product schema in the schema.prisma file
//TODO Permission authentication for this page: This Page should be available only for admin users. Add authentication check