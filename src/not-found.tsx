import Image from 'next/image';
const Image404: string = "https://images.unsplash.com/photo-1610337673044-720471f83677?auto=format&fit=crop&q=80&w=1372&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D";
export default function NotFoundPage() {
    return(
    <div>
        <Image src={Image404} className="w-full max-w-sm rounded-lg shadow-2xl" alt= "Sad face" width={400} height={400} />
        <h1>Page not found</h1>
    </div>
    );
}