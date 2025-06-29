import React from "react";
import "../CSS/Sidebar.css";
import { FaTimes } from "react-icons/fa";

const Sidebar = ({ isOpen, onClose }) => {
  return (
    <>
      <div className={`sidebar ${isOpen ? "open" : ""}`}>
        <div className="sidebar-header">
          <FaTimes className="close-icon" onClick={onClose} />
        </div>
        <ul>
          <li>🏠 Dashboard</li>
          <li>👤 My Account</li>
          <li>📄 KYC</li>
          <li>📈 Investments</li>
          <li>🚪 Logout</li>
        </ul>
      </div>
      {isOpen && <div className="overlay" onClick={onClose}></div>}
    </>
  );
};

export default Sidebar;
