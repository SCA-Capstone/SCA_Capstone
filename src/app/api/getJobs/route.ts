import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
const supabaseClient = createClient(supabaseUrl as string, supabaseKey as string);

export async function GET(req: Request) {
  try {
    
    const { data: records, error } = await supabaseClient
      .from('job-submissions')
      .select('*')
      .order('created_at', { ascending: false });
    
    if (error) {
      throw new Error(error.message);
    }
    
    return NextResponse.json(records);


  } catch (error) {
    console.error('Error getting records:', error);
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    return NextResponse.json({ message: errorMessage }, { status: 500 });
    
  }
}