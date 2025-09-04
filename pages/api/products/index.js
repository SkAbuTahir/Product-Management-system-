import pool from '../../../lib/db';

export default async function handler(req, res) {
  const { method } = req;

  switch (method) {
    case 'GET':
      try {
        const [rows] = await pool.execute(
          'SELECT product_id, product_name, product_desc, status, created_by, created_at, updated_by, updated_at FROM Products WHERE is_deleted = FALSE ORDER BY created_at DESC'
        );
        res.status(200).json(rows);
      } catch (error) {
        res.status(500).json({ error: 'Database error' });
      }
      break;

    case 'POST':
      try {
        const { product_name, product_desc, created_by, status = 'Draft' } = req.body;
        const [result] = await pool.execute(
          'INSERT INTO Products (product_name, product_desc, created_by, status) VALUES (?, ?, ?, ?)',
          [product_name, product_desc, created_by, status]
        );
        res.status(201).json({ id: result.insertId, message: 'Product created' });
      } catch (error) {
        res.status(500).json({ error: 'Database error' });
      }
      break;

    default:
      res.setHeader('Allow', ['GET', 'POST']);
      res.status(405).end(`Method ${method} Not Allowed`);
  }
}