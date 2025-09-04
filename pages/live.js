import { useState, useEffect } from 'react';

export default function Live() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetchLiveProducts();
  }, []);

  const fetchLiveProducts = async () => {
    const res = await fetch('/api/products/live');
    const data = await res.json();
    setProducts(data);
  };

  return (
    <div style={{ padding: '20px', fontFamily: 'Arial' }}>
      <h1>Live Products</h1>
      <p>These are the published products visible to the public:</p>
      
      {products.length === 0 ? (
        <p>No published products available.</p>
      ) : (
        <div style={{ display: 'grid', gap: '20px', marginTop: '20px' }}>
          {products.map((product) => (
            <div key={product.product_id} style={{ 
              border: '1px solid #ddd', 
              padding: '20px', 
              borderRadius: '8px',
              backgroundColor: '#f9f9f9'
            }}>
              <h3 style={{ margin: '0 0 10px 0', color: '#333' }}>{product.product_name}</h3>
              <p style={{ margin: '0', color: '#666' }}>{product.product_desc}</p>
            </div>
          ))}
        </div>
      )}
      
      <div style={{ marginTop: '30px' }}>
        <a href="/" style={{ 
          padding: '10px 20px', 
          backgroundColor: '#007cba', 
          color: 'white', 
          textDecoration: 'none',
          borderRadius: '4px'
        }}>
          Back to CMS
        </a>
      </div>
    </div>
  );
}