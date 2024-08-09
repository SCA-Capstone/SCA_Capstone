'use server'
import { signUp,signOut } from 'aws-amplify/auth';
import { confirmSignUp, type ConfirmSignUpInput } from 'aws-amplify/auth';
import { signIn, type SignInInput } from 'aws-amplify/auth';
import { redirect } from "next/navigation";
import { resendSignUpCode } from 'aws-amplify/auth';
import { autoSignIn } from 'aws-amplify/auth';

type SignUpParameters = {
  password: string;
  email: string;
  name: string;
};

export async function handleSignUp({
  password,
  email,
  name
}: SignUpParameters) {
  try {
    const { isSignUpComplete, userId, nextStep } = await signUp({
      username:email,
      password,
      options: {
        userAttributes: {
          email,
          name // E.164 number convention
        },
        // optional
        autoSignIn: true // or SignInOptions e.g { authFlowType: "USER_SRP_AUTH" }
      }
    });

    console.log(userId);
    
  } catch (error) {
    console.log('error signing up:', error);
  }
  redirect("/auth/confirm-email");
}

export async function handleSignUpConfirmation({
  email,
  code
}: {email:string, code:string}) {
  try {
    const { isSignUpComplete, nextStep } = await confirmSignUp({
      username:email,
      confirmationCode:code
    });
    autoSignIn()
  } catch (error) {
    console.log('error confirming sign up', error);
  }
  redirect('/auth/sign-in')
}
export async function handleSignIn({ email, password }: {email:string, password:string}) {
    let redirectLink = "/dashboard";
  try {
    const { isSignedIn, nextStep } = await signIn({ username:email, password });
    if (nextStep.signInStep === "CONFIRM_SIGN_UP") {
        await resendSignUpCode({username:email});
        redirectLink = "/auth/confirm-email";
  } }
  catch (error) {
    console.log('error signing in', error);
  }
  redirect(redirectLink);
}
export async function handleSignOut() {
    try {
      await signOut();
    } catch (error) {
      console.log(error);
    }
    redirect("/auth/sign-in");
  }