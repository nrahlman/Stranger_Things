import React from "react";
import { Routes, Route } from "react-router-dom";
import LoginForm from "./LoginForm";



const RRoutes = () => {
    return (
        <div>
            <Routes>
                <Route path="/users/login" element={<LoginForm />}></Route>
                <Route path="/users/posts" element={<postList/>}></Route>
            </Routes>
        </div>
    );
};

export default RRoutes;