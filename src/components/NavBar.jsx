import React from "react";
import { Link } from "react-router-dom";
import LoginForm from "./LoginForm";


const NavBar = () => {
    return (
        <div>
          <Link to="/users/login" className="homeLink">Log In</Link>  
          <Link to="/users/Posts" className="postlink">Posts</Link>
          <Link to="/users/me" className="profileLink">Profile</Link>
        </div>
    );
};

export default NavBar;