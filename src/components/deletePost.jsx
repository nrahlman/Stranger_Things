import React from 'react';
import { deletePost } from '../api/post';

function DeletePost({ postId, token }) {
  const handleDelete = async () => {
    const result = await deletePost(postId, token);
    if (result.success) {
      alert('Post deleted successfully.');
      window.location.reload();
    } else {
      alert('Failed to delete the post.');
    }
  };

  return (
    <button onClick={handleDelete}>Delete Post</button>
  );
}

export default DeletePost;