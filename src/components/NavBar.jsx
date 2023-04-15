import React from 'react'
import { Link } from 'react-router-dom';
import '../components-css/NavBar.css';

const NavBar = ({ user }) => {
  return (
    <div className="Navbar">
      {user && <h1>Welcome, {user.username}</h1>}
      <nav>
        <Link to="/login" className="nav-link">LogIn</Link>
        <Link to="/posts" className="nav-link">Post</Link>
        <Link to="/myposts" className="nav-link">Me</Link>
        <Link to="/createpost" className="nav-link">Create</Link>
        <div className="animation"></div>
      </nav>
    </div>
  );
};

export default NavBar;