import React, { useState } from "react";
import {
  FaMoneyBillWave,
  FaChartLine,
  FaTools,
  FaLayerGroup,
} from "react-icons/fa";
import Strategies from "../../components/Dashboard/Strategies";
import Backtest from "../../components/Dashboard/Backtest";
import Overview from "../../components/Dashboard/OverView";
import Compare from "../../components/Dashboard/Compare";
import Results from "../../components/Dashboard/Results";
import { initialResults } from "../../../Data/ResultsData";

const FundManagerDashboard = () => {
  const [showValues, setShowValues] = useState(true);
  const [selectedTab, setSelectedTab] = useState("Overview");
  const [results, setResults] = useState(initialResults);

  const managerData = {
    capital: 500000,
    pnl: 82000,
    strategies: 8,
    backtests: 15,
  };

  const displayValue = (val) =>
    showValues ? `₹${val.toLocaleString()}` : "****";

  const tabs = ["Overview", "Strategies", "Backtest", "Compare", "Results"];

  return (
    <div className="max-w-7xl mx-auto px-6 py-6 min-h-screen">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-gray-800">
          Fund Manager Dashboard
        </h1>
        <button
          onClick={() => setShowValues(!showValues)}
          className="text-teal-600 hover:text-blue-600 text-2xl"
        >
          {showValues ? "🙈" : "👁️"}
        </button>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
        <div className="bg-blue-50 text-blue-800 shadow-sm rounded-xl p-5 border border-blue-200">
          <div className="flex items-center gap-2 text-lg font-medium">
            <FaMoneyBillWave />
            <span>Total Capital</span>
          </div>
          <p className="text-2xl font-bold mt-2">
            {displayValue(managerData.capital)}
          </p>
        </div>

        <div className="bg-green-50 text-green-800 shadow-sm rounded-xl p-5 border border-green-200">
          <div className="flex items-center gap-2 text-lg font-medium">
            <FaChartLine />
            <span>Total P&L</span>
          </div>
          <p className="text-2xl font-bold mt-2">
            {displayValue(managerData.pnl)}
          </p>
        </div>

        <div className="bg-white text-indigo-700 shadow-sm rounded-xl p-5 border border-indigo-200">
          <div className="flex items-center gap-2 text-lg font-medium">
            <FaLayerGroup />
            <span>Strategies</span>
          </div>
          <p className="text-2xl font-bold mt-2">{managerData.strategies}</p>
        </div>

        <div className="bg-white text-teal-700 shadow-sm rounded-xl p-5 border border-teal-200">
          <div className="flex items-center gap-2 text-lg font-medium">
            <FaTools />
            <span>Backtests</span>
          </div>
          <p className="text-2xl font-bold mt-2">{managerData.backtests}</p>
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

        {/* Tab Content Placeholder */}
        <div>
          {selectedTab === "Overview" && <Overview />}
          {selectedTab === "Strategies" && <Strategies />}
          {selectedTab === "Backtest" && (
            <Backtest results={results} setResults={setResults} />
          )}
          {selectedTab === "Compare" && <Compare />}
          {selectedTab === "Results" && (
            <Results results={results} />
          )}
        </div>
      </div>
    </div>
  );
};

export default FundManagerDashboard;
