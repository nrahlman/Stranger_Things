import React, { useState } from "react";
import { loginUser } from "../api/auth";

const Login = ({ setToken }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    const token = await loginUser(username, password);

    localStorage.setItem("token", token);
    setToken(token);
    console.log(username, password);
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          onChange={(e) => setUsername(e.target.value)}
          value={username}
          type="text"
          placeholder="username"
        ></input>
        <input
          onChange={(e) => setPassword(e.target.value)}
          value={password}
          type="password"
          placeholder="password"
        ></input>
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default Login;