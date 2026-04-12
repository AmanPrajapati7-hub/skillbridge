import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import toast from 'react-hot-toast';

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    toast.success('Logout successful!');
    navigate('/');
  };

  return (
    <nav style={{ backgroundColor: '#1DBF73' }} className="w-full px-8 py-4 flex items-center justify-between shadow-md">
      <Link to="/" className="text-white text-2xl font-bold tracking-tight">
        Skill<span className="text-white opacity-80">Bridge</span>
      </Link>

      <div className="flex items-center gap-6">
        <Link to="/browse" className="text-white font-medium hover:opacity-80">Browse Gigs</Link>

        {!user ? (
          <>
            <Link to="/login" className="text-white font-medium hover:opacity-80">Login</Link>
            <Link to="/register" className="bg-white text-green-600 font-semibold px-4 py-2 rounded-lg hover:bg-gray-100">
              Join Now
            </Link>
          </>
        ) : (
          <>
            <Link
              to={user.role === 'seller' ? '/seller/dashboard' : '/buyer/dashboard'}
              className="text-white font-medium hover:opacity-80"
            >
              Dashboard
            </Link>
            <Link to="/orders" className="text-white font-medium hover:opacity-80">Orders</Link>
            <button
              onClick={handleLogout}
              className="bg-white text-green-600 font-semibold px-4 py-2 rounded-lg hover:bg-gray-100"
            >
              Logout
            </button>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;