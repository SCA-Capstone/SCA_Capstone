import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
const supabaseClient = createClient(supabaseUrl as string, supabaseKey as string);

export async function POST(req: Request, { params }: { params: { folderName: string } }) {
    const { folderName } = params;
    console.log('Received Folder Name:', folderName);

    try {
        const formData = await req.formData();
        const file = formData.get('file') as File;

        if (!file) {
            return NextResponse.json({ message: 'No file provided' }, { status: 400 });
        }

        const fileName = file.name;
        console.log(`Uploading to folder: ${folderName}`);

        // Convert file stream to a buffer
        const fileBuffer = await file.arrayBuffer();
        const buffer = Buffer.from(fileBuffer);

        // Upload the buffer to Supabase storage in the specified folder
        const { data, error } = await supabaseClient
            .storage
            .from('response-files')
            .upload(`${folderName}/${fileName}`, buffer, {
                cacheControl: '3600',
                upsert: false,
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
