import { useState, useEffect, useRef } from 'react';
import { useParams } from 'react-router-dom';
import API from '../api/axios';
import { useAuth } from '../context/AuthContext';

const Chat = () => {
  const { userId } = useParams();
  const { user } = useAuth();
  const [messages, setMessages] = useState([]);
  const [text, setText] = useState('');
  const bottomRef = useRef(null);

  useEffect(() => {
    fetchMessages();
    const interval = setInterval(fetchMessages, 3000);
    return () => clearInterval(interval);
  }, [userId]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const fetchMessages = async () => {
    try {
      const { data } = await API.get(`/chat/${userId}`);
      setMessages(data);
    } catch (err) {
      console.log(err);
    }
  };

  const sendMessage = async () => {
    if (!text.trim()) return;
    try {
      await API.post(`/chat/${userId}`, { text });
      setText('');
      fetchMessages();
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col" style={{ height: '100vh' }}>
      <div className="bg-white shadow-sm px-8 py-4">
        <h1 className="text-xl font-bold text-gray-800">Chat</h1>
      </div>

      <div className="flex-1 overflow-y-auto px-8 py-6 space-y-4">
        {messages.length === 0 && (
          <p className="text-center text-gray-400 mt-20">No messages yet. Say hello!</p>
        )}
        {messages.map((msg) => (
          <div
            key={msg._id}
            className={`flex ${msg.sender === user._id ? 'justify-end' : 'justify-start'}`}
          >
            <div
              className={`max-w-xs px-4 py-3 rounded-2xl text-sm ${
                msg.sender === user._id
                  ? 'text-white rounded-br-none'
                  : 'bg-white text-gray-800 shadow-sm rounded-bl-none'
              }`}
              style={msg.sender === user._id ? { backgroundColor: '#1DBF73' } : {}}
            >
              {msg.text}
            </div>
          </div>
        ))}
        <div ref={bottomRef} />
      </div>

      <div className="bg-white px-8 py-4 flex gap-3 shadow-lg">
        <input
          type="text"
          placeholder="Type a message..."
          value={text}
          onChange={(e) => setText(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
          className="flex-1 border border-gray-300 rounded-xl px-4 py-3 outline-none focus:border-green-500"
        />
        <button
          onClick={sendMessage}
          style={{ backgroundColor: '#1DBF73' }}
          className="text-white px-6 py-3 rounded-xl font-semibold hover:opacity-90"
        >
          Send
        </button>
      </div>
    </div>
  );
};

export default Chat;