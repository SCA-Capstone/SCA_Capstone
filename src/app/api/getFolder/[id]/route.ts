import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
const apiAuthToken = process.env.API_AUTH_TOKEN;
const supabaseClient = createClient(supabaseUrl as string, supabaseKey as string);

export async function GET(req: Request, { params }: { params: { id: string } }) {
  const { id } = params; // 'id' refers to the last three digits

  // Check for authorization token
  const authHeader = req.headers.get('Authorization');
  if (!authHeader || authHeader !== `Bearer ${apiAuthToken}`) {
    return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
  }
  
  try {
    // Get all folders in the 'submission-files' bucket
    const { data: folderList, error: folderError } = await supabaseClient
      .storage
      .from('submission-files')
      .list('', { limit: 100, offset: 0 }); // List top-level folders/files

    if (folderError) {
      throw new Error(folderError.message);
    }

    // Filter by Submission ID, modify if you want to search by User ID
    const matchingFolder = folderList.find((folder) => 
      folder.name.slice(-id.length) === id
    );

    if (!matchingFolder) {
      return NextResponse.json({ message: 'No matching folder found' }, { status: 404 });
    }

    // List all files in the matching folder
    const { data: fileList, error: fileError } = await supabaseClient
      .storage
      .from('submission-files')
      .list(matchingFolder.name);

    if (fileError) {
      throw new Error(fileError.message);
    }

    // Map file names to public URLs and access data.publicUrl correctly
    const publicUrls = fileList.map((file) => {
      const { data } = supabaseClient
        .storage
        .from('submission-files')
        .getPublicUrl(`${matchingFolder.name}/${file.name}`);
        
      return { fileName: file.name, publicUrl: data.publicUrl };
    });

    // Return folder name and files
    return NextResponse.json({ folderName: matchingFolder.name, files: publicUrls });
    
  } catch (error) {
    console.error('Error fetching files:', error);
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    return NextResponse.json({ message: errorMessage }, { status: 500 });
  }
}
