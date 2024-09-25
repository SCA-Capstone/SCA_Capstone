// pages/api/deleteRecord.ts
import type { NextApiRequest, NextApiResponse } from 'next';
import { supabaseServer } from '../../lib/supabaseServer'; // Server-side instance

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'DELETE') {
    const { id } = req.body;

    const { data, error } = await supabaseServer
      .from('job-submissions')
      .delete()
      .eq('id', id);

    if (error) {
      res.status(500).json({ error: 'Error deleting record' });
    } else {
      res.status(200).json({ data });
    }
  } else {
    res.status(405).json({ message: 'Method not allowed' });
  }
}
