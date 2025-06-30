import React from "react";
import "./Sidebar.css"; 
import { FaTimes } from "react-icons/fa";

const Sidebar = ({ isOpen, onClose }) => {
  return (
    <>
      <div className={`sidebar ${isOpen ? "open" : ""}`}>
        <div className="sidebar-header">
          <FaTimes className="close-icon" onClick={onClose} />
        </div>
        <ul>
          <li>📁 My Portfolio</li>
          <li>📄 My Orders / Transactions</li>
          <li>🧾 KYC</li>
          <li>🛠️ Settings</li>
          <li>🚪 Logout</li>
          <li>📣 Refer & Earn</li>
          <li>🆘 Support</li>
          
        </ul>
      </div>
      {isOpen && <div className="overlay" onClick={onClose}></div>}
    </>
  );
};

export default Sidebar;
