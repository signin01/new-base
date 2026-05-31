import React, { useState, useEffect, useRef } from 'react';
import io from 'socket.io-client';
import axios from 'axios';
import useAuthStore from '../store/authStore';

const Chat = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const socketRef = useRef();
  const { user } = useAuthStore();

  useEffect(() => {
    if (!user) return;
    socketRef.current = io('http://localhost:5000');
    socketRef.current.emit('register', user.id);
    socketRef.current.on('receive_message', (msg) => setMessages(prev => [...prev, msg]));

    axios.get('http://localhost:5000/api/chat/messages/general', { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } })
      .then(res => setMessages(res.data))
      .catch(err => console.error(err));

    return () => socketRef.current.disconnect();
  }, [user]);

  const sendMessage = () => {
    if (!input.trim()) return;
    const msgData = { text: input, room: 'general', senderId: user.id, senderName: user.name };
    socketRef.current.emit('send_message', msgData);
    setMessages(prev => [...prev, { text: input, sender: { name: user.name }, createdAt: new Date() }]);
    setInput('');
  };

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6">Team Chat</h1>
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow h-96 overflow-y-auto p-4 mb-4">
        {messages.map((msg, idx) => (
          <div key={idx} className="mb-2"><strong>{msg.sender?.name || 'User'}:</strong> {msg.text}</div>
        ))}
      </div>
      <div className="flex gap-2">
        <input type="text" value={input} onChange={e => setInput(e.target.value)} onKeyPress={e => e.key === 'Enter' && sendMessage()} className="flex-1 p-2 border rounded dark:bg-gray-700" />
        <button onClick={sendMessage} className="bg-blue-600 text-white px-4 py-2 rounded">Send</button>
      </div>
    </div>
  );
};
export default Chat;
