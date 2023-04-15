import React from "react";
import { Routes, Route } from "react-router-dom";
import LoginForm from "./LoginForm";
import PostList from "./PostList";
import MyPosts from "./MyPost";
import CreatePost from "./CreatePost";
import PostDetail from "./PostDetails";

const RRoutes = ({ token, setToken, user, setUser }) => {
  return (
    <div>
      <Routes>
        <Route
          path="/login"
          element={
            <LoginForm
              token={token}
              setToken={setToken}
              user={user}
              setUser={setUser}
            />
          }
        />
        <Route
          path="/posts"
          element={<PostList token={token} user={user} setUser={setUser} />}
        />
        <Route path="/myposts" element={<MyPosts token={token} user={user} />} />
        <Route path="/createpost" element={<CreatePost token={token} />} />
        <Route
          path="/posts/:postId"
          element={<PostDetail token={token} user={user} />}
        />
      </Routes>
    </div>
  );
};

export default RRoutes;