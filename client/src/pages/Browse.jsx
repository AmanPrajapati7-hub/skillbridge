import { useState, useEffect } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import API from '../api/axios';

const categories = ['Web Development', 'Graphic Design', 'Content Writing', 'Video Editing', 'Digital Marketing', 'Data Science'];

const Browse = () => {
  const [gigs, setGigs] = useState([]);
  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [loading, setLoading] = useState(true);
  const [searchParams] = useSearchParams();

  useEffect(() => {
    const cat = searchParams.get('category');
    if (cat) setSelectedCategory(cat);
  }, []);

  useEffect(() => {
    fetchGigs();
  }, [selectedCategory]);

  const fetchGigs = async () => {
    try {
      setLoading(true);
      const params = {};
      if (selectedCategory) params.category = selectedCategory;
      if (search) params.search = search;
      const { data } = await API.get('/gigs', { params });
      setGigs(data);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div style={{ backgroundColor: '#1DBF73' }} className="py-12 px-8 text-center text-white">
        <h1 className="text-4xl font-bold mb-4">Browse Gigs</h1>
        <div className="flex justify-center">
          <div className="flex bg-white rounded-xl overflow-hidden shadow w-full max-w-lg">
            <input
              type="text"
              placeholder="Search gigs..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="flex-1 px-5 py-3 text-gray-700 outline-none"
            />
            <button onClick={fetchGigs} style={{ backgroundColor: '#1DBF73' }} className="px-6 py-3 text-white font-semibold">
              Search
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-8 py-10">
        {/* Categories */}
        <div className="flex gap-3 flex-wrap mb-8">
          <button
            onClick={() => setSelectedCategory('')}
            className={`px-4 py-2 rounded-full border font-medium transition ${!selectedCategory ? 'bg-green-500 text-white border-green-500' : 'border-gray-300 text-gray-600 hover:border-green-400'}`}
          >
            All
          </button>
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-2 rounded-full border font-medium transition ${selectedCategory === cat ? 'bg-green-500 text-white border-green-500' : 'border-gray-300 text-gray-600 hover:border-green-400'}`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Gigs Grid */}
        {loading ? (
          <div className="text-center py-20 text-gray-400">Loading gigs...</div>
        ) : gigs.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-gray-400 text-lg">No gigs found. Be the first to create one!</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {gigs.map((gig) => (
              <Link to={`/gig/${gig._id}`} key={gig._id} className="bg-white rounded-xl shadow-sm hover:shadow-md transition overflow-hidden">
                <div className="h-48 bg-gray-100 flex items-center justify-center">
                  {gig.image ? (
                    <img src={gig.image} alt={gig.title} className="w-full h-full object-cover" />
                  ) : (
                    <span className="text-gray-300 text-5xl">🖼️</span>
                  )}
                </div>
                <div className="p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center text-green-600 font-bold text-sm">
                      {gig.seller?.name?.[0]}
                    </div>
                    <span className="text-sm text-gray-600">{gig.seller?.name}</span>
                  </div>
                  <h3 className="font-semibold text-gray-800 mb-2 line-clamp-2">{gig.title}</h3>
                  <div className="flex items-center justify-between mt-3">
                    <span className="text-xs text-gray-400">{gig.category}</span>
                    <span className="font-bold text-green-600">From ₹{gig.price}</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Browse;