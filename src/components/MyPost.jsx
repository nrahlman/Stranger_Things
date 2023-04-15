import React, { useState, useEffect } from 'react';
import { fetchPosts } from '../api/post';
import UpdatePost from './UpdatePost';
import DeletePost from './deletePost';
import "../components-css/Mypost.css";


const MyPosts = ({ token, user }) => {
  const [posts, setPosts] = useState([]);
  const [showUpdate, setShowUpdate] = useState({});

  useEffect(() => {
    if (user) {
      const fetchData = async () => {
        const result = await fetchPosts();
        if (result.success) {
          const userPosts = result.data.posts.filter(
            (post) => post.author._id === user._id
          );
          setPosts(userPosts);
        }
      };

      fetchData();
    }
  }, [user]);

  const handlePostUpdated = async (index) => {
    const result = await fetchPosts();
    if (result.success) {
      const userPosts = result.data.posts.filter(
        (post) => post.author._id === user._id
      );
      setPosts(userPosts);
    }
    setShowUpdate((prevState) => ({
      ...prevState,
      [index]: false,
    }));
  };

  return token ? (
    <div className="my-posts">
      {posts.map((post, index) => (
        <div key={post._id} className="post">
          <h3>{post.title}</h3>
          <p>Posted by: {post.author.username}</p>
          <p>Location: {post.location}</p>
          <p>Price: {post.price}</p>
          <p>Description: {post.description}</p>
          <p>Will Deliver: {post.willDeliver ? "Yes" : "No"}</p>
          <p>Active: {post.active ? "Yes" : "No"}</p>

          {showUpdate[index] ? (
            <UpdatePost
              postId={post._id}
              currentPost={post}
              token={token}
              index={index}
              onPostUpdated={handlePostUpdated}
            />
          ) : (
            <button
              onClick={() =>
                setShowUpdate((prevState) => ({
                  ...prevState,
                  [index]: !prevState[index],
                }))
              }
            >
              Update Post
            </button>
          )}
          <DeletePost postId={post._id} token={token} />
          <div className="messages">
            <h4>Messages:</h4>
            {post.messages && post.messages.length > 0 ? (
              post.messages.map((message) => (
                <div key={message._id} className="message">
                  <p>From: {message.fromUser.username}</p>
                  <p>Content: {message.content}</p>
                </div>
              ))
            ) : (
              <p>No messages yet.</p>
            )}
          </div>
        </div>
      ))}
    </div>
  ) : (
    <div>
      <h2>Please Log In First</h2>
    </div>
  );
};

export default MyPosts;
