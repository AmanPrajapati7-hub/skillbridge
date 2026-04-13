const HelpCenter = () => {
  return (
    <div className="min-h-screen bg-gray-50 py-16 px-8">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-4xl font-bold text-gray-800 mb-4">Help Center</h1>
        <p className="text-gray-500 mb-10">Find answers to common questions about SkillBridge.</p>

        <div className="space-y-4">
          {[
            { q: 'How do I create an account?', a: 'Click on "Join Now" button on the top right and fill in your details. Choose your role as Buyer or Seller.' },
            { q: 'How do I post a gig?', a: 'Login as a Seller, go to your Seller Dashboard and click on "Create New Gig" button.' },
            { q: 'How do I place an order?', a: 'Browse gigs, click on any gig you like, and click the "Continue" button to place your order.' },
            { q: 'How do I contact a seller?', a: 'Open any gig and click on "Contact Seller" button to start a chat.' },
            { q: 'How do I leave a review?', a: 'After your order is completed, go to the gig page and scroll down to leave a review.' },
            { q: 'How do I edit my profile?', a: 'Click on your profile icon in the navbar, go to "My Profile" and click "Edit Profile".' },
          ].map((item, i) => (
            <div key={i} className="bg-white rounded-xl shadow-sm p-6">
              <h3 className="font-semibold text-gray-800 mb-2">{item.q}</h3>
              <p className="text-gray-500 text-sm">{item.a}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default HelpCenter;