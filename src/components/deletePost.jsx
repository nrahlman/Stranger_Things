import React, { useState } from 'react';

const BASE_URL = "https://strangers-things.herokuapp.com/api/2209-FTB-ET-WEB-FT/posts";

const DeletePost = ({ token }) => {
  const [postId, setPostId] = useState('');

  const deletePost = async (postId, token) => {
    try {
      const response = await fetch(`${BASE_URL}/posts/${postId}`, {
        method: "DELETE",
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        }
      });
      const result = await response.json();
      console.log(result);
      return result;
    } catch (err) {
      console.error(err);
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    deletePost(postId, token);
  }

  return (
    <div className="delete-post">
      <h2>Delete a post</h2>
      <form onSubmit={handleSubmit}>
        <label>Post ID:</label>
        <input type="text" value={postId} onChange={(e) => setPostId(e.target.value)} required />

        <button type="submit">Delete Post</button>
      </form>
    </div>
  );
};

export default DeletePost;