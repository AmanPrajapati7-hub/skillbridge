import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import API from '../api/axios';
import { useAuth } from '../context/AuthContext';
import toast from 'react-hot-toast';

const GigDetail = () => {
  const { id } = useParams();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [gig, setGig] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [review, setReview] = useState({ rating: 5, comment: '' });
  const [loading, setLoading] = useState(true);
  const [ordering, setOrdering] = useState(false);

  useEffect(() => {
    const fetchGig = async () => {
      try {
        const { data } = await API.get(`/gigs/${id}`);
        setGig(data);
        const rev = await API.get(`/reviews/${id}`);
        setReviews(rev.data);
      } catch (err) {
        console.log(err);
      } finally {
        setLoading(false);
      }
    };
    fetchGig();
  }, [id]);

  const handleOrder = async () => {
    if (!user) { navigate('/login'); return; }
    setOrdering(true);
    try {
      await API.post(`/orders/${id}`);
      toast.success('Order placed successfully!');
      navigate('/orders');
    } catch (err) {
      toast.error(err.response?.data?.message || 'Error placing order!');
    } finally {
      setOrdering(false);
    }
  };

  const handleReview = async () => {
    if (!user) { navigate('/login'); return; }
    try {
      await API.post(`/reviews/${id}`, review);
      toast.success('Review submitted!');
      const rev = await API.get(`/reviews/${id}`);
      setReviews(rev.data);
      setReview({ rating: 5, comment: '' });
    } catch (err) {
      toast.error(err.response?.data?.message || 'Error!');
    }
  };

  if (loading) return <div className="flex justify-center items-center h-screen text-gray-400">Loading...</div>;
  if (!gig) return <div className="text-center py-20">Gig not found!</div>;

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-8">
      <div className="max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left */}
        <div className="lg:col-span-2">
          <h1 className="text-3xl font-bold text-gray-800 mb-4">{gig.title}</h1>

          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center text-green-600 font-bold">
              {gig.seller?.name?.[0]}
            </div>
            <div>
              <p className="font-semibold text-gray-800">{gig.seller?.name}</p>
              <p className="text-sm text-yellow-500">★ {gig.rating?.toFixed(1) || '0.0'} ({gig.totalReviews} reviews)</p>
            </div>
          </div>

          {gig.image && (
            <img src={gig.image} alt={gig.title} className="w-full rounded-xl mb-6 object-cover h-64" />
          )}

          <div className="bg-white rounded-xl p-6 shadow-sm mb-6">
            <h2 className="text-xl font-bold text-gray-800 mb-3">About This Gig</h2>
            <p className="text-gray-600 leading-relaxed">{gig.description}</p>
          </div>

          {/* Reviews */}
          <div className="bg-white rounded-xl p-6 shadow-sm">
            <h2 className="text-xl font-bold text-gray-800 mb-4">Reviews ({reviews.length})</h2>
            {reviews.length === 0 ? (
              <p className="text-gray-400">No reviews yet.</p>
            ) : (
              reviews.map((r) => (
                <div key={r._id} className="border-b border-gray-100 py-4">
                  <div className="flex items-center gap-2 mb-1">
                    <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-bold text-sm">
                      {r.buyer?.name?.[0]}
                    </div>
                    <span className="font-medium text-gray-700">{r.buyer?.name}</span>
                    <span className="text-yellow-500 text-sm">{'★'.repeat(r.rating)}</span>
                  </div>
                  <p className="text-gray-600 text-sm">{r.comment}</p>
                </div>
              ))
            )}

            {user && user.role === 'buyer' && (
              <div className="mt-6">
                <h3 className="font-semibold text-gray-700 mb-3">Leave a Review</h3>
                <select
                  value={review.rating}
                  onChange={(e) => setReview({ ...review, rating: Number(e.target.value) })}
                  className="border border-gray-300 rounded-lg px-3 py-2 mb-3 outline-none"
                >
                  {[5,4,3,2,1].map((n) => <option key={n} value={n}>{n} Stars</option>)}
                </select>
                <textarea
                  placeholder="Write your review..."
                  value={review.comment}
                  onChange={(e) => setReview({ ...review, comment: e.target.value })}
                  className="w-full border border-gray-300 rounded-lg px-4 py-3 outline-none mb-3"
                  rows={3}
                />
                <button onClick={handleReview} style={{ backgroundColor: '#1DBF73' }} className="text-white px-6 py-2 rounded-lg font-semibold">
                  Submit Review
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Right - Order Card */}
        <div>
          <div className="bg-white rounded-xl shadow-sm p-6 sticky top-6">
            <p className="text-3xl font-bold text-gray-800 mb-1">₹{gig.price}</p>
            <p className="text-gray-500 text-sm mb-4">Delivery in {gig.deliveryDays} days</p>

            <div className="border-t border-gray-100 py-4 mb-4">
              <p className="text-sm text-gray-600">{gig.description?.substring(0, 100)}...</p>
            </div>

            <button
              onClick={handleOrder}
              disabled={ordering}
              style={{ backgroundColor: '#1DBF73' }}
              className="w-full text-white font-semibold py-3 rounded-lg hover:opacity-90 transition mb-3"
            >
              {ordering ? 'Placing Order...' : 'Continue (₹' + gig.price + ')'}
            </button>

            <button
              onClick={() => navigate(`/chat/${gig.seller?._id}`)}
              className="w-full border-2 border-green-500 text-green-600 font-semibold py-3 rounded-lg hover:bg-green-50 transition"
            >
              Contact Seller
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GigDetail;