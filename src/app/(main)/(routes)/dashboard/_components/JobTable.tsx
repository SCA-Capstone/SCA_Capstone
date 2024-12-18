"use client";

import useAuthUser from "@/app/hooks/auth_user";
import SortSettings from "./SortSettings";
import JobButtons from "./JobButtons";
import DashboardItem from "./DashboardItem";
import Link from "next/link";
import { useEffect, useState } from "react";
import { Job } from "@/types/Job";
import { Plus } from "lucide-react";
import { useRouter } from "next/navigation";

const JobTable = () => {
    const [isMounted, setIsMounted] = useState(false);
    // interface Job {
    //     id: number;
    //     name: string;
    //     date: string;
    //     status: string;
    //     isHeader?: boolean;
    // }

    const [jobs, setJobs] = useState<Job[]>([]);
    const [fiveSecond, setFiveSecond] = useState<boolean>(true);
    const user = useAuthUser();
    const router = useRouter();

    useEffect(() => {
        setIsMounted(true);
    }, []);

    // Fetch jobs from API
    useEffect(() => {
        const fetchUserJobs = async (userId: string) => {
            console.log("userId", userId);
            const response = await fetch(`/api/getJobs/${userId}`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${process.env.NEXT_PUBLIC_API_AUTH_TOKEN}`,
                },
            });
            const data = await response.json();
            console.log(data);
            setJobs(data);
            setFiveSecond(false);
        };

        if (user?.userId) {
            console.log("API AUTH TOKEN: ", process.env.API_AUTH_TOKEN?.toString());
            console.log("NEXT_PUBLIC_API_AUTH_TOKEN: ", process.env.NEXT_PUBLIC_API_AUTH_TOKEN?.toString());
            fetchUserJobs(user.userId);
        }
    }, [user, fiveSecond]); // Dependency on user

    // 5 SECOND REFRESH FOR DEMO
    useEffect( () => {
        // change the state of fiveSecond every 5 seconds to trigger the useEffect -> call the api for new jobs
        const interval = setInterval(() => {
            console.log("5 seconds passed");
            setFiveSecond(true);
        }, 5000);

        return () => clearInterval(interval);
    }, [fiveSecond] );

    if (!isMounted) {
        return null;
    }

    const numJobs = 0;
    const defaultJob = {
            id: -1,
            name: "User name",
            date: "Date",
            status: "Status",
            isHeader: true,
            company: "",
            created_at: "",
            email: "",
            files: false,
            jobDescription: "",
            jobName: "Process Name",
            userId: ""


    }


    return (
        <div
            className='flex flex-col justify-start items-start relative h-[949px] mt-12 w-full bg-[#F3F4F6] rounded-[2rem] p-12 overflow-hidden'
        >
            <div
                className='flex w-full h-auto flex-col gap-y-4 '
            >
                <div
                    className="flex w-full h-10"
                >
                    <h1
                        className='flex items-center justify-center text-4xl md:text-5xl font-semibold'
                    >
                        Jobs
                    </h1>
                </div>

                <div
                    className="flex justify-between items-center"
                >
                    <p className='text-neutral-400 text-md font-bold'>
                        { jobs && jobs.length == 1 ? `${jobs.length} job` : `${jobs.length} jobs`}
                    </p>

                    <JobButtons />

                </div>
                

            </div>
            {jobs ? (
                <div
                    className="flex flex-col gap-y-2 w-full h-auto mt-8"
                >
                    <DashboardItem job={defaultJob}/>

                    {/* TODO: make this scrollable (make sure to import the right scrollarea) */}
                    {jobs.map((job) => (
                        <DashboardItem job={job} key={job?.id}/>
                    ))}
                    
                </div>
            ) : (
                <div
                    className="flex items-center gap-x-4 w-full h-auto mt-8"
                >
                    <p className="text-md">
                        No jobs found.
                    </p>


                    <Link
                        href='/submit'
                    >
                        <div
                            className="flex items-center justify-center w-36 h-12 border-2 border-[#6C7C59] bg-[#6C7C59] hover:bg-neutral-100 text-white hover:text-neutral-700 font-medium tracking-wider rounded-lg transition"
                        >
                            Submit job
                        </div>
                    </Link>
                </div>

            )}

            <div
                className="absolute bottom-6 left-6 flex items-center gap-x-2 cursor-pointer group"
                role="button"
                onClick={() => router.push('/submit')}
            >
                <Plus className="w-4 h-4 text-neutral-400 group-hover:text-neutral-600 transition"/>
                <p
                    className="text-md text-neutral-400 font-medium group-hover:text-neutral-600 transition"
                >
                    Create new submission
                </p>
            </div>

        </div>
    )
}

export default JobTable