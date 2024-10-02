import { NextApiRequest, NextApiResponse } from 'next';
import { supabaseServer } from '../../../lib/supabaseServer';
import { nanoid } from 'nanoid';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    try {
      // Ensure there is a file in the request
      if (!req.body.fileData || !req.body.fileName) {
        return res.status(400).json({ error: 'File data and file name are required' });
      }

      const { fileData, fileName } = req.body;

      // Generate a unique filename (to avoid overwriting files with the same name)
      const uniqueFileName = `${nanoid()}_${fileName}`;

      // Upload the file to the Supabase storage bucket
      const { data, error } = await supabaseServer.storage
        .from('submission-files')
        .upload(uniqueFileName, Buffer.from(fileData, 'base64'), {
          contentType: 'application/octet-stream',
        });

      if (error) {
        throw error;
      }

      // Return the file URL to the client
      const fileUrl = `${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/submission-files/${uniqueFileName}`;

      res.status(200).json({ fileUrl });
    } catch (error) {
      res.status(500).json({ error: 'Failed to upload file' });
    }
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
}
