import pool from '../../lib/db';

export default async function handler(req, res) {
  try {
    const [rows] = await pool.execute('SELECT 1 as test');
    res.status(200).json({ success: true, message: 'Database connected', data: rows });
  } catch (error) {
    res.status(500).json({ 
      success: false, 
      error: error.message,
      code: error.code,
      env: process.env.DATABASE_URL ? 'URL exists' : 'URL missing'
    });
  }
}