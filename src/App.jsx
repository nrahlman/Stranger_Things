import "./App.css";
import { useState, useEffect } from "react";
import Register from "./components/Register";
import Login from "./components/login";
import Logout from "./components/Log-out";
import { fetchMe, logout } from "./api/auth";

function App() {
  const [token, setToken] = useState(localStorage.getItem("token"));
  const [user, setUser] = useState({});
  console.log(user, "User data");

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

  return (
    <div className="App">
      <h1>{user?.username}</h1>
      <h2>Register</h2>
      <Register setToken={setToken} />
      <h2>Login</h2>
      <Login setToken={setToken} />
      {token && <Logout logout={handleLogout} />}
    </div>
  );
}

export default App;