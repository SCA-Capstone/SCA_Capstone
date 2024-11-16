"use client";
import { twMerge } from "tailwind-merge";
import StatusButton from "./StatusButton";
import { Job } from "@/types/Job";
import { useState } from "react";
import { useJobModal } from "@/hooks/useJobModal";
import { formatDate } from "@/actions/actions";

interface DashboardItemProps {
    job: Job;
}

const DashboardItem = ( {job}: DashboardItemProps ) => {
    
    const { company, created_at, email, files, id, jobDescription, jobName, name, status, userId, isHeader } = job;
    const [fileUrls, setFileUrls] = useState<string[]>([]);
    const jobModal = useJobModal();

    const onMoreClick = () => {
        // set the submisionId in the useJobModal store
        jobModal.setSubmissionId(id);
        jobModal.setUserId(userId);
        // open job modal
        jobModal.onOpen();
    }
    
    const date = !isHeader ? formatDate(created_at) : "Date";
    const textColor = !isHeader ? 'text-neutral-700 font-medium' : 'text-neutral-700 font-medium';


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
                    `lg:text-lg text-sm line-clamp-1 w-32 lg:w-40`,
                    textColor,
                )}
            >
                {jobName}
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
            
            {isHeader ? (
                <p
                    className={twMerge(
                        `lg:text-lg text-sm p-4`,
                        textColor,
                    )}
                >
                    {status}
                </p>

            ) : (
                <StatusButton status={status}/>
            )}

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
                        ____
                    </p>
                ) : (
                    <p
                        className="text-neutral-100 group-hover/item:text-neutral-400 hover:underline transition text-xs sm:text-sm"
                        role="button"
                        onClick={onMoreClick}
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