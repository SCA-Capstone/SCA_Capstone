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
  revalidatePath('/', 'layout')
  redirect('/')
}
export async function handleSignup({email,password}:{email:string, password:string}) {
  const supabase = createClient()
  const { error } = await supabase.auth.signUp({email,password})
  if (error) {
    redirect('/error')
  }
  revalidatePath('/', 'layout')
  redirect('/')
}