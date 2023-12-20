"use client";
import { useRouter } from 'next/router';

type NavigateButtonProps = {
    className?: string,
    title?: string,
    url?: string,
};

const NavigateButton = ({ className, title, url }: NavigateButtonProps) => {
    const router = useRouter();

    return (
        <button className={`${className} btn`} onClick={() => router.push(url as string)}>{title}</button>
    );
};

export default NavigateButton;
