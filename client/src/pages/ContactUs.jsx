const ContactUs = () => {
  return (
    <div className="min-h-screen bg-gray-50 py-16 px-8">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-4xl font-bold text-gray-800 mb-4">Contact Us</h1>
        <p className="text-gray-500 mb-10">We are here to help you. Reach out to us anytime.</p>

        <div className="bg-white rounded-2xl shadow-sm p-8">
          <div className="space-y-6">
            <div className="flex items-center gap-4">
              <div style={{ backgroundColor: '#1DBF73' }} className="w-12 h-12 rounded-full flex items-center justify-center text-white font-bold text-xl">
                @
              </div>
              <div>
                <p className="text-sm text-gray-400">Email</p>
                <a href="mailto:amanprajapati@gmail.com" className="text-gray-800 font-semibold hover:text-green-600">
                  amanprajapati@gmail.com
                </a>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <div style={{ backgroundColor: '#1DBF73' }} className="w-12 h-12 rounded-full flex items-center justify-center text-white font-bold text-xl">
                #
              </div>
              <div>
                <p className="text-sm text-gray-400">Phone</p>
                <a href="tel:+919151841542" className="text-gray-800 font-semibold hover:text-green-600">
                  +91 9151841542
                </a>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <div style={{ backgroundColor: '#1DBF73' }} className="w-12 h-12 rounded-full flex items-center justify-center text-white font-bold text-xl">
                ⌖
              </div>
              <div>
                <p className="text-sm text-gray-400">Location</p>
                <p className="text-gray-800 font-semibold">India</p>
              </div>
            </div>
          </div>

          <div className="mt-8 pt-8 border-t border-gray-100">
            <h3 className="font-semibold text-gray-700 mb-4">Send us a message</h3>
            <div className="space-y-4">
              <input
                type="text"
                placeholder="Your Name"
                className="w-full border border-gray-300 rounded-lg px-4 py-3 outline-none focus:border-green-500"
              />
              <input
                type="email"
                placeholder="Your Email"
                className="w-full border border-gray-300 rounded-lg px-4 py-3 outline-none focus:border-green-500"
              />
              <textarea
                placeholder="Your Message"
                rows={4}
                className="w-full border border-gray-300 rounded-lg px-4 py-3 outline-none focus:border-green-500"
              />
              <button
                style={{ backgroundColor: '#1DBF73' }}
                className="w-full text-white font-semibold py-3 rounded-lg hover:opacity-90"
              >
                Send Message
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactUs;