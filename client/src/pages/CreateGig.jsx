import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import API from '../api/axios';
import toast from 'react-hot-toast';

const categories = ['Web Development', 'Graphic Design', 'Content Writing', 'Video Editing', 'Digital Marketing', 'Data Science'];

const CreateGig = () => {
  const [form, setForm] = useState({
    title: '', description: '', category: '', price: '', deliveryDays: '', image: ''
  });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async () => {
    if (!form.title || !form.description || !form.category || !form.price) {
      toast.error('Saari fields bharo!');
      return;
    }
    setLoading(true);
    try {
      await API.post('/gigs', form);
      toast.success('Gig create ho gayi!');
      navigate('/seller/dashboard');
    } catch (err) {
      toast.error(err.response?.data?.message || 'Error!');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-8">
      <div className="max-w-2xl mx-auto">
        <div className="bg-white rounded-2xl shadow-sm p-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">Create a New Gig</h1>
          <p className="text-gray-500 mb-8">Fill in the details to list your service.</p>

          <div className="space-y-5">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Gig Title</label>
              <input
                type="text"
                placeholder="I will build a professional React website"
                value={form.title}
                onChange={(e) => setForm({ ...form, title: e.target.value })}
                className="w-full border border-gray-300 rounded-lg px-4 py-3 text-gray-700 outline-none focus:border-green-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
              <textarea
                placeholder="Describe your service in detail..."
                rows={4}
                value={form.description}
                onChange={(e) => setForm({ ...form, description: e.target.value })}
                className="w-full border border-gray-300 rounded-lg px-4 py-3 text-gray-700 outline-none focus:border-green-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
              <select
                value={form.category}
                onChange={(e) => setForm({ ...form, category: e.target.value })}
                className="w-full border border-gray-300 rounded-lg px-4 py-3 text-gray-700 outline-none focus:border-green-500"
              >
                <option value="">Select a category</option>
                {categories.map((cat) => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Price (₹)</label>
                <input
                  type="number"
                  placeholder="999"
                  value={form.price}
                  onChange={(e) => setForm({ ...form, price: e.target.value })}
                  className="w-full border border-gray-300 rounded-lg px-4 py-3 text-gray-700 outline-none focus:border-green-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Delivery (days)</label>
                <input
                  type="number"
                  placeholder="3"
                  value={form.deliveryDays}
                  onChange={(e) => setForm({ ...form, deliveryDays: e.target.value })}
                  className="w-full border border-gray-300 rounded-lg px-4 py-3 text-gray-700 outline-none focus:border-green-500"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Image URL (optional)</label>
              <input
                type="text"
                placeholder="https://example.com/image.jpg"
                value={form.image}
                onChange={(e) => setForm({ ...form, image: e.target.value })}
                className="w-full border border-gray-300 rounded-lg px-4 py-3 text-gray-700 outline-none focus:border-green-500"
              />
            </div>

            <button
              onClick={handleSubmit}
              disabled={loading}
              style={{ backgroundColor: '#1DBF73' }}
              className="w-full text-white font-semibold py-3 rounded-lg hover:opacity-90 transition"
            >
              {loading ? 'Creating...' : 'Create Gig'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateGig;