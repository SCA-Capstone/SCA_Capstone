"use client";
import { twMerge } from "tailwind-merge";

interface StatusButtonProps {
    status: string;
    size?: string;
}

const StatusButton = ({ status, size }: StatusButtonProps) => {

    return (
        <div
            className={twMerge(
            `flex justify-center items-center md:px-4 md:w-28 md:py-2 md:text-base px-2 py-1 w-18 text-xs rounded-full font-medium text-neutral-700`,
            status === 'submitted' && 'bg-[#D9D9D9]/90',
            status === 'in progress' && 'bg-[#F5E5C0] ',
            status === 'complete' && 'bg-[#DEECDC] text-black',
            size === 'xl' && 'w-28 h-10 text-base',

            )}
        >
            {status}
        </div>
    )
}

export default StatusButton