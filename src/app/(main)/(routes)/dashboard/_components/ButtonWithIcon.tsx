"use client";

import { on } from 'events';
import { ArrowDown, LucideIcon } from 'lucide-react'
import { twMerge } from 'tailwind-merge';

interface ButtonWithIconProps {
    icon: LucideIcon;
    iconSize?: number;
    text: string;
    textSize?: "xs" | "sm" | "md" | "lg" | "xl" | "2xl" | "3xl";
    className?: string;
    onClick?: () => void;
}

const ButtonWithIcon = ({ icon:Icon, iconSize, text, textSize, className, onClick }: ButtonWithIconProps) => {
  return (
    <div
        className=''
    >
        <button
            onClick={onClick}
            className='flex items-center hidden:border border-neutral-400 rounded-md hover:bg-neutral-200 p-1 transition gap-x-1'
        >
            {Icon && (
                <Icon
                    className={twMerge(
                        `w-4 h-4 text-neutral-400`,
                        iconSize && `w-${iconSize} h-${iconSize}`,
                        className
                    
                    )}
                />
            )}
            {text && (
                <p
                    className={twMerge(
                        `text-neutral-400 text-xs font-medium`,
                        textSize && `text-${textSize}`,
                        className

                    )}
                >
                    {text}
                </p>
            )}
        </button>
    </div>
  )
}

export default ButtonWithIcon