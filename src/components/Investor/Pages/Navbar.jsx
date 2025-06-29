import React, { useState } from "react";
import { FaBars, FaUserCircle, FaHome } from "react-icons/fa";
import { MdWavingHand } from "react-icons/md";
import "../CSS/NavBar.css";


  const NavBar = ({ firstName = "Investor", onMenuClick }) => {
  const [showProfileMenu, setShowProfileMenu] = useState(false);

  return (
    <nav className="navbar">
      <div className="navbar-left">
        <FaBars className="icon" onClick={onMenuClick} /> {/* ⬅️ Trigger Sidebar */}
        <FaHome className="icon" />
        <span className="greeting">
          Hello, {firstName} <MdWavingHand className="wave-emoji" />
        </span>
      </div>

      <div className="navbar-center">Welcome Investor</div>

      <div className="navbar-right">
        <FaUserCircle
          className="icon"
          onClick={() => setShowProfileMenu(!showProfileMenu)}
        />
        {showProfileMenu && (
          <div className="profile-menu">
            <ul>
              <li>My Account</li>
              <li>KYC Details</li>
              <li>Logout</li>
            </ul>
          </div>
        )}
      </div>
    </nav>
  );
};



export default NavBar;
