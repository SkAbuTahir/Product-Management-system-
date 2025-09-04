import { useState, useEffect } from 'react';

export default function PublishedProducts() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetchPublishedProducts();
  }, []);

  const fetchPublishedProducts = async () => {
    try {
      const res = await fetch('/api/products/live');
      const data = await res.json();
      console.log('Published products response:', data);
      setProducts(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error('Error fetching published products:', error);
      setProducts([]);
    }
  };

  return (
    <div style={{ padding: '20px', fontFamily: 'Arial' }}>
      <h1>Published Products</h1>
      <div style={{ marginBottom: '20px' }}>
        <a 
          href="/" 
          style={{ 
            padding: '10px 20px', 
            backgroundColor: '#007cba', 
            color: 'white', 
            textDecoration: 'none',
            borderRadius: '4px'
          }}
        >
          Back to CMS
        </a>
      </div>
      
      {products.length === 0 ? (
        <p>No published products available.</p>
      ) : (
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr style={{ backgroundColor: '#f5f5f5' }}>
              <th style={{ border: '1px solid #ddd', padding: '8px' }}>ID</th>
              <th style={{ border: '1px solid #ddd', padding: '8px' }}>Name</th>
              <th style={{ border: '1px solid #ddd', padding: '8px' }}>Description</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <tr key={product.product_id}>
                <td style={{ border: '1px solid #ddd', padding: '8px' }}>{product.product_id}</td>
                <td style={{ border: '1px solid #ddd', padding: '8px' }}>{product.product_name}</td>
                <td style={{ border: '1px solid #ddd', padding: '8px' }}>{product.product_desc}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}