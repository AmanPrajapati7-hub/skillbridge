import { useAuth } from '../context/AuthContext';
import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import API from '../api/axios';

const SellerDashboard = () => {
  const { user } = useAuth();
  const [gigs, setGigs] = useState([]);

  useEffect(() => {
    const fetchGigs = async () => {
      try {
        const { data } = await API.get('/gigs/my');
        setGigs(data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchGigs();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-8">
      <div className="max-w-5xl mx-auto">
        <div className="bg-white rounded-2xl shadow-sm p-8 mb-8 flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-gray-800 mb-1">Seller Dashboard</h1>
            <p className="text-gray-500">Welcome back, {user?.name}!</p>
          </div>
          <Link to="/seller/create-gig" style={{ backgroundColor: '#1DBF73' }} className="text-white px-6 py-3 rounded-lg font-semibold hover:opacity-90">
            + Create New Gig
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {[
            { label: 'Total Gigs', value: gigs.length, color: 'text-blue-600' },
            { label: 'Active Orders', value: '0', color: 'text-green-600' },
            { label: 'Total Earnings', value: '₹0', color: 'text-purple-600' },
          ].map((stat) => (
            <div key={stat.label} className="bg-white rounded-xl shadow-sm p-6">
              <p className="text-gray-500 text-sm mb-1">{stat.label}</p>
              <p className={`text-3xl font-bold ${stat.color}`}>{stat.value}</p>
            </div>
          ))}
        </div>

        <div className="bg-white rounded-2xl shadow-sm p-8">
          <h2 className="text-xl font-bold text-gray-800 mb-6">My Gigs</h2>
          {gigs.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-400 mb-4">No gigs yet. Create your first gig!</p>
              <Link to="/seller/create-gig" style={{ backgroundColor: '#1DBF73' }} className="text-white px-6 py-3 rounded-lg font-semibold">
                Create Gig
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {gigs.map((gig) => (
                <div key={gig._id} className="border border-gray-200 rounded-xl p-4">
                  <h3 className="font-semibold text-gray-800">{gig.title}</h3>
                  <p className="text-green-600 font-bold mt-1">₹{gig.price}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SellerDashboard;