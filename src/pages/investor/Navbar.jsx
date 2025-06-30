import React, { useState } from "react";
import { FaBars, FaUserCircle, FaHome } from "react-icons/fa";
import { MdWavingHand } from "react-icons/md";
import "./NavBar.css";
import Logo from "../../components/header/logo";
import { Link } from 'react-router-dom';



  const NavBar = ({ firstName = "Investor", onMenuClick }) => {
  const [showProfileMenu, setShowProfileMenu] = useState(false);

  return (
    <nav className="navbar">
      <div className="navbar-left">
        <FaBars className="icon" onClick={onMenuClick} /> {/* ⬅️ Trigger Sidebar */}
       <Link to ="/Investor/Home"> <FaHome className="icon" /></Link>
        <Logo />
        
      </div>

      <div className="navbar-center">Welcome Investor</div>

      <div className="navbar-right">
        <span className="greeting">
          Hello, {firstName} <MdWavingHand className="wave-emoji" />
        </span>
        <FaUserCircle
          className="icon"
          onClick={() => setShowProfileMenu(!showProfileMenu)}
        />
        {showProfileMenu && (
          <div className="profile-menu">
            <ul>
              <li> <Link to="/Investor/Account"> 👤 My Account</Link></li>
              <li>💰 Wallet</li>
              <li>⚙️ Settings</li>
              <li>🔓 Logout</li>
            </ul>
          </div>
        )}
      </div>
    </nav>
  );
};



export default NavBar;
