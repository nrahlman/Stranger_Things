import React, { useState } from 'react';

const BASE_URL = "https://strangers-things.herokuapp.com/api/2209-FTB-ET-WEB-FT/posts";

const makePost = async (post, token) => {
  try {
    const response = await fetch(`${BASE_URL}/posts`, {
      method: "POST",
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify({ post })
    });

    const result = await response.json();
    return result;
  } catch (err) {
    console.error(err);
  }
};

const PostHost = ({ token }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [willDeliver, setWillDeliver] = useState(false);
  const [location, setLocation] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    const post = {
      title,
      description,
      price,
      willDeliver,
      location
    };

    const result = await makePost(post, token);

    if (result.success) {
      alert('Post created successfully');
    } else {
      alert('Failed to create post');
    }
  };

  return (
    <div className="post-host">
      <h2>Create a new post</h2>
      <form onSubmit={handleSubmit}>
        <label>Title:</label>
        <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} required />

        <label>Description:</label>
        <textarea value={description} onChange={(e) => setDescription(e.target.value)} required></textarea>

        <label>Price:</label>
        <input type="text" value={price} onChange={(e) => setPrice(e.target.value)} required />

        <label>Will Deliver:</label>
        <input type="checkbox" checked={willDeliver} onChange={() => setWillDeliver(!willDeliver)} />

        <label>Location (optional):</label>
        <input type="text" value={location} onChange={(e) => setLocation(e.target.value)} />

        <button type="submit">Create Post</button>
      </form>
    </div>
  );
};

export default PostHost;