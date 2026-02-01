import { ButtonHTMLAttributes } from "react";
import { twMerge } from "tailwind-merge";

export default function Button({ className, children, ...props }: ButtonHTMLAttributes<HTMLButtonElement>) {
    return (
        <button
            className={twMerge(
                "w-full rounded-md bg-gradient-to-r from-red-700 to-red-500 px-5 py-3 text-sm font-semibold uppercase tracking-widest text-white transition hover:from-red-600 hover:to-red-400 disabled:cursor-not-allowed disabled:opacity-60",
                className
            )}
            {...props}
        >
            {children}
        </button>
    )
}
