import React, { useState } from 'react';
import '../App.css';
import { postMessage } from '../api/post';

const Message = ({ postId, token, user, messages, setMessages }) => {
  const [content, setContent] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();
    const result = await postMessage(postId, content, token);
    if (result.success) {
      alert('Message sent successfully');
      setMessages([...messages, result.data.message]);
      setContent('');
    } else {
      alert('Error sending message');
    }
  };

  return (
    <div className="message-form">
      <h3>Send a message:</h3>
      <form onSubmit={handleSubmit}>
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="Type your message here"
          rows={4}
          cols={50}
        />
        <button type="submit">Send</button>
      </form>
    </div>
  );
};

export default Message;