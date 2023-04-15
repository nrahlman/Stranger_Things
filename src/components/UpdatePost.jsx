import React, { useState } from 'react';
import { updatePost } from '../api/post';

const UpdatePost = ({ postId, token, currentPost, index, onPostUpdated }) => {
  const [title, setTitle] = useState(currentPost.title);
  const [description, setDescription] = useState(currentPost.description);
  const [price, setPrice] = useState(currentPost.price);
  const [location, setLocation] = useState(currentPost.location);
  const [willDeliver, setWillDeliver] = useState(currentPost.willDeliver);

  const handleSubmit = async (e) => {
    e.preventDefault();
    await updatePost(postId, token, title, description, price, location, willDeliver);
    onPostUpdated(index);
  };

  return (
    <div className="update-post">
      <h2>Update Post</h2>
      <form onSubmit={handleSubmit}>
        <label>Title:</label>
        <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} required />

        <label>Description:</label>
        <textarea value={description} onChange={(e) => setDescription(e.target.value)} required></textarea>

        <label>Price:</label>
        <input type="text" value={price} onChange={(e) => setPrice(e.target.value)} required />

        <label>Will Deliver:</label>
        <input type="checkbox" checked={willDeliver} onChange={(e) => setWillDeliver(e.target.checked)} />

        <label>Location (optional):</label>
        <input type="text" value={location} onChange={(e) => setLocation(e.target.value)} />

        <button type="submit">Update Post</button>
      </form>
    </div>
  );
};

export default UpdatePost;