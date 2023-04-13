import React from "react";
import { Link } from "react-router-dom";
import LoginForm from "./LoginForm";


const NavBar = () => {
    return (
        <div>
          <Link to="/users/login" className="homeLink">Log In</Link>  
          <Link to="/users/posts" className="postlink">Posts</Link>
        </div>
    );
};

export default NavBar;