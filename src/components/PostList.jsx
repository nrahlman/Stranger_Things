import React, { useState, useEffect } from 'react';
import MakePost from './MakePost';
import DeletePost from './deletePost';
import UpdatePost from './UpdatePost';
import SendMessage from './SendMessage';

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

  useEffect(() => {
    const fetchData = async () => {
      const result = await fetchPosts();
      if (result.success) {
        setPosts(result.data.posts);
      }
    };

    fetchData();
  }, []);

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
              <UpdatePost currentPost={post} token={token} />
              <DeletePost postId={post._id} token={token} />
            </>
          )}
          {user._id !== post.author._id && (
            <SendMessage postId={post._id} token={token} />
          )}
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
  );
};

export default PostList;