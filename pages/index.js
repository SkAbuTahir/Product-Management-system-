import { useState, useEffect } from 'react';

export default function Home() {
  const [products, setProducts] = useState([]);
  const [form, setForm] = useState({ product_name: '', product_desc: '', status: 'Draft' });
  const [editId, setEditId] = useState(null);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    const res = await fetch('/api/products');
    const data = await res.json();
    setProducts(data);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const method = editId ? 'PUT' : 'POST';
    const url = editId ? `/api/products/${editId}` : '/api/products';
    const body = editId 
      ? { ...form, updated_by: 'admin' }
      : { ...form, created_by: 'admin' };

    await fetch(url, {
      method,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body)
    });

    setForm({ product_name: '', product_desc: '', status: 'Draft' });
    setEditId(null);
    fetchProducts();
  };

  const handleEdit = (product) => {
    setForm({
      product_name: product.product_name,
      product_desc: product.product_desc,
      status: product.status
    });
    setEditId(product.product_id);
  };

  const handleDelete = async (id) => {
    await fetch(`/api/products/${id}`, {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ updated_by: 'admin' })
    });
    fetchProducts();
  };

  return (
    <div style={{ padding: '20px', fontFamily: 'Arial' }}>
      <h1>Product Management CMS</h1>
      
      <form onSubmit={handleSubmit} style={{ marginBottom: '30px', padding: '20px', border: '1px solid #ccc' }}>
        <h3>{editId ? 'Edit Product' : 'Add New Product'}</h3>
        <div style={{ marginBottom: '10px' }}>
          <input
            type="text"
            placeholder="Product Name"
            value={form.product_name}
            onChange={(e) => setForm({ ...form, product_name: e.target.value })}
            required
            style={{ width: '100%', padding: '8px', marginBottom: '10px' }}
          />
        </div>
        <div style={{ marginBottom: '10px' }}>
          <textarea
            placeholder="Product Description"
            value={form.product_desc}
            onChange={(e) => setForm({ ...form, product_desc: e.target.value })}
            style={{ width: '100%', padding: '8px', height: '80px', marginBottom: '10px' }}
          />
        </div>
        <div style={{ marginBottom: '10px' }}>
          <select
            value={form.status}
            onChange={(e) => setForm({ ...form, status: e.target.value })}
            style={{ padding: '8px', marginBottom: '10px' }}
          >
            <option value="Draft">Draft</option>
            <option value="Published">Published</option>
            <option value="Archived">Archived</option>
          </select>
        </div>
        <button type="submit" style={{ padding: '10px 20px', backgroundColor: '#007cba', color: 'white', border: 'none' }}>
          {editId ? 'Update' : 'Create'} Product
        </button>
        {editId && (
          <button 
            type="button" 
            onClick={() => { setEditId(null); setForm({ product_name: '', product_desc: '', status: 'Draft' }); }}
            style={{ padding: '10px 20px', marginLeft: '10px', backgroundColor: '#666', color: 'white', border: 'none' }}
          >
            Cancel
          </button>
        )}
      </form>

      <h3>Products List</h3>
      <table style={{ width: '100%', borderCollapse: 'collapse' }}>
        <thead>
          <tr style={{ backgroundColor: '#f5f5f5' }}>
            <th style={{ border: '1px solid #ddd', padding: '8px' }}>ID</th>
            <th style={{ border: '1px solid #ddd', padding: '8px' }}>Name</th>
            <th style={{ border: '1px solid #ddd', padding: '8px' }}>Description</th>
            <th style={{ border: '1px solid #ddd', padding: '8px' }}>Status</th>
            <th style={{ border: '1px solid #ddd', padding: '8px' }}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product) => (
            <tr key={product.product_id}>
              <td style={{ border: '1px solid #ddd', padding: '8px' }}>{product.product_id}</td>
              <td style={{ border: '1px solid #ddd', padding: '8px' }}>{product.product_name}</td>
              <td style={{ border: '1px solid #ddd', padding: '8px' }}>{product.product_desc}</td>
              <td style={{ border: '1px solid #ddd', padding: '8px' }}>
                <span style={{ 
                  padding: '4px 8px', 
                  borderRadius: '4px',
                  backgroundColor: product.status === 'Published' ? '#4caf50' : product.status === 'Draft' ? '#ff9800' : '#757575',
                  color: 'white',
                  fontSize: '12px'
                }}>
                  {product.status}
                </span>
              </td>
              <td style={{ border: '1px solid #ddd', padding: '8px' }}>
                <button 
                  onClick={() => handleEdit(product)}
                  style={{ padding: '5px 10px', marginRight: '5px', backgroundColor: '#2196f3', color: 'white', border: 'none' }}
                >
                  Edit
                </button>
                <button 
                  onClick={() => handleDelete(product.product_id)}
                  style={{ padding: '5px 10px', backgroundColor: '#f44336', color: 'white', border: 'none' }}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}