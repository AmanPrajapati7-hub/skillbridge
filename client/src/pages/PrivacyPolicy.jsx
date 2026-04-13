const PrivacyPolicy = () => {
  return (
    <div className="min-h-screen bg-gray-50 py-16 px-8">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-4xl font-bold text-gray-800 mb-4">Privacy Policy</h1>
        <p className="text-gray-500 mb-10">Last updated: April 2024</p>

        <div className="bg-white rounded-2xl shadow-sm p-8 space-y-6">
          {[
            {
              title: '1. Information We Collect',
              content: 'We collect information you provide directly to us, such as your name, email address, and profile information when you create an account on SkillBridge.'
            },
            {
              title: '2. How We Use Your Information',
              content: 'We use the information we collect to provide, maintain, and improve our services, process transactions, and communicate with you about your account and orders.'
            },
            {
              title: '3. Information Sharing',
              content: 'We do not sell or share your personal information with third parties except as necessary to provide our services or as required by law.'
            },
            {
              title: '4. Data Security',
              content: 'We take reasonable measures to help protect your personal information from loss, theft, misuse, and unauthorized access using industry-standard encryption.'
            },
            {
              title: '5. Cookies',
              content: 'We use cookies and similar tracking technologies to track activity on our platform and hold certain information to improve your experience.'
            },
            {
              title: '6. Contact Us',
              content: 'If you have any questions about this Privacy Policy, please contact us at amanprajapati@gmail.com or call +91 9151841542.'
            },
          ].map((item, i) => (
            <div key={i}>
              <h3 className="font-semibold text-gray-800 mb-2">{item.title}</h3>
              <p className="text-gray-500 text-sm leading-relaxed">{item.content}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicy;