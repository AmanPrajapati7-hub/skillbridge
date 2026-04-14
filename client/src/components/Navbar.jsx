import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useState, useRef, useEffect } from 'react';
import toast from 'react-hot-toast';

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleLogout = async () => {
    await logout();
    toast.success('Logout successful!');
    navigate('/');
    setDropdownOpen(false);
  };

  return (
    <nav style={{ backgroundColor: '#1DBF73' }} className="w-full px-8 py-4 flex items-center justify-between shadow-md">
      <Link to="/" className="text-white text-2xl font-bold tracking-tight">
        SkillBridge
      </Link>

      <div className="flex items-center gap-6">
        <Link to="/browse" className="text-white font-medium hover:opacity-80">
          Browse Gigs
        </Link>

        {!user ? (
          <>
            <Link to="/login" className="text-white font-medium hover:opacity-80">
              Login
            </Link>
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
            <Link to="/orders" className="text-white font-medium hover:opacity-80">
              Orders
            </Link>
            <Link to="/messages" className="text-white font-medium hover:opacity-80"> 
            Messages
            </Link>

            <div className="relative" ref={dropdownRef}>
              <button onClick={() => setDropdownOpen(!dropdownOpen)}
              className="w-10 h-10 rounded-full bg-white flex items-center justify-center text-green-600 font-bold text-lg hover:bg-gray-100 transition overflow-hidden"
              >
                {user.profilePic ? (
                    <img
                    src={user.profilePic}
                    alt={user.name}
                    className="w-10 h-10 rounded-full object-cover"
                    />
                ) : (
                    user.name?.[0]?.toUpperCase()
                    )}
             </button>

              {dropdownOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-xl shadow-lg py-2 z-50">
                  <div className="px-4 py-2 border-b border-gray-100">
                    <p className="font-semibold text-gray-800 text-sm">{user.name}</p>
                    <p className="text-gray-400 text-xs">{user.email}</p>
                  </div>
                  <Link
                    to="/profile"
                    onClick={() => setDropdownOpen(false)}
                    className="block px-4 py-2 text-gray-700 hover:bg-gray-50 text-sm"
                  >
                    My Profile
                  </Link>
                  <Link
                    to={user.role === 'seller' ? '/seller/dashboard' : '/buyer/dashboard'}
                    onClick={() => setDropdownOpen(false)}
                    className="block px-4 py-2 text-gray-700 hover:bg-gray-50 text-sm"
                  >
                    Dashboard
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="w-full text-left px-4 py-2 text-red-500 hover:bg-red-50 text-sm font-medium"
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;