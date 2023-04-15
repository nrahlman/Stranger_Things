import React, { useState, useEffect } from "react";
import { fetchMe, logout, loginUser, registerUser } from "../api/auth";
import "../components-css/Loginform.css";

function LoginForm({ token, setToken, user, setUser }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showRegister, setShowRegister] = useState(false);

  useEffect(() => {
    const getMe = async () => {
      const { data } = await fetchMe(token);
      setUser(data);
    };
    if (token) {
      getMe();
    }
  }, [token]);

  const handleLogout = () => {
    logout(setToken, setUser);
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    const token = await registerUser(username, password);
    localStorage.setItem("token", token);
    setToken(token);
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    const token = await loginUser(username, password);
    localStorage.setItem("token", token);
    setToken(token);
  };

  return (
    <div className="login-form">
      {!token ? (
        <div className="main">
          {showRegister ? (
            <div className="register">
              <form className="form" onSubmit={handleRegister}>
                <h2>Register</h2>
                <input
                  className="input"
                  type="text"
                  name="username"
                  placeholder="Username"
                  required=""
                  onChange={(e) => setUsername(e.target.value)}
                  value={username}
                />
                <input
                  className="input"
                  type="password"
                  name="pswd"
                  placeholder="Password"
                  required=""
                  onChange={(e) => setPassword(e.target.value)}
                  value={password}
                />
                <button type="submit">Register</button>
                <p>
                  Already have an account?{" "}
                  <span onClick={() => setShowRegister(false)}>
                    Log in here
                  </span>
                </p>
              </form>
            </div>
          ) : (
            <div className="login">
              <form className="form" onSubmit={handleLogin}>
                <h2>Log in</h2>
                <input
                  className="input"
                  type="text"
                  name="username"
                  placeholder="Username"
                  required=""
                  onChange={(e) => setUsername(e.target.value)}
                  value={username}
                />
                <input
                  className="input"
                  type="password"
                  name="pswd"
                  placeholder="Password"
                  required=""
                  onChange={(e) => setPassword(e.target.value)}
                  value={password}
                />
                <button type="submit">Log in</button>
                <p>
                  Don't have an account?{" "}
                  <span onClick={() => setShowRegister(true)}>
                    Register here
                  </span>
                </p>
              </form>
            </div>
          )}
        </div>
      ) : (
        <>
          <h1>Welcome, {user?.username}</h1>
          <button onClick={handleLogout}>Logout</button>
        </>
      )}
    </div>
  );
}

export default LoginForm;