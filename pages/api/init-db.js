import pool from '../../lib/db';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    // Create table if it doesn't exist
    await pool.execute(`
      CREATE TABLE IF NOT EXISTS Products (
        product_id      INT AUTO_INCREMENT PRIMARY KEY,
        product_name    VARCHAR(100) NOT NULL,
        product_desc    TEXT,
        status          ENUM('Draft', 'Published', 'Archived') DEFAULT 'Draft',
        created_by      VARCHAR(50) NOT NULL,
        created_at      TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_by      VARCHAR(50),
        updated_at      TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
        is_deleted      BOOLEAN DEFAULT FALSE
      )
    `);

    // Insert sample data if table is empty
    const [rows] = await pool.execute('SELECT COUNT(*) as count FROM Products');
    if (rows[0].count === 0) {
      await pool.execute(`
        INSERT INTO Products (product_name, product_desc, created_by, status) VALUES 
        ('Product A', 'Description for Product A', 'admin', 'Draft'),
        ('Product B', 'Description for Product B', 'admin', 'Published')
      `);
    }

    res.status(200).json({ message: 'Database initialized successfully' });
  } catch (error) {
    console.error('Database init error:', error);
    res.status(500).json({ error: error.message });
  }
}