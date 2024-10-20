import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
const supabaseClient = createClient(supabaseUrl as string, supabaseKey as string);

export async function GET(req: Request, { params }: { params: { id: string } }) {
  const { id: userId } = params;
  
  // get the job-submissions for the user with the given ID
  const {data: jobSubmissions, error} = await supabaseClient
    .from('job-submissions')
    .select('*')
    .eq('userId', userId)

  if (error) {
    throw new Error(error.message);
  }

  return NextResponse.json(jobSubmissions);

}