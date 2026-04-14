import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import API from '../api/axios';
import { useAuth } from '../context/AuthContext';

const Messages = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [conversations, setConversations] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchConversations();
  }, []);

  const fetchConversations = async () => {
    try {
      const { data } = await API.get('/chat/conversations');
      setConversations(data);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return (
    <div className="flex justify-center items-center h-screen text-gray-400">Loading...</div>
  );

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-8">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-800 mb-8">Messages</h1>

        {conversations.length === 0 ? (
          <div className="bg-white rounded-xl p-12 text-center shadow-sm">
            <p className="text-gray-400 text-lg">No conversations yet.</p>
          </div>
        ) : (
          <div className="space-y-3">
            {conversations.map((conv) => {
              const otherUser = conv.sender._id === user._id ? conv.receiver : conv.sender;
              return (
                <div
                  key={conv._id}
                  onClick={() => navigate(`/chat/${otherUser._id}`)}
                  className="bg-white rounded-xl shadow-sm p-5 flex items-center gap-4 cursor-pointer hover:shadow-md transition"
                >
                  <div
                    className="w-12 h-12 rounded-full flex items-center justify-center text-white font-bold text-lg overflow-hidden"
                    style={{ backgroundColor: '#1DBF73' }}
                  >
                    {otherUser.profilePic ? (
                      <img src={otherUser.profilePic} alt={otherUser.name} className="w-12 h-12 object-cover" />
                    ) : (
                      otherUser.name?.[0]?.toUpperCase()
                    )}
                  </div>
                  <div className="flex-1">
                    <p className="font-semibold text-gray-800">{otherUser.name}</p>
                    <p className="text-gray-400 text-sm truncate">{conv.text}</p>
                  </div>
                  <p className="text-xs text-gray-400">
                    {new Date(conv.createdAt).toLocaleDateString()}
                  </p>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default Messages;