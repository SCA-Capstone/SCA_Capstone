'use server'

import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { createClient } from '@/utils/supabase/server'
export async function handleLogin({email,password}:{email:string, password:string}) {
  const supabase = createClient()
  const { error } = await supabase.auth.signInWithPassword({email,password})
  if (error) {
    redirect('/error')
  }
  revalidatePath('/dashboard', 'layout')
  redirect('/dashboard')
}
export async function handleSignup({email,password,name}:{email:string, password:string,name:string}) {
  const supabase = createClient()
  const { error } = await supabase.auth.signUp({email,password,options:{data:{name}}})
  if (error) {
    redirect('/error')
  }
  revalidatePath('/', 'layout')
  redirect('/')
}
export async function handleSignout({}) {
  const supabase = createClient()
  const { error } = await supabase.auth.signOut()
  if (error) {
    redirect('/error')
  }
  revalidatePath('/', 'layout')
  redirect('/auth/sign-in')
}