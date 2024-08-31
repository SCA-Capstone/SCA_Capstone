import Navbar from "@/components/Navbar";
import Image from "next/image";

export default function Home() {
  return (
    <div className="w-full h-full">
        <h1
          className="flex items-center justify-center text-4xl"
        >
          Users not logged in will see the marketing page
        </h1>
    </div>
  );
}
