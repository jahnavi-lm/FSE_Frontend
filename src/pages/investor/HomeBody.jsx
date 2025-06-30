import React, { useState , useEffect } from "react";
import {
  FaEye,
  FaEyeSlash,
  FaWallet,
  FaChartLine,
  FaCoins,
  FaMoneyCheckAlt,
} from "react-icons/fa";

import InvDashPortfolio from "../../components/Investor/Inv-Dash-portfolio";
import InvDashAllSchemes from "../../components/Investor/Inv-Dash-AllScheme";
import InvDashTransactions from "../../components/Investor/Inv-Dash-AllTxn";




const InvestorHomeBody = () => {
  const [showValues, setShowValues] = useState(true);
  const [selectedTab, setSelectedTab] = useState("My Portfolio");

  useEffect(() => {
    document.title = "Home | Investor";
    
  }, []);

  const summaryData = {
    invested: 150000,
    current: 180000,
    returns: 30000,
    wallet: 20000,
  };

  const tabs = ["My Portfolio", "All Schemes" , "My Transactions"];
  const displayValue = (val) =>
    showValues ? "****" : `₹${val.toLocaleString()}`;

  return (

    
    <div className="max-w-7xl mx-auto px-6 py-4 min-h-screen">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
      <h1 className="text-2xl font-bold text-gray-800 flex items-center">
        Investor Dashboard:
        <button
          onClick={() => setShowValues(!showValues)}
          className="text-teal-600 hover:text-blue-600 text-2xl align-middle ml-2"
        >
          {showValues ?  <FaEyeSlash /> : <FaEye />}
        </button>
      </h1>
    </div>


      {/* Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-4">
        <div className="bg-teal-50 text-teal-800 shadow-sm rounded-xl p-5 border border-teal-200">
          <div className="flex items-center gap-2 text-lg font-medium">
            <FaMoneyCheckAlt />
            <span>Total Invested</span>
          </div>
          <p className="text-2xl font-bold mt-2">
            {displayValue(summaryData.invested)}
          </p>
        </div>

        <div className="bg-blue-50 text-blue-800 shadow-sm rounded-xl p-5 border border-blue-200">
          <div className="flex items-center gap-2 text-lg font-medium">
            <FaChartLine />
            <span>Current Value</span>
          </div>
          <p className="text-2xl font-bold mt-2">
            {displayValue(summaryData.current)}
          </p>
        </div>

        <div className="bg-green-50 text-green-800 shadow-sm rounded-xl p-5 border border-green-200">
          <div className="flex items-center gap-2 text-lg font-medium">
            <FaCoins />
            <span>Total Returns</span>
          </div>
          <p className="text-2xl font-bold mt-2">
            {displayValue(summaryData.returns)}
          </p>
        </div>

        <div className="bg-white text-gray-800 shadow-sm rounded-xl p-5 border border-gray-200">
          <div className="flex items-center gap-2 text-lg font-medium">
            <FaWallet className="text-teal-600" />
            <span>Wallet Balance</span>
          </div>
          <p className="text-2xl font-bold mt-2">
            {displayValue(summaryData.wallet)}
          </p>
        </div>
      </div>

      {/* Tab Navigation */}
      <div className="bg-white p-6 border border-gray-200 rounded-xl shadow-sm mb-6">
        <div className="relative mb-6">
          <div className="flex space-x-6 overflow-x-auto">
            {tabs.map((tab) => (
              <button
                key={tab}
                onClick={() => setSelectedTab(tab)}
                className={`pb-2 text-md font-medium transition-all duration-200 ${
                  selectedTab === tab
                    ? "text-teal-600 border-b-2 border-teal-600"
                    : "text-gray-500 hover:text-blue-600"
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>

        <div className="flex flex-col space-y-6">
          {/* Portfolio Details View */}
         {selectedTab === "My Portfolio" && <InvDashPortfolio />}
         {selectedTab === "All Schemes" && <InvDashAllSchemes />}
         {selectedTab === "My Transactions" && <InvDashTransactions />}

          
        </div>
      </div>
    </div>
  );
};

export default InvestorHomeBody;
