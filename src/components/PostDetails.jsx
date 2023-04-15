import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import '../App.css';
import { fetchPosts } from '../api/post';
import Message from './Message';

const PostDetail = ({ token, user }) => {
  const { postId } = useParams();
  const [post, setPost] = useState(null);
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const result = await fetchPosts();
      if (result.success) {
        const foundPost = result.data.posts.find((p) => p._id === postId);
        setPost(foundPost);
        setMessages(foundPost.messages);
      }
    };

    fetchData();
  }, [postId]);

  if (!post) {
    return <div>Loading...</div>;
  }

  return (
    <div className="post-detail">
      <h2>{post.title}</h2>
      <p>Posted by: {post.author.username}</p>
      <p>Price: {post.price}</p>
      <p>Description: {post.description}</p>
      <p>Location: {post.location}</p>
      <p>Will deliver: {post.willDeliver ? 'Yes' : 'No'}</p>
      <p>Created at: {post.createdAt}</p>
      <p>Updated at: {post.updatedAt}</p>

      <div className="messages">
        <h3>Messages:</h3>
        {messages.map((message) => (
          <div key={message._id} className="message">
            <p>{message.content}</p>
            <p>From: {message.fromUser.username}</p>
          </div>
        ))}
      </div>

      {token && user && (
        <Message
          postId={post._id}
          token={token}
          user={user}
          messages={messages}
          setMessages={setMessages}
        />
      )}
    </div>
  );
};

export default PostDetail;