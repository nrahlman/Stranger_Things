import React, { useState, useEffect } from 'react';
import PostHost from './PostHost';
import EditPost from './EditPost';
import DeletePost from './deletePost';

const BASE_URL = "https://strangers-things.herokuapp.com/api/2209-FTB-ET-WEB-FT/posts";

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

  return (
    <div className="post-list">
      <PostHost token={token} />
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
              <div className="messages">
                <h4>Messages:</h4>
                {post.messages.length > 0 ? (
                  post.messages.map(message => (
                    <div key={message._id} className="message">
                      <p>From: {message.fromUser.username}</p>
                      <p>Content: {message.content}</p>
                    </div>
                  ))
                ) : (
                  <p>No messages yet.</p>
                )}
              </div>
            </>
          )}
        </div>
      ))}
      {selectedPost && (
        <div className="edit-post-modal">
          <button onClick={closeEditForm}>Close</button>
          <EditPost postId={selectedPost._id} token={token} currentPost={selectedPost} />
        </div>
      )}
    </div>
  );
};

export default PostList;
