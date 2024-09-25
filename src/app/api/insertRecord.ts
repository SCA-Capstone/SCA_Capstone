import type { NextApiRequest, NextApiResponse } from 'next';
import { supabaseServer } from '../../lib/supabaseServer';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const { record } = req.body;

    const { data, error } = await supabaseServer.from('job-submissions').insert([record]);

    if (error) {
      return res.status(500).json({ error: 'Error inserting data' });
    }

    res.status(200).json({ data });
  } else {
    res.status(405).json({ message: 'Method not allowed' });
  }
}
