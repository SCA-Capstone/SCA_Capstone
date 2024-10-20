"use client";
import { twMerge } from "tailwind-merge";

interface DashboardItemProps {
    job: {
        id: number;
        name: string;
        date: string;
        status: string;
        isHeader?: boolean;
    };
}

const DashboardItem = ( {job}: DashboardItemProps ) => {

    const { id, name, date, status, isHeader } = job;

    const textColor = isHeader ? 'text-neutral-400 font-medium' : 'text-neutral-700';


    return (
        <>
        <div
            className={twMerge(`
                flex justify-between items-center w-full h-12 rounded-lg pl-2 pr-2 group/item`,
                !isHeader && 'hover:bg-neutral-200 transition'
            )}
        >
            <p
                className={twMerge(
                    `lg:text-lg text-sm line-clamp-1 w-32 lg:w-40 `,
                    textColor,
                )}
            >
                {name}
            </p>

            <p
                className={twMerge(
                    `lg:text-lg text-sm`,
                    textColor,
                )}
            >
                {date}
            </p>

            <p
                className={twMerge(
                    `lg:text-lg text-sm`,
                    textColor,
                )}
            >
                {isHeader ? 'ID': id}
            </p>

            <p
                className={twMerge(
                    `lg:text-lg text-sm`,
                    textColor,
                )}
            >
                {status}
            </p>

            <p
                className={twMerge(
                    `lg:text-md text-sm`,
                    textColor,
                )}
            >
                {isHeader ? (
                    <p
                        className="text-neutral-100"
                    >
                        more
                    </p>
                ) : (
                    <p
                        className="text-neutral-100 group-hover/item:text-neutral-400 hover:underline transition text-sm"
                        role="button"
                        onClick={() => {}}
                    >
                        more
                    </p>
                )}
            </p>


        </div>
            {isHeader && (
                <>
                    <div className="h-[2px] bg-gray-300 rounded-full my-2 mb-4"></div>
                </>
            )}
        </>
    )
}

export default DashboardItem