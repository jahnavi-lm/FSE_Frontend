// components/Dashboard/PortfolioSummary.jsx
import React from "react";
import { FaMoneyBillWave, FaChartLine, FaLayerGroup } from "react-icons/fa";

const PortfolioSummary = ({ showValues, toggleShowValues, data }) => {
  const displayValue = (val) => (showValues ? `₹${val.toLocaleString()}` : "****");

  return (
    <>
      {/* Summary Header with Eye Toggle */}
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-semibold text-gray-800">📊 Portfolio Summary</h2>
        <button
          onClick={toggleShowValues}
          className="text-teal-600 hover:text-blue-600 text-2xl transition"
          title="Toggle Value Visibility"
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
          <p className="text-2xl font-bold mt-2">{displayValue(data.capital)}</p>
        </div>

        <div className="bg-green-50 text-green-800 shadow-sm rounded-xl p-5 border border-green-200">
          <div className="flex items-center gap-2 text-lg font-medium">
            <FaChartLine />
            <span>Total P&L</span>
          </div>
          <p className="text-2xl font-bold mt-2">{displayValue(data.pnl)}</p>
        </div>

        <div className="bg-white text-indigo-700 shadow-sm rounded-xl p-5 border border-indigo-200">
          <div className="flex items-center gap-2 text-lg font-medium">
            <FaLayerGroup />
            <span>Strategies</span>
          </div>
          <p className="text-2xl font-bold mt-2">{data.strategies}</p>
        </div>
      </div>
    </>
  );
};

export default PortfolioSummary;
