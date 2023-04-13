import "../App.css";
import { useState, useEffect } from "react";
import { fetchMe, logout, loginUser, registerUser } from "../api/auth";
import PostList from './PostList';

function LoginForm() {
  const [token, setToken] = useState(localStorage.getItem("token"));
  const [user, setUser] = useState({});
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

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
    <div className="App">
      {!token ? (
        <div className="main">
          <input type="checkbox" id="chk" aria-hidden="true" />
          <div className="login">
            <form className="form" onSubmit={handleLogin}>
              <label htmlFor="chk" aria-hidden="true">
                Log in
              </label>
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
            </form>
          </div>

          <div className="register">
            <form className="form" onSubmit={handleRegister}>
              <label htmlFor="chk" aria-hidden="true">
                Register
              </label>
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
            </form>
          </div>
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