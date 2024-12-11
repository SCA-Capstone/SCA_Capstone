"use client";
import Image from "next/image";
import ProcessTable from "./(main)/(routes)/dashboard/_components/JobTable";
import Header from "@/components/Header";
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
        <Header>
            <div
              className="flex flex-col justify-center items-center gap-y-4"
            >
              <h1 className="text-2xl font-bold tracking-tight text-neutral-100">Welcome to the U of A PQC Website</h1>
            </div>
        </Header>
        <main
          className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8 mt-12 gap-6-16"
        >
          <HomeCardAbout />
          <HomeCardTimeline />
          
        </main> 

    </>
  );
}
