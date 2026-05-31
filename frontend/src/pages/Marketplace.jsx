import React, { useState, useEffect } from 'react';
import axios from 'axios';
import useAuthStore from '../store/authStore';
import toast from 'react-hot-toast';

const Marketplace = () => {
  const [products, setProducts] = useState([]);
  const [form, setForm] = useState({ name: '', description: '', price: '', category: '' });
  const { user } = useAuthStore();

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const res = await axios.get('http://localhost:5000/api/marketplace');
      setProducts(res.data);
    } catch (err) { console.error(err); }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:5000/api/marketplace', form, { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } });
      toast.success('Product listed!');
      fetchProducts();
      setForm({ name: '', description: '', price: '', category: '' });
    } catch (err) {
      toast.error('Failed to list product');
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6">Marketplace</h1>
      {user && (
        <div className="bg-white dark:bg-gray-800 p-4 rounded shadow mb-8">
          <h2 className="text-xl font-semibold mb-3">List a Product</h2>
          <form onSubmit={handleSubmit} className="space-y-3">
            <input type="text" placeholder="Product Name" value={form.name} onChange={e => setForm({...form, name: e.target.value})} required className="w-full p-2 border rounded dark:bg-gray-700" />
            <textarea placeholder="Description" value={form.description} onChange={e => setForm({...form, description: e.target.value})} className="w-full p-2 border rounded dark:bg-gray-700" />
            <input type="number" placeholder="Price" value={form.price} onChange={e => setForm({...form, price: e.target.value})} required className="w-full p-2 border rounded dark:bg-gray-700" />
            <input type="text" placeholder="Category" value={form.category} onChange={e => setForm({...form, category: e.target.value})} className="w-full p-2 border rounded dark:bg-gray-700" />
            <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">List Product</button>
          </form>
        </div>
      )}
      <div className="grid md:grid-cols-3 gap-4">
        {products.map(p => (
          <div key={p._id} className="bg-white dark:bg-gray-800 rounded shadow p-4">
            <h3 className="font-bold text-lg">{p.name}</h3>
            <p className="text-gray-600 dark:text-gray-400">{p.description}</p>
            <p className="text-green-600 font-bold mt-2">${p.price}</p>
            <p className="text-sm text-gray-500">Sold by: {p.seller?.name}</p>
            <button className="mt-2 bg-green-500 text-white px-3 py-1 rounded">Buy</button>
          </div>
        ))}
      </div>
    </div>
  );
};
export default Marketplace;
