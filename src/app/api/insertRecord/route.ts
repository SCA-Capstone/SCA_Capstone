import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
const supabaseClient = createClient(supabaseUrl as string, supabaseKey as string);

export async function POST(req: Request) {
  try {
    // Destructure the values from the request body
    const { id, created_at, name, email, company, files, userId, status } = await req.json();

    // Insert the record into the 'job-submissions' table
    const { data, error } = await supabaseClient
      .from('job-submissions')
      .insert([{
        id,               // Example: 554
        created_at,       // Example: "2024-09-19T02:24:58.608Z"
        name,             // Example: "testing 3 files at once"
        email,            // Example: "jordi.castro003@gmail.com"
        company,          // Example: "CALTECH"
        files,            // Example: true
        userId,           // Example: 492
        status            // Example: "waiting"
      }]);

    // Handle any errors that occur during the insertion
    if (error) {
      throw new Error(error.message);
    }

    // Return the inserted data
    return NextResponse.json(data, { status: 200 });

  } catch (error) {
    console.error('Error inserting record:', error);
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    return NextResponse.json({ message: errorMessage }, { status: 500 });
  }
}
