import React, { useState, useEffect } from 'react';
import { fetchPosts } from '../api/post';
import { Link, useNavigate } from 'react-router-dom';
import "../components-css/Postlist.css";

const Posts = ({ token, user }) => {
  const [posts, setPosts] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [searchType, setSearchType] = useState('title');
  const [willDeliver, setWillDeliver] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      const result = await fetchPosts();
      if (result.success) {
        setPosts(result.data.posts);
      }
    };

    fetchData();
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
  };

  const filteredPosts = posts.filter((post) => {
    if (searchType === 'title') {
      return post.title.toLowerCase().includes(searchTerm.toLowerCase());
    } else if (searchType === 'location') {
      return post.location.toLowerCase().includes(searchTerm.toLowerCase());
    } else if (searchType === 'delivery') {
      return post.willDeliver === willDeliver;
    }
    return true;
  });

  const handleMoreInfo = (postId) => {
    navigate(`/posts/${postId}`);
  };

  return (
    <div className="posts">
      <div className="search-container">
        <form onSubmit={handleSearch}>
          <select
            value={searchType}
            onChange={(e) => setSearchType(e.target.value)}
          >
            <option value="title">Title</option>
            <option value="location">Location</option>
            <option value="delivery">Delivery</option>
          </select>

          {searchType !== "delivery" ? (
            <input
              type="text"
              placeholder="Search..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          ) : (
            <>
              <label>
                <input
                  type="radio"
                  value="yes"
                  checked={willDeliver}
                  onChange={() => setWillDeliver(true)}
                />
                Yes
              </label>
              <label>
                <input
                  type="radio"
                  value="no"
                  checked={!willDeliver}
                  onChange={() => setWillDeliver(false)}
                />
                No
              </label>
            </>
          )}

          <button type="submit">Search</button>
        </form>
      </div>

      <div className="post-list">
        {filteredPosts.map((post) => (
          <div key={post._id} className="post">
            <h3>{post.title}</h3>
            <p>Price: {post.price}</p>
            <p>Location: {post.location}</p>
            <p>Will Deliver: {post.willDeliver ? "Yes" : "No"        
            }</p>
        <button onClick={() => handleMoreInfo(post._id)}>
          More Information
        </button>
      </div>
    ))}
  </div>
</div>
);
};

export default Posts;