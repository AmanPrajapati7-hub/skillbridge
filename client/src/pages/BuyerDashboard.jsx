import { useAuth } from '../context/AuthContext';
import { Link } from 'react-router-dom';

const BuyerDashboard = () => {
  const { user } = useAuth();

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-8">
      <div className="max-w-5xl mx-auto">
        <div className="bg-white rounded-2xl shadow-sm p-8 mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-1">
            Welcome, {user?.name}!
          </h1>
          <p className="text-gray-500">Find and hire the best freelancers.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {[
            { label: 'Active Orders', value: '0', color: 'bg-blue-50 text-blue-600' },
            { label: 'Completed Orders', value: '0', color: 'bg-green-50 text-green-600' },
            { label: 'Total Spent', value: '₹0', color: 'bg-purple-50 text-purple-600' },
          ].map((stat) => (
            <div key={stat.label} className="bg-white rounded-xl shadow-sm p-6">
              <p className="text-gray-500 text-sm mb-1">{stat.label}</p>
              <p className={`text-3xl font-bold ${stat.color} rounded-lg px-3 py-1 inline-block`}>{stat.value}</p>
            </div>
          ))}
        </div>

        <div className="bg-white rounded-2xl shadow-sm p-8">
          <h2 className="text-xl font-bold text-gray-800 mb-4">Quick Actions</h2>
          <div className="flex gap-4">
            <Link to="/browse" style={{ backgroundColor: '#1DBF73' }} className="text-white px-6 py-3 rounded-lg font-semibold hover:opacity-90">
              Browse Gigs
            </Link>
            <Link to="/orders" className="border-2 border-green-500 text-green-600 px-6 py-3 rounded-lg font-semibold hover:bg-green-50">
              My Orders
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BuyerDashboard;