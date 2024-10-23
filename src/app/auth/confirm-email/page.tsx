'use client'
import ConfirmForm from "./form"

export default function Page() {
  return (
    <>
    <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8 bg-white">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <h1 className="mx-auto h-10 w-auto text-center font-extrabold text-4xl text-[#45503B]">Verfication</h1>
        <h2 className="mt-1 text-center text-lg font-semibold leading-9 tracking-tight text-[#6C7C59]">
          Enter the Code sent to random***@gmail.com
        </h2>
      </div>

      <div className="mt-5 sm:mx-auto sm:w-full sm:max-w-sm">
        <ConfirmForm/>
      </div>
    </div>
  </>
  )
}