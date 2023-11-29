import Image from 'next/image';
import GoBackButton from "@/components/GoBackButton";
const Image404: string = "https://images.unsplash.com/photo-1610337673044-720471f83677?auto=format&fit=crop&q=80&w=1372&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D";
export default function NotFoundPage() {
    return(
    <div className="flex flex-col gap-4 items-center justify-center">
         <h1 className="mb-3 text-4xl font-bold">Page not found</h1>
        <GoBackButton  className="btn-secondary" title="Go Back!"/>
        <Image src={Image404} className="w-screen  rounded-lg shadow-2xl" alt= "Sad face" width={1400} height={800} />

    </div>
    );
}