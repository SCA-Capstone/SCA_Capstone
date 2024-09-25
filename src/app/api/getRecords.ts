import { NextApiRequest, NextApiResponse } from 'next';
import { supabaseServer } from '../../lib/supabaseServer';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    try {
      // Example: Fetch all rows from a table called 'your_table'
      const { data, error } = await supabaseServer
        .from('job-submissions')
        .select('*'); // Adjust fields as needed

      if (error) {
        throw error;
      }

      res.status(200).json({ records: data });
    } catch (error) {
      res.status(500).json({ error: 'Failed to fetch records' });
    }
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
}
