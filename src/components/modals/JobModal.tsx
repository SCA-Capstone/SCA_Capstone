"use client";

import { useJobModal } from "@/hooks/useJobModal";

import {
    Dialog,
    DialogContent,
    DialogHeader
} from "@/components/ui/dialog";
import { useEffect, useState } from "react";
import { Job } from "@/types/Job";
import useAuthUser from "@/app/hooks/auth_user";
import Image from "next/image";
import StatusButton from "@/app/(main)/(routes)/dashboard/_components/StatusButton";
import { ScrollArea } from "../ui/scroll-area";

const JobModal = () => {

    const jobModal = useJobModal();
    const user = useAuthUser();
    const username = user?.name || "User";
    const [jobData, setJobData] = useState<Job | null>(null);
    const [jobName, setJobName] = useState<string>('');

    useEffect( () => {

        const fetchJobData = async (submissionId: number) => {
            // fetch job data using submissionId
            const res = await fetch(`/api/getResponseFiles/${submissionId}`);

            if (res.ok) {
                const data = await res.json();
                console.log(data);
                setJobData(data);
                setJobName(data.folderName);
            }   
        }

        // fetch job data given submissionId
        fetchJobData(jobModal.submissionId);
    }, [jobModal.submissionId]);

    return (
        <Dialog
            open={jobModal.isOpen}
            onOpenChange={jobModal.onClose}
        >
            <DialogContent>
            <ScrollArea >

            <DialogHeader
                className="flex justify-start items-start mb-4"
            >
                <h2
                    className="text-3xl sm:text-5xl font-bold"
                >
                    {/* {jobName} */}
                    Job Name
                </h2>  

                <p
                    className="text-md font-medium text-neutral-500"
                >
                    ID#{jobModal.submissionId}
                </p>

                <StatusButton status="complete" size="xl" />
            </DialogHeader>

                <div
                    className="flex flex-col gap-y-12"
                >
                    <div
                        className="flex flex-row items-center gap-x-4" 
                    > 
                        {/* user.profile picture, user.name jobData.date */}
                        <Image
                            src="/images/userProfileImage.png"
                            alt="profile"
                            width={40}
                            height={40}
                            className="rounded-full"
                        />
                        <h2
                            className="text-lg font-semibold tracking-wide"
                        >
                            {username} on {jobData?.date || "8.23.24"}
                        </h2>
                    </div>


                    <div
                        className="flex flex-col gap-y-4"
                    >
                        <h1
                            className="text-3xl font-bold"
                        >
                            Description
                        </h1>
                        <div
                            className="w-full h-32 bg-neutral-100 p-4 rounded-xl"
                        >
                            <p
                                className="text-lg font-medium"
                            >
                                {jobData?.description || "No description available"}
                            </p>

                        </div>
                    </div>

                    { jobData?.files && (
                        <div
                            className="flex flex-col gap-y-4"
                        >
                            <h1
                                className="text-3xl font-bold"
                            >
                                Response Files
                            </h1>

                            <div
                            className="w-full h-32 bg-neutral-100 p-4 rounded-xl"
                            >
                                {/* display response file output here */}
                                Hello World 
                            </div>

                            <button
                                className='flex justify-center items-center ml-[40%] bg-[#45503B] text-white w-[200px] p-3 rounded-full hover:bg-neutral-800 transition tracking-widest'
                                onClick={() => {}}
                            >
                                Download Report
                            </button>
                        </div>
                    )}
                    
                    
                </div>
            </ScrollArea>
            </DialogContent>        
        </Dialog>
    )
}

export default JobModal