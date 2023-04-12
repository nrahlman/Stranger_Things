import React, { useState } from 'react';

const BASE_URL = "https://strangers-things.herokuapp.com/api/2209-FTB-ET-WEB-FT/posts";

const updatePost = async (postId, post, token) => {
  try {
    const response = await fetch(`${BASE_URL}/posts/${postId}`, {
      method: "PATCH",
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

const EditPost = ({ postId, token, currentPost }) => {
  const [title, setTitle] = useState(currentPost.title);
  const [description, setDescription] = useState(currentPost.description);
  const [price, setPrice] = useState(currentPost.price);
  const [willDeliver, setWillDeliver] = useState(currentPost.willDeliver);
  const [location, setLocation] = useState(currentPost.location);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const post = {
      title,
      description,
      price,
      willDeliver,
      location
    };

    const result = await updatePost(postId, post, token);

    if (result.success) {
      alert('Post updated successfully');
    } else {
      alert('Failed to update post');
    }
  };

  return (
    <div className="edit-post">
      <h2>Edit Post</h2>
      <form onSubmit={handleSubmit}>
        <label>Title:</label>
        <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} />

        <label>Description:</label>
        <textarea value={description} onChange={(e) => setDescription(e.target.value)}></textarea>

        <label>Price:</label>
        <input type="text" value={price} onChange={(e) => setPrice(e.target.value)} />

        <label>Will Deliver:</label>
        <input type="checkbox" checked={willDeliver} onChange={() => setWillDeliver(!willDeliver)} />

        <label>Location (optional):</label>
        <input type="text" value={location} onChange={(e) => setLocation(e.target.value)} />

        <button type="submit">Update Post</button>
      </form>
    </div>
  );
};

export default EditPost;