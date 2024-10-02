"use client";

import Navbar from "@/components/Navbar";
import Image from "next/image";

export default function Home() {

  async function fetchFileUrl(fileID: string) {
    try {
      const response = await fetch(`/api/getFile/${fileID}`);
      const data = await response.json();
  
      if (response.ok) {
        const publicUrl = data.publicUrl;
        console.log('Public URL:', publicUrl);
        // Use the publicUrl as needed, for example, setting it as the href of a link
      } else {
        console.error('Error fetching file URL:', data.message);
      }
    } catch (error) {
      console.error('Error fetching file URL:', error);
    }
  }

  return (
    <div className="w-full h-full border-2 border-red-500">
        <h1
          className="flex items-center justify-center text-4xl"
        >
          Users not logged in will see the marketing page
        </h1>

        <div className="flex items-center justify-center h-screen">
          <div
            className="flex items-center justify-center w-36 h-24 rounded-xl bg-emerald-500 hover:bg-emerald-600 active:bg-emerald-700"
            role="button"
            onClick={() => fetchFileUrl("424")}  
          >
            Click me
          </div>
        </div>
    </div>
  );
}
