import { Link } from "react-router-dom";
import { useState,useEffect } from "react";
import './Navbar.css';
import { auth } from './firebase';
const Navbar = () => {
  
  const [menuOpen, setMenuOpen] = useState(false);
  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };
  if (localStorage.getItem("testlink")===null){
    localStorage.setItem("testlink","login");
  }
  let [testlink,setTestLink] = useState(localStorage.getItem("testlink"));
  setInterval(()=>{
    setTestLink(localStorage.getItem("testlink"));
    // console.log(localStorage.getItem("testlink"));
  },100);
  const [user,setUser] = useState(null);
  useEffect(()=>{
    auth.onAuthStateChanged((usr)=>{
      setUser(usr);
    });
    console.log("re-rendered");
  },[]);
  return (
    <div className="navbar">
      <div className="left-nav">
        <Link to="/">
          <button className="home-button">Challenger's AI</button>
        </Link>
      </div>

      <div className="right-nav">
        <Link to={`/${testlink}`}>
          <button className="take-test-button">Start Test</button>
        </Link>
        <Link to="/login">
          <button className="sign-up-button" id="auth-button">Log in</button>
        </Link>
      </div>

      <div className="hamburger" onClick={toggleMenu}>
        <div></div>
        <div></div>
        <div></div>
      </div>

      <div className={`mobile-menu ${menuOpen ? "show" : ""}`}>
        <Link to={`/${testlink}`} onClick={toggleMenu}>Start Test</Link>
        <Link to="/login" onClick={toggleMenu} id="mobile-auth-button">Log in</Link>
      </div>
    </div>
  );
};

export default Navbar;
