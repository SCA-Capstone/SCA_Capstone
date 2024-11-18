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
import { Select } from "../ui/select";
import SelectDropDown from "../../app/(main)/(routes)/dashboard/_components/SelectDropDown";
import { ResponseFile } from "@/types/ResponseFile";
import FileContent from "@/app/(main)/(routes)/dashboard/_components/FileContent";
import { formatDate } from "@/actions/actions";
import { useRouter } from "next/navigation";
import FilesMapScrollArea from "../FilesMapScrollArea";

const JobModal = () => {

    const jobModal = useJobModal();
    const user = useAuthUser();
    const router = useRouter();
    const username = user?.name || "User";
    const [responseFiles, setResponseFiles] = useState<ResponseFile[]>([]);
    const [jobData, setJobData] = useState<Job | null>(null);
    const [selectedFile, setSelectedFile] = useState<ResponseFile | undefined>();
    const [submissionFiles, SetSubmissionFiles] = useState<File[]>([]);

    const jobName = jobData?.jobName || "Job Name";
    const jobDescription = jobData?.jobDescription || "Job Description";
    const jobDate = formatDate(jobData?.created_at || "");
    const jobStatus = jobData?.status ;

    useEffect( () => {

        const fetchJobData = async (submissionId: number, userId: string) => {

            const res = await fetch(`/api/getJobs/${userId}`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${process.env.NEXT_PUBLIC_API_AUTH_TOKEN}`,
                },
            });

            if (res.ok) {
                let data = await res.json();
                // filter: only get the job with the submissionId
                data = data.filter( (job: Job) => job.id === submissionId);
                console.log(`JOB with JOBID, ${submissionId}: `, data[0]);
                setJobData(data[0]);
            }

        }

        // fetch job data given submissionId
        if (jobModal.isOpen) {
            // make sure the job modal is refreshed after each open
            setResponseFiles([]);
            setSelectedFile(undefined);
            fetchJobData(jobModal.submissionId, jobModal.userId);
        }
    }, [jobModal.submissionId, jobModal.userId, jobModal.isOpen]);

    useEffect( () => { // separate useEffects to fetch data simulatanesouly (slightly faster)

        const fetchResponseFiles = async (submissionId: number, userId: string) => {
            // fetch job data using submissionId
            const res2 = await fetch(`/api/getResponseFiles/${submissionId}`); // move this to a separate useEffect

            if (res2.ok) {
                const data = await res2.json();
                console.log(data);
                console.log(data.files);
                setResponseFiles(data.files);
            } else {
                console.log("Error fetching response files");
                setResponseFiles([]);
                setSelectedFile(undefined);
            }
        }

        // fetch job data given submissionId
        if (jobModal.isOpen) {
            // make sure the job modal is refreshed after each open
            setResponseFiles([]);
            setSelectedFile(undefined);
            fetchResponseFiles(jobModal.submissionId, jobModal.userId);
        }
    }, [jobModal.submissionId, jobModal.userId, jobModal.isOpen]);

    useEffect( () => {

        const getSubmissionFiles = async (submissionId: number) => {
            const res = await fetch(`/api/getSubmissionFiles/${submissionId}`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${process.env.NEXT_PUBLIC_API_AUTH_TOKEN}`,
                },
            });

            if (res.ok) {
                const data = await res.json();
                SetSubmissionFiles(data.files);
                console.log("Submission Files: ", data.files);
            }

        }


        if (responseFiles.length < 1) {
            getSubmissionFiles(jobModal.submissionId);
        }
    }, [jobModal.submissionId, jobModal.userId, jobModal.isOpen, responseFiles]);



    const onSelection = (file: string) => {
        console.log(`Selected file: ${file}`);
        const selected = responseFiles.find( (f) => f.fileName === file);
        console.log(selected);
        setSelectedFile(selected);
    }

    const onDownloadClick = () => {
        if (selectedFile?.publicUrl) {
            window.open(selectedFile.publicUrl, '_blank');
        }
    }

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
                    {jobName} 
                </h2>  

                <p
                    className="text-md font-medium text-neutral-500"
                >
                    ID#{jobModal.submissionId}
                </p>

                
            </DialogHeader>

                <div
                    className="flex flex-col gap-y-12"
                >
                    <div
                        className="flex flex-row items-center gap-x-4" 
                    > 
                        {/* user.profile picture, user.name jobData.date */}
                        <Image
                            src="/images/userProfileImage.png" // TODO: replace with user.profile picture
                            alt="profile"
                            width={40}
                            height={40}
                            className="rounded-full"
                        />
                        <h2
                            className="text-lg font-semibold tracking-wide"
                        >
                            {username} on {jobDate}
                        </h2>
                        <StatusButton status={jobStatus || ""} size="xl" />
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
                            className="w-full h-32 2xl:h-48 bg-neutral-100 p-4 rounded-xl overflow-hidden"
                        >
                            <ScrollArea
                                className="w-full h-full"
                            >
                            <p
                                className="text-lg font-medium"
                            >
                                {jobDescription}
                            </p>
                            </ScrollArea>

                        </div>
                    </div>

                    {responseFiles.length > 0 ? (
                        <div
                            className="flex flex-col gap-y-4"
                        >
                            <h1
                                className="text-3xl font-bold"
                            >
                                Response Files
                            </h1>

                            <SelectDropDown options={responseFiles} onClick={onSelection} />


                            <FileContent selectedFile={selectedFile} />

                            <button
                                className='flex justify-center items-center ml-[40%] bg-[#45503B] text-white w-[200px] p-3 rounded-full hover:bg-neutral-800 transition tracking-widest'
                                onClick={onDownloadClick}
                            >
                                Download Report
                            </button>
                        </div>
                    ) : (
                        <div>
                            <p
                                className="text-3xl font-bold"
                            >
                                Submission Files
                            </p>
                            <FilesMapScrollArea files={submissionFiles} isSubmissionFiles />
                        </div>
                    )}

                    
                    
                </div>
            </ScrollArea>
            </DialogContent>        
        </Dialog>
    )
}

export default JobModal