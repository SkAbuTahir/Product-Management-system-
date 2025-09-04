import pool from '../../../lib/db';

export default async function handler(req, res) {
  const { method, query: { id } } = req;

  switch (method) {
    case 'PUT':
      try {
        const { product_name, product_desc, updated_by, status } = req.body;
        await pool.execute(
          'UPDATE Products SET product_name = ?, product_desc = ?, updated_by = ?, status = ? WHERE product_id = ?',
          [product_name, product_desc, updated_by, status, id]
        );
        res.status(200).json({ message: 'Product updated' });
      } catch (error) {
        res.status(500).json({ error: 'Database error' });
      }
      break;

    case 'DELETE':
      try {
        const { updated_by } = req.body;
        await pool.execute(
          'UPDATE Products SET is_deleted = TRUE, updated_by = ? WHERE product_id = ?',
          [updated_by, id]
        );
        res.status(200).json({ message: 'Product deleted' });
      } catch (error) {
        res.status(500).json({ error: 'Database error' });
      }
      break;

    default:
      res.setHeader('Allow', ['PUT', 'DELETE']);
      res.status(405).end(`Method ${method} Not Allowed`);
  }
}