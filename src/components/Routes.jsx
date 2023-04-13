import React from "react";
import { Routes, Route } from "react-router-dom";
import LoginForm from "./LoginForm";
import PostList from "./PostList";
import Profile from "./Profile";



const RRoutes = () => {
    return (
        <div>
            <Routes>
                <Route path="/users/login" element={<LoginForm />}></Route>
                <Route path="/users/posts" element={<PostList/>}></Route>
                <Route path="/users/me" element={<Profile/>}></Route>
            </Routes>
        </div>
    );
};

export default RRoutes;