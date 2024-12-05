"use client";
import { Figtree } from "next/font/google";
import { Disclosure } from '@headlessui/react'
import { useRouter } from 'next/navigation';
import Footer from "@/components/Footer";

const font = Figtree({ subsets: ["latin"] });


export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
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
      {children}
      <Footer />
    </>
  );
}