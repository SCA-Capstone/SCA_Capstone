"use client";
import Header from "@/components/Header";
import { useRouter } from "next/navigation";
import HomeCardAbout from "@/components/HomeCardAbout";
import HomeCardTimeline from "@/components/HomeCardTimeline";
import useAuthUser from "./hooks/auth_user";
import Footer from "@/components/Footer";


import { Disclosure } from '@headlessui/react'
export default function Home() {
  const router = useRouter();
  const user = useAuthUser();

  return (
    <>
      <Disclosure as="nav" className="bg-[#45503B]">
        <div className="mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 justify-between">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <h1
                  className="text-white font-bold"
                  role="button"
                  onClick={() => router.push('/')}
                >
                  Capstone SCA
                </h1>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <button
                className="flex justify-center rounded-md px-3 py-1.5 text-sm font-semibold leading-6 focus-visible:outline focus-visible:outline-2 bg-[#45503B]  shadow-sm hover:bg-[#6C7C59] focus-visible:outline-sky-500 text-white ocus-visible:outline-offset-2"
                onClick={() => router.push('/auth/sign-in')}
              >
                Sign In
              </button>
              <button
                className="flex justify-center rounded-md px-3 py-1.5 text-sm font-semibold leading-6 focus-visible:outline focus-visible:outline-2 shadow-sm focus-visible:white border border-white text-white hover:text-white ocus-visible:outline-offset-2"
                onClick={() => router.push('/auth/sign-up')}
              >
                Sign Up
              </button>
            </div>
          </div>
        </div>
      </Disclosure>
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
      <Footer />
    </>
  );
}
