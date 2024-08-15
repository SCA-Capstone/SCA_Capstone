"use client";
import {
  ExclamationCircleIcon,
} from "@heroicons/react/24/outline";
import { useFormState, useFormStatus } from "react-dom";
import { handleSignIn } from "@/lib/cognito_actions";
import { TextInput } from "@/components/TextInput";

export default function SignUpForm() {
  const [errorMessage, dispatch] = useFormState(handleSignIn, undefined);
  return (
    <form action={dispatch} className="space-y-3">
        <TextInput label="Email" placeholder="Email Address" type="email" name="email"/>
        <TextInput label="Password" placeholder="Password" type="password" name="password"/>
        <SignInButton />
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

function SignInButton() {
  const { pending } = useFormStatus();
  return (
    <button
    className= "flex w-full justify-center rounded-md  px-3 py-1.5 text-sm font-semibold leading-6  focus-visible:outline focus-visible:outline-2 bg-sky-600  shadow-sm hover:bg-sky-500 focus-visible:outline-sky-500 text-white ocus-visible:outline-offset-2"
    aria-disabled={pending}>
      Create Account
    </button>
  );
}