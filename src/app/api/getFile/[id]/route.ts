import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
const supabaseClient = createClient(supabaseUrl as string, supabaseKey as string);

export async function GET(req: Request, { params }: { params: { id: string } }) {
  const { id: fileID } = params;
  try {
    // get the file from the 'submission-files' bucket with the given ID
    const { data: fileData } = await supabaseClient
      .storage
      .from('submission-files')
      .getPublicUrl(`submission-${fileID}`);

    return NextResponse.json({ publicUrl: fileData.publicUrl });
    
  } catch (error) {
    console.error('Error downloading file:', error);
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    return NextResponse.json({ message: errorMessage }, { status: 500 });
    
  }
}