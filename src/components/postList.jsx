import React, { useState, useEffect } from 'react';
import MakePost from './MakePost';
import DeletePost from './deletePost';
import UpdatePost from './UpdatePost';

const BASE_URL = "https://strangers-things.herokuapp.com/api/2303-FTB-MT-WEB-FT/posts";

const fetchPosts = async () => {
  try {
    const response = await fetch(`${BASE_URL}`);

    const result = await response.json();
    return result;
  } catch (err) {
    console.error(err);
  }
};

const PostList = ({ token, user }) => {
  const [posts, setPosts] = useState([]);
  const [selectedPost, setSelectedPost] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const result = await fetchPosts();
      if (result.success) {
        setPosts(result.data.posts);
      }
    };

    fetchData();
  }, []);

  const handleEdit = (post) => {
    setSelectedPost(post);
  };

  const closeEditForm = () => {
    setSelectedPost(null);
  };

  const onPostUpdated = () => {
    closeEditForm();
    // Fetch posts again to refresh the list
    const fetchData = async () => {
      const result = await fetchPosts();
      if (result.success) {
        setPosts(result.data.posts);
      }
    };
    fetchData();
  };
  return (
    <div className="post-list">
      <MakePost token={token} />
      {posts.map(post => (
        <div key={post._id} className="post">
          <h3>{post.title}</h3>
          <p>Posted by: {post.author.username}</p>
          <p>Location: {post.location}</p>
          <p>Price: {post.price}</p>
          <p>Description: {post.description}</p>
          <p>Will Deliver: {post.willDeliver ? 'Yes' : 'No'}</p>
          <p>Active: {post.active ? 'Yes' : 'No'}</p>
          {user._id === post.author._id && (
            <>
              <button onClick={() => handleEdit(post)}>Edit Post</button>
              <DeletePost postId={post._id} token={token} />
            </>
          )}
        </div>
      ))}
      {selectedPost && (
        <div className="update-post-modal">
          <button onClick={closeEditForm}>Close</button>
          <UpdatePost
            postId={selectedPost._id}
            token={token}
            currentPost={selectedPost}
            onPostUpdated={onPostUpdated}
          />
        </div>
      )}
    </div>
  );
};

export default PostList;