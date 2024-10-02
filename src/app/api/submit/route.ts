import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
const supabaseClient = createClient(supabaseUrl as string, supabaseKey as string);

export async function POST(req: Request) {
    try {
        const { id, created_at, name, email, company, userId, files } = await req.json();
        const isFiles = files && Object.keys(files).length > 0 ? true : false

        // upload files to supabase (storage in submission-files bucket)
        // upload each file separately
        if (isFiles) {
            const filesArray = Object.values(files);
            let i = 0;
            for (const file of filesArray) {
                const { data: fileData, error: fileError } = await supabaseClient
                    .storage
                    .from('submission-files')
                    .upload(`submission-${id}`, file as Blob);
                
                if (fileError) {
                    throw new Error(fileError.message);
                } else i++;
            }


        }


        console.log('Form data:', { id, created_at, name, email, company, userId, files });

        // Insert form data into the 'job-submissions' table
        const { data, error } = await supabaseClient
            .from('job-submissions')
            .insert([{ id, created_at, name, email, company, userId, files: isFiles }]);

        if (error) {
            throw new Error(error.message);
        }

        return NextResponse.json({ message: 'Form submitted successfully' }, { status: 201 });
    } catch (error) {
        console.error('Error submitting form:', error);
        const errorMessage = error instanceof Error ? error.message : 'Unknown error';
        return NextResponse.json({ message: errorMessage }, { status: 500 });
    }
}