"use client";


import { Home, LayoutDashboard, Menu, Upload } from "lucide-react";
import { useRouter } from "next/navigation";

const Navbar = () => {
  const router = useRouter();
  return (
    <div
        className="flex justify-start items-center w-full h-16 bg-gray-800 text-black relative shadow-sm px-4 py-2 gap-x-8"
    >
      <div
        role="button"
        onClick={() => {}}
      >
        <Menu className="text-white" />
      </div>


      <div
        className="flex items-center justify-end h-full w-full gap-x-0 mr-[10%]"
      >

        <div
          className="flex items-center justify-center h-full w-24 hover:bg-gray-900 transition rounded-2xl gap-x-1"
          role="button"
          onClick={() => router.push("/")}
        >
          <Home className="text-white w-4 h-4" />
          <p className="text-sm text-white">
            Home
          </p>
        </div>

        <div
          className="flex items-center justify-center h-full w-24 hover:bg-gray-900 transition rounded-2xl gap-x-1"
          role="button"
          onClick={() => router.push("/dashboard")}
        >
          <LayoutDashboard className="text-white w-4 h-4" />
          <p className="text-sm text-white">
            Dash
          </p>
        </div>

        <div
          className="flex items-center justify-center h-full w-24 hover:bg-gray-900 transition rounded-2xl gap-x-1"
          role="button"
          onClick={() => router.push("/submit")}
        >
          <Upload className="text-white w-4 h-4" />
          <p className="text-sm text-white">
            Submit
          </p>
        </div>

        
      </div>

    </div>
  )
}

export default Navbar