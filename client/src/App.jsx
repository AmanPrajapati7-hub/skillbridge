import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { useAuth } from './context/AuthContext';

import Navbar from './components/Navbar';
import Footer from './components/Footer';

import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Browse from './pages/Browse';
import GigDetail from './pages/GigDetail';
import SellerDashboard from './pages/SellerDashboard';
import BuyerDashboard from './pages/BuyerDashboard';
import CreateGig from './pages/CreateGig';
import Orders from './pages/Orders';
import Chat from './pages/Chat';
import Profile from './pages/Profile';

const ProtectedRoute = ({ children }) => {
  const { user, loading } = useAuth();
  if (loading) return <div>Loading...</div>;
  return user ? children : <Navigate to="/login" />;
};

function App() {
  return (
    <BrowserRouter>
      <Toaster position="top-center" />
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/browse" element={<Browse />} />
        <Route path="/gig/:id" element={<GigDetail />} />
        <Route path="/orders" element={<ProtectedRoute><Orders /></ProtectedRoute>} />
        <Route path="/chat/:userId" element={<ProtectedRoute><Chat /></ProtectedRoute>} />
        <Route path="/seller/dashboard" element={<ProtectedRoute><SellerDashboard /></ProtectedRoute>} />
        <Route path="/seller/create-gig" element={<ProtectedRoute><CreateGig /></ProtectedRoute>} />
        <Route path="/buyer/dashboard" element={<ProtectedRoute><BuyerDashboard /></ProtectedRoute>} />
        <Route path="/profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
        <Route path="/profile/:id" element={<Profile />} />
        
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default App;