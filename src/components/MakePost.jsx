import React, { useState } from "react";
import { makePost } from "../api/post";
import '../components-css/Makepost.css';

function MakePost() {
  const initialState = { title: "", description: "", price: "", location: "", willDeliver: false };
  const [formData, setFormData] = useState(initialState);
  const token = localStorage.getItem("token");

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prevState => ({ ...prevState, [name]: type === "checkbox" ? checked : value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await makePost(token, formData.title, formData.description, formData.price, formData.location, formData.willDeliver);
  };

  return token ? (
    <div className="makepost">
      <h2>Create a new post</h2>
      <form onSubmit={handleSubmit}>
        <label>Title:</label>
        <input type="text" name="title" value={formData.title} onChange={handleInputChange} required />
        <label>Description:</label>
        <textarea name="description" value={formData.description} onChange={handleInputChange} required></textarea>
        <label>Price:</label>
        <input type="text" name="price" value={formData.price} onChange={handleInputChange} required />
        <label>Will Deliver:</label>
        <input type="checkbox" name="willDeliver" checked={formData.willDeliver} onChange={handleInputChange} />
        <label>Location (optional):</label>
        <input type="text" name="location" value={formData.location} onChange={handleInputChange} />
        <button type="submit">Create Post</button>
      </form>
    </div>
  ) : (
    <div>
      <h2>Please Log In First</h2>
    </div>
  );
}

export default MakePost;