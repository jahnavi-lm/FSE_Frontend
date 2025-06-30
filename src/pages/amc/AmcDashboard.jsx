// Updated AMC Dashboard with Mutual Fund Management + Fund Manager Management

import React, { useState } from "react";
import { FaMoneyBillWave, FaUserTie } from "react-icons/fa";
import AllMutualFunds from "../../components/dashboard/AllMutualFunds";
import AllFundManagers from "../../components/dashboard/AllFundManagers";
import MutualFundPopup from "../../components/dashboard/MutualFundPopup";

const AmcDashboard = () => {
  const [selectedTab, setSelectedTab] = useState("Mutual Funds");
  const [showCreatePopup, setShowCreatePopup] = useState(false);

  const tabs = [ "Mutual Funds", "Fund Managers","Overview",];

  const summaryData = {
    totalFunds: 11,
    totalManagers: 6,
  };

  return (
    <div className="max-w-7xl mx-auto px-6 py-6 min-h-screen">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-gray-800">
          AMC Admin Dashboard
        </h1>
        {selectedTab === "Mutual Funds" && (
          <button
            onClick={() => setShowCreatePopup(true)}
            className="px-4 py-2 bg-teal-600 text-white rounded-lg text-sm font-medium hover:bg-teal-700"
          >
            ➕ Create New Fund
          </button>
        )}
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-6">
        <div className="bg-white text-blue-700 shadow-sm rounded-xl p-5 border border-blue-200">
          <div className="flex items-center gap-2 text-lg font-medium">
            <FaMoneyBillWave />
            <span>Total Mutual Funds</span>
          </div>
          <p className="text-2xl font-bold mt-2">{summaryData.totalFunds}</p>
        </div>

        <div className="bg-white text-green-700 shadow-sm rounded-xl p-5 border border-green-200">
          <div className="flex items-center gap-2 text-lg font-medium">
            <FaUserTie />
            <span>Total Fund Managers</span>
          </div>
          <p className="text-2xl font-bold mt-2">{summaryData.totalManagers}</p>
        </div>
      </div>

      {/* Tab Section */}
      <div className="bg-white p-6 border border-gray-200 rounded-xl shadow-sm mb-6">
        <div className="flex space-x-6 overflow-x-auto mb-6">
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

        {/* Tab Content */}
        {selectedTab === "Overview" && (
          <div className="text-gray-700">
            <h2 className="text-lg font-semibold">
              Welcome to the AMC Admin Panel
            </h2>
            <p className="text-sm mt-2 text-gray-500">
              Manage all mutual funds and assign fund managers here.
            </p>
          </div>
        )}

        {selectedTab === "Mutual Funds" && <AllMutualFunds />}
        {selectedTab === "Fund Managers" && <AllFundManagers />}
      </div>

      {/* Create/Edit Fund Modal */}
      {showCreatePopup && (
        <MutualFundPopup
          onClose={() => setShowCreatePopup(false)}
          onSaveSuccess={() => {
            setShowCreatePopup(false);
            // Optionally trigger data reload
          }}
        />
      )}
    </div>
  );
};

export default AmcDashboard;
