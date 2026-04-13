import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-gray-400 py-10 mt-20">
      <div className="max-w-6xl mx-auto px-8 flex flex-col md:flex-row justify-between gap-6">
        <div>
          <h2 className="text-white text-xl font-bold mb-2">SkillBridge</h2>
          <p className="text-sm">Connecting talent with opportunity.</p>
        </div>
        <div className="flex gap-12">
          <div>
            <h3 className="text-white font-semibold mb-2">Platform</h3>
            <ul className="text-sm space-y-2">
              <li><Link to="/browse" className="hover:text-white transition">Browse Gigs</Link></li>
              <li><Link to="/register" className="hover:text-white transition">Become a Seller</Link></li>
              <li><Link to="/" className="hover:text-white transition">How it Works</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="text-white font-semibold mb-2">Support</h3>
            <ul className="text-sm space-y-2">
              <li><Link to="/help" className="hover:text-white transition">Help Center</Link></li>
              <li><Link to="/contact" className="hover:text-white transition">Contact Us</Link></li>
              <li><Link to="/privacy" className="hover:text-white transition">Privacy Policy</Link></li>
            </ul>
          </div>
        </div>
      </div>
      <p className="text-center text-sm mt-8 text-gray-600">
        © 2024 SkillBridge. All rights reserved.
      </p>
    </footer>
  );
};

export default Footer;