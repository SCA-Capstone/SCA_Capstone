"use client";

import Navbar from "@/components/Navbar";
import Image from "next/image";
import ProcessTable from "./(main)/(routes)/dashboard/_components/ProcessTable";
import Header from "@/components/Header";
import { Button } from "@/components/Button";
import { useRouter } from "next/navigation";
import HomeCardAbout from "@/components/HomeCardAbout";
import HomeCardTimeline from "@/components/HomeCardTimeline";
import useAuthUser from "./hooks/auth_user";


export default function Home() {
  const router = useRouter();
  const user = useAuthUser();

  const isLoggedIn = user !== undefined;
  const route = isLoggedIn ? '/dashboard' : '/auth/sign-in';
  const buttonText = isLoggedIn ? 'Dashboard' : 'Sign In';
  


  return (
    <>
        <Navbar />
        <Header>
            <div
              className="flex flex-col justify-center items-center gap-y-4"
            >
              <h1 className="text-3xl font-bold tracking-tight text-neutral-100">Welcome to the UofA PQC Website</h1>

              <button
                  className='bg-neutral-800 text-white w-[200px] p-3 rounded-full hover:bg-neutral-900 transition tracking-widest'
                  onClick={() => router.push(route)}
              >
                  {buttonText}
              </button>
            </div>
        </Header>

        <main
          className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8 h-full mt-12 gap-6-16"
        >
          <HomeCardAbout />
          <HomeCardTimeline />
          
        </main> 

    </>
  );
}
