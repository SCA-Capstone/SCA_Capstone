import { NextApiRequest, NextApiResponse } from 'next';
import { supabaseServer } from '../../../lib/supabaseServer';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    try {
      const { fileName } = req.query;

      if (!fileName) {
        return res.status(400).json({ error: 'File name is required' });
      }

      // delete the file from the Supabase storage bucket
      const { data, error } = await supabaseServer.storage
        .from('submission-files')
        .remove([fileName as string]);

      if (error) {
        throw error;
      }

    } catch (error) {
      res.status(500).json({ error: 'Failed to delete file' });
    }
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
}
