import React, {useState} from 'react';
import { FaEye, FaEyeSlash } from "react-icons/fa";

import "../CSS/HomeBody.css";

const InvestorHomeBody = () => {
  const [showValues, setShowValues] = useState(true);
  const [selectedTab, setSelectedTab] = useState("Market");

  const summaryData = {
    invested: 150000,
    current: 180000,
    returns: 30000,
    wallet: 20000,
  };

  const tabs = ["Market", "Invest", "Portfolio", "All Schemes", "Others"];

  const displayValue = (val) => (showValues ?  "****": `₹${val.toLocaleString()}`);

  return (
    <div className="dashboard-container">
      <div className="investment-header">
        <h2>💼 My Investments</h2>
        <span onClick={() => setShowValues(!showValues)} className="eye-icon">
          {showValues ? <FaEyeSlash />: <FaEye /> }
        </span>
      </div>

      <div className="investment-values">
        <div><strong>Total Invested:</strong> {displayValue(summaryData.invested)}</div>
        <div><strong>Returns:</strong> {displayValue(summaryData.returns)}</div>
        <div><strong>Current Value:</strong> {displayValue(summaryData.current)}</div>
        <div><strong>Wallet:</strong> {displayValue(summaryData.wallet)}</div>
      </div>

      <hr />

      <div className="tab-nav">
  {tabs.map((tab, index) => (
    <div
      key={tab}
      className={`tab-wrapper ${selectedTab === tab ? "active" : ""}`}
      onClick={() => setSelectedTab(tab)}
    >
      <span className="tab-item">{tab}</span>
    </div>
  ))}
  <div
    className="underline"
    style={{
      transform: `translateX(${tabs.indexOf(selectedTab) * 120}px)`,
    }}
  />
</div>


      <div className="tab-content">
        <p>Showing content for: <strong>{selectedTab}</strong></p>
        {/* Render component or data based on selectedTab */}
      </div>
    </div>
  );
};

export default InvestorHomeBody;