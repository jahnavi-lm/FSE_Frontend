import React from "react";
import { FaEdit, FaShieldAlt } from "react-icons/fa";
import NavBar from "./Navbar";
import "../CSS/InvestorAccount.css"; // Ensure this file has updated CSS

const MyAccount = () => {
  const user = {
    name: "Manish",
    userId: "USR123456",
    email: "manish@example.com",
    contact: "9876543210",
    kycStatus: "Verified",
    kycValidTill: "2025-12-31",
    bank: {
      accountHolder: "Manish Patel",
      accountNumber: "XXXX-XXXX-1234",
      ifsc: "ICIC0001234",
    },
  };

  return (
    <>
      <NavBar firstName={user.name} />

      <div className="account-container">
        <h2 className="account-greeting">Hi, {user.name} 👋</h2>

        {/* Profile Section */}
        <section className="account-section">
          <div className="section-header">
            <h3>Your Profile</h3>
            <FaEdit className="edit-icon" title="Edit Profile" />
          </div>
          <div className="profile-grid">
            <p><strong>Name:</strong> {user.name}</p>
            <p><strong>User ID:</strong> {user.userId}</p>
            <p><strong>Email:</strong> {user.email}</p>
            <p><strong>Contact:</strong> {user.contact}</p>
          </div>
          <button className="change-password-btn">Change Password</button>
        </section>

        {/* KYC Section */}
        <section className="account-section">
          <div className="section-header">
            <h3>KYC Status</h3>
          </div>
          <div className="kyc-status">
            <span className="kyc-info">
                <FaShieldAlt size={18} />
                &nbsp;Verified until: {user.kycValidTill}
            </span>
            <button className="kyc-button" disabled>Request Update</button>
            </div>

         
        </section>

        {/* Bank Details */}
        <section className="account-section">
          <div className="section-header">
            <h3>Bank Account Details</h3>
            <FaEdit className="edit-icon" title="Edit Bank Details" />
          </div>
          
          <div className="profile-grid">
            <p><strong>Account Holder:</strong> {user.bank.accountHolder}</p>
            <p><strong>Account Number:</strong> {user.bank.accountNumber}</p>
            <p><strong>IFSC:</strong> {user.bank.ifsc}</p>
          </div>
        </section>

        {/* Login History */}
        <section className="account-section login-box">
          <h3>Your Login History</h3>
          <div className="login-placeholder">
            ✨ Feature will be updated soon ✨
          </div>
        </section>
      </div>
    </>
  );
};

export default MyAccount;
