"use client";
import {useRouter} from 'next/navigation';
import {className} from "postcss-selector-parser";

type GoBackButtonProps = {
    className?: string,
    title?: string,
}
const GoBackButton = ({className, title}: GoBackButtonProps) => {
    const router = useRouter();

    return (
        <button className={`${className} btn`} onClick={() => router.back()}>{title}</button>
    );
}

export default GoBackButton;