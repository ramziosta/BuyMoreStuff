"use client";
import { useRouter } from 'next/navigation'

// use this button to navigate to desired location in the app use the url to enter the location. the className for the tailwind style
// and title for... well the title!

type NavigateButtonProps = {
    className?: string,
    title?: string,
    url?: string,
}
const NavigateButton = ({ className, title, url }: NavigateButtonProps) => {
    const router = useRouter()


    return (
        <button className={`${className} btn`} onClick={() => router.push(url as string)}>{title}</button>
    );
}

export default NavigateButton;


