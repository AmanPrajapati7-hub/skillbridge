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
            <ul className="text-sm space-y-1">
              <li>Browse Gigs</li>
              <li>Become a Seller</li>
              <li>How it Works</li>
            </ul>
          </div>
          <div>
            <h3 className="text-white font-semibold mb-2">Support</h3>
            <ul className="text-sm space-y-1">
              <li>Help Center</li>
              <li>Contact Us</li>
              <li>Privacy Policy</li>
            </ul>
          </div>
        </div>
      </div>
      <p className="text-center text-sm mt-8 text-gray-600">© 2024 SkillBridge. All rights reserved.</p>
    </footer>
  );
};

export default Footer;