import React, { useState } from "react";
import {
  FaEye,
  FaEyeSlash,
  FaWallet,
  FaChartLine,
  FaCoins,
  FaMoneyCheckAlt,
} from "react-icons/fa";

const InvestorHomeBody = () => {
  const [showValues, setShowValues] = useState(true);
  const [selectedTab, setSelectedTab] = useState("Portfolio");

  const summaryData = {
    invested: 150000,
    current: 180000,
    returns: 30000,
    wallet: 20000,
  };

  const tabs = ["Portfolio", "Explore", "Invest", "All Schemes"];
  const displayValue = (val) =>
    showValues ? `₹${val.toLocaleString()}` : "****";

  return (
    <div className="max-w-7xl mx-auto px-6 py-4 min-h-screen">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-2xl font-bold text-gray-800">
          Investor Deshboard
        </h1>
        <button
          onClick={() => setShowValues(!showValues)}
          className="text-teal-600 hover:text-blue-600 text-2xl"
        >
          {showValues ? <FaEyeSlash /> : <FaEye />}
        </button>
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
          {selectedTab === "Portfolio" && (
            <div className="bg-blue-50 border border-blue-200 p-6 rounded-xl shadow-inner">
              <h3 className="text-xl font-semibold text-blue-700 mb-4">
                Portfolio Overview
              </h3>
              <p className="text-gray-700 mb-6">
                Here's how your investments are spread across mutual funds and
                their current performance.
              </p>

              <div className="overflow-x-auto">
                <table className="w-full table-auto text-sm text-left border border-blue-100 rounded-lg shadow-sm">
                  <thead className="bg-blue-100 text-blue-800">
                    <tr>
                      <th className="p-3 font-semibold">Fund Name</th>
                      <th className="p-3 font-semibold">Invested (₹)</th>
                      <th className="p-3 font-semibold">Current NAV</th>
                      <th className="p-3 font-semibold">% Allocation</th>
                      <th className="p-3 font-semibold text-green-700">
                        Profit
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-blue-100">
                    {[
                      {
                        name: "Axis Bluechip Fund",
                        invested: 50000,
                        nav: 61.34,
                        percent: 33.3,
                        profit: 7300,
                      },
                      {
                        name: "Parag Parikh Flexi Cap",
                        invested: 60000,
                        nav: 92.11,
                        percent: 40.0,
                        profit: 10200,
                      },
                      {
                        name: "SBI Equity Hybrid Fund",
                        invested: 40000,
                        nav: 58.25,
                        percent: 26.7,
                        profit: 4500,
                      },
                    ].map((fund, idx) => (
                      <tr key={idx}>
                        <td className="p-3 font-medium text-gray-800">
                          {fund.name}
                        </td>
                        <td className="p-3 text-gray-700">
                          ₹{fund.invested.toLocaleString()}
                        </td>
                        <td className="p-3 text-gray-700">₹{fund.nav}</td>
                        <td className="p-3 text-gray-700">{fund.percent}%</td>
                        <td className="p-3 text-green-600 font-semibold">
                          +₹{fund.profit.toLocaleString()}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* Pro Tip Section */}
          <div className="bg-blue-50 border border-blue-200 p-6 rounded-xl shadow-inner">
            <h3 className="text-xl font-semibold text-blue-700 mb-3">
              📈 Pro Tip
            </h3>
            <p className="text-gray-700">
              Invest consistently in SIPs and review your asset allocation every
              6 months.
            </p>
          </div>
          {/* Pro Tip Section */}
          <div className="bg-blue-50 border border-blue-200 p-6 rounded-xl shadow-inner">
            <h3 className="text-xl font-semibold text-blue-700 mb-3">
              📈 Pro Tip
            </h3>
            <p className="text-gray-700">
              Invest consistently in SIPs and review your asset allocation every
              6 months.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InvestorHomeBody;
