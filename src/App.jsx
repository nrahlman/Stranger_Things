import React from "react";
import { useState, useEffect } from "react";
import RRoutes from "./components/Routes";
import NavBar from "./components/NavBar";
import { fetchMe } from './api/auth';
import Footer from "./components/Footer";
import "./App.css"
import Posters from "./components/posters";

const App = () => {
  const [token, setToken] = useState(localStorage.getItem("token"));
  const [user, setUser] = useState({});

  useEffect(() => {
    const getMe = async () => {
      if (token) {
        const result = await fetchMe(token);
        if (result.success) {
          setUser(result.data);
        }
      }
    };
    getMe();
  }, [token]);

  return (
    <div className="container">
      <div className="header">
        <div className="logo">
          <img src="src/img/STlogo.png" alt="logo" />
        </div>
        <div className="TITLE">
          <p>STRANGER THINGS</p>
          <div className="slogan">EASIER SELL AND BUY</div>
        </div>
      </div>
      <div className="navbar">
        <NavBar />
      </div>
      <div className="posters">
        <Posters />
      </div>
      <div className="boarder1">
        {/* Add content for boarder1 here */}
      </div>
      <div className="boarder2">
        {/* Add content for boarder2 here */}
      </div>
      <div className="content">
      <RRoutes token={token} setToken={setToken} user={user} setUser={setUser} />
      </div>
      <div className="footer">
        <Footer />
      </div>
    </div>
  );
}
    

export default App;