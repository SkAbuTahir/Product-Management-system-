import pool from '../../../lib/db';

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    res.setHeader('Allow', ['GET']);
    return res.status(405).end(`Method ${req.method} Not Allowed`);
  }

  try {
    const [rows] = await pool.execute(
      'SELECT product_id, product_name, product_desc FROM Products WHERE status = "Published" AND is_deleted = FALSE'
    );
    console.log('Published products query result:', rows);
    res.status(200).json(rows);
  } catch (error) {
    console.error('Published products error:', error);
    res.status(500).json({ error: error.message });
  }
}