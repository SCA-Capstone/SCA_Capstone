"use client";
import {
  ExclamationCircleIcon,
} from "@heroicons/react/24/outline";
import { useFormState, useFormStatus } from "react-dom";
import { handleResetPassword } from "@/lib/cognito_actions";
import { TextInput } from "@/components/TextInput";

export default function SignUpForm() {
  const [errorMessage, dispatch] = useFormState(handleResetPassword, undefined);
  return (
    <form action={dispatch} className="space-y-3">
        <TextInput label="Email" placeholder="Email Address" type="email" name="email"/>
        <ConfirmButton />
        <div
          className="flex h-8 space-x-2"
          aria-live="polite"
          aria-atomic="true"
        >
          {errorMessage && (
            <>
              <ExclamationCircleIcon className="h-5 w-5 text-red-500" />
              <p className="text-xs font-medium text-red-500">{errorMessage}</p>
            </>
          )}
        </div>
    </form>
  );
}

function ConfirmButton() {
  const { pending } = useFormStatus();
  return (
    <button
    className= "flex w-full justify-center rounded-md  px-3 py-1.5 text-sm font-semibold leading-6  focus-visible:outline focus-visible:outline-2 bg-[#45503B] shadow-sm hover:bg-[#6C7C59] text-white ocus-visible:outline-offset-2"
    aria-disabled={pending}>
      Send Code
    </button>
  );
}