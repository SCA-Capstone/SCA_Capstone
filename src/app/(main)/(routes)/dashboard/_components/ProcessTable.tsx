"use client";

import useAuthUser from "@/app/hooks/auth_user";
import SortSettings from "./SortSettings";
import JobButtons from "./JobButtons";
import DashboardItem from "./DashboardItem";
import Link from "next/link";
import { useEffect, useState } from "react";

const ProcessTable = () => {
    const [isMounted, setIsMounted] = useState(false);
    const [jobs, setJobs] = useState([]); // useState<Jobs[]>();
    const user = useAuthUser();

    useEffect(() => {
        setIsMounted(true);
    }, []);

    // fetch jobs from API/
    useEffect( () => {
        
        const fetchUserJobs = async (userId: string) => {
            console.log("userId", userId);
            // const response = await fetch(`/api/getJobs/${userId}`);
            // const data = await response.json();
            // console.log(data);
            // setJobs(data);
        }

        fetchUserJobs(user?.userId);
    }, [])

    if (!isMounted) {
        return null;
    }

    const numJobs = 0;
    const defaultJob = {
            id: -1,
            name: "Process name",
            date: "Date",
            status: "Status",
            isHeader: true
    }
    const job = {
        id: 1,
        name: "Crystals Dilithium slk;dfjg ",
        date: "8.23.24",
        status: "submitted",
    }


    return (
        <div
            className='flex flex-col justify-start items-start h-[949px] mt-12 w-full bg-[#F3F4F6] rounded-[2rem] p-12 overflow-hidden'
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
                        {numJobs} jobs
                    </p>

                    <JobButtons />

                </div>
                

            </div>
            {jobs ? (
                <div
                    className="flex flex-col gap-y-2 w-full h-auto mt-8"
                >
                    <DashboardItem job={defaultJob}/>
                    <DashboardItem job={job}/>
                    {/* 
                    {jobs.map((job) => (
                        <DashboardItem job={job} key={job.id}/>
                    ))}
                     */}
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



        </div>
    )
}

export default ProcessTable