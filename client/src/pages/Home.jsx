import { Link } from 'react-router-dom';

const categories = [
  { name: 'Web Development', icon: '💻' },
  { name: 'Graphic Design', icon: '🎨' },
  { name: 'Content Writing', icon: '✍️' },
  { name: 'Video Editing', icon: '🎬' },
  { name: 'Digital Marketing', icon: '📱' },
  { name: 'Data Science', icon: '📊' },
];

const Home = () => {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <div style={{ backgroundColor: '#1DBF73' }} className="py-24 px-8 text-center text-white">
        <h1 className="text-5xl font-bold mb-4">Find the perfect freelance service</h1>
        <p className="text-xl mb-8 opacity-90">Hire expert freelancers for any job, online.</p>
        <div className="flex justify-center">
          <div className="flex bg-white rounded-xl overflow-hidden shadow-lg w-full max-w-xl">
            <input
              type="text"
              placeholder='Try "web development"'
              className="flex-1 px-5 py-4 text-gray-700 outline-none text-base"
            />
            <button style={{ backgroundColor: '#1DBF73' }} className="px-8 py-4 text-white font-semibold text-base">
              Search
            </button>
          </div>
        </div>
      </div>

      {/* Categories */}
      <div className="max-w-6xl mx-auto px-8 py-16">
        <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">Explore Categories</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {categories.map((cat) => (
            <Link
              to={`/browse?category=${cat.name}`}
              key={cat.name}
              className="flex flex-col items-center justify-center p-6 border border-gray-200 rounded-xl hover:shadow-md hover:border-green-400 transition cursor-pointer"
            >
              <span className="text-4xl mb-2">{cat.icon}</span>
              <span className="text-sm font-medium text-gray-700 text-center">{cat.name}</span>
            </Link>
          ))}
        </div>
      </div>

      {/* How it Works */}
      <div className="bg-gray-50 py-16 px-8">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-gray-800 mb-12 text-center">How SkillBridge Works</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { step: '1', title: 'Find a Service', desc: 'Browse thousands of services from expert freelancers.' },
              { step: '2', title: 'Place an Order', desc: 'Hire the best freelancer for your project needs.' },
              { step: '3', title: 'Get it Done', desc: 'Receive your work and pay securely on completion.' },
            ].map((item) => (
              <div key={item.step} className="text-center p-8 bg-white rounded-xl shadow-sm">
                <div style={{ backgroundColor: '#1DBF73' }} className="w-12 h-12 rounded-full flex items-center justify-center text-white font-bold text-xl mx-auto mb-4">
                  {item.step}
                </div>
                <h3 className="text-xl font-semibold mb-2 text-gray-800">{item.title}</h3>
                <p className="text-gray-500">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* CTA */}
      <div className="py-16 px-8 text-center">
        <h2 className="text-3xl font-bold text-gray-800 mb-4">Ready to get started?</h2>
        <p className="text-gray-500 mb-8">Join thousands of freelancers and clients today.</p>
        <div className="flex justify-center gap-4">
          <Link to="/register" style={{ backgroundColor: '#1DBF73' }} className="text-white px-8 py-3 rounded-lg font-semibold hover:opacity-90">
            Join as Buyer
          </Link>
          <Link to="/register" className="border-2 border-green-500 text-green-600 px-8 py-3 rounded-lg font-semibold hover:bg-green-50">
            Become a Seller
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Home;