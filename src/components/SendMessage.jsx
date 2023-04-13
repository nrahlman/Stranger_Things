import React, { useState } from 'react';

const SendMessage = ({ postId, token }) => {
  const [messageContent, setMessageContent] = useState('');

  const BASE_URL = `https://strangers-things.herokuapp.com/api/2303-FTB-MT-WEB-FT`;

  const postMessage = async () => {
    try {
      const response = await fetch(`${BASE_URL}/posts/${postId}/messages`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({
          message: {
            content: messageContent,
          },
        }),
      });
      const result = await response.json();
      console.log(result);
      alert('Message sent successfully');
      setMessageContent('');
    } catch (err) {
      console.error(err);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    postMessage();
  };

  return (
    <div className="send-message">
      <h4>Send a message:</h4>
      <form onSubmit={handleSubmit}>
        <textarea
          value={messageContent}
          onChange={(e) => setMessageContent(e.target.value)}
          required
        ></textarea>
        <button type="submit">Send</button>
      </form>
    </div>
  );
};

export default SendMessage;