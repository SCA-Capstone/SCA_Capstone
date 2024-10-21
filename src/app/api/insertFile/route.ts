import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
const supabaseClient = createClient(supabaseUrl as string, supabaseKey as string);

export async function POST(req: Request, { params }: { params: { folderName: string } }) {
    const { folderName } = params; // Capture the full folder name from the URL
    console.log('Received Folder Name:', folderName);  // Log to verify the folder name is received

    try {
        // Parse the file from the form data
        const formData = await req.formData();
        const file = formData.get('file') as File;

        if (!file) {
            return NextResponse.json({ message: 'No file provided' }, { status: 400 });
        }

        const fileName = file.name;
        console.log(`Uploading to folder: ${folderName}`);  // Log folder name for debugging

        // Upload file to Supabase storage in the specified folder
        const { data, error } = await supabaseClient
            .storage
            .from('submission-files')
            .upload(`${folderName}/${fileName}`, file.stream(), {
                cacheControl: '3600',
                upsert: false,  // Prevent overwriting files
            });

        if (error) {
            throw new Error(error.message);
        }

        return NextResponse.json({ message: 'File uploaded successfully' }, { status: 201 });
    } catch (error) {
        console.error('Error uploading file:', error);
        const errorMessage = error instanceof Error ? error.message : 'Unknown error';
        return NextResponse.json({ message: errorMessage }, { status: 500 });
    }
}
