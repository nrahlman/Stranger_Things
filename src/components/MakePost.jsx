import React, { useState } from "react";
import { makePost } from "../api/post";

function MakePost() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [location, setLocation] = useState("");
  const [willDeliver, setWillDeliver] = useState(false);

  const handleCheckboxChange = (e) => {
    setWillDeliver(e.target.checked);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");
    await makePost(token, title, description, price, location, willDeliver);
  };

  return (
    <div className="post-host">
      <h2>Create a new post</h2>
      <form onSubmit={handleSubmit}>
        <label>Title:</label>
        <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} required />

        <label>Description:</label>
        <textarea value={description} onChange={(e) => setDescription(e.target.value)} required></textarea>

        <label>Price:</label>
        <input type="text" value={price} onChange={(e) => setPrice(e.target.value)} required />

        <label>Will Deliver:</label>
        <input type="checkbox" checked={willDeliver} onChange={handleCheckboxChange} />

        <label>Location (optional):</label>
        <input type="text" value={location} onChange={(e) => setLocation(e.target.value)} />

        <button type="submit">Create Post</button>
      </form>
    </div>
  );
};

export default MakePost;
