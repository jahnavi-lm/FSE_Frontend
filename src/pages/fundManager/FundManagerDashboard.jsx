import React, { useState } from "react";
import {
  FaMoneyBillWave,
  FaChartLine,
  FaTools,
  FaLayerGroup,
} from "react-icons/fa";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts";
import Strategies from "../../components/Dashboard/Strategies";

const FundManagerDashboard = () => {
  const [showValues, setShowValues] = useState(true);
  const [selectedTab, setSelectedTab] = useState("Overview");
  const [chartRange, setChartRange] = useState("Month");

  const managerData = {
    capital: 500000,
    pnl: 82000,
    strategies: 8,
    backtests: 15,
  };

  const displayValue = (val) =>
    showValues ? `₹${val.toLocaleString()}` : "****";

  const tabs = ["Overview", "Strategies", "Backtest", "Portfolio", "Results"];

  const chartData = {
    Week: [
      { date: "Mon", nav: 155 },
      { date: "Tue", nav: 88 },
      { date: "Wed", nav: 320 },
      { date: "Thu", nav: 107 },
      { date: "Fri", nav: 525 },
    ],
    Month: [
      { date: "Week 1", nav: 33 },
      { date: "Week 2", nav: 150 },
      { date: "Week 3", nav: 108 },
      { date: "Week 4", nav: 123 },
      { date: "Week 5", nav: 33 },
      { date: "Week 6", nav: 150 },
      { date: "Week 7", nav: 108 },
      { date: "Week 8", nav: 123 },
    ],
    Year: Array.from({ length: 12 }, (_, i) => ({
      date: `M${i + 1}`,
      nav: 90 + Math.floor(Math.random() * 30),
    })),
  };

  const investmentBreakdown = [
    { name: "Equity", value: 40 },
    { name: "Debt", value: 25 },
    { name: "Commodities", value: 15 },
    { name: "Real Estate", value: 10 },
    { name: "Cash", value: 10 },
  ];

  const pieColors = ["#14b8a6", "#3b82f6", "#f97316", "#a855f7", "#f43f5e"];

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

        {/* Overview Charts */}
        {selectedTab === "Overview" && (
          <div className="flex flex-col lg:flex-row gap-6 mb-6">
            {/* 2/3 Line Chart */}
            <div className="w-full lg:w-2/3">
              <div className="flex justify-between items-center mb-3">
                <h3 className="text-base font-semibold text-gray-700">
                  📈 Performance Chart
                </h3>
                <div className="space-x-2">
                  {["Week", "Month", "Year"].map((r) => (
                    <button
                      key={r}
                      onClick={() => setChartRange(r)}
                      className={`px-3 py-1 rounded-full text-xs font-medium border ${
                        chartRange === r
                          ? "bg-teal-600 text-white border-teal-600"
                          : "bg-white text-gray-600 hover:bg-gray-100"
                      }`}
                    >
                      {r}
                    </button>
                  ))}
                </div>
              </div>
              <ResponsiveContainer width="100%" height={280}>
                <LineChart data={chartData[chartRange]}>
                  <XAxis dataKey="date" tick={{ fontSize: 11 }} />
                  <YAxis tick={{ fontSize: 11 }} />
                  <Tooltip
                    formatter={(value) => [`₹${value}`, "NAV"]}
                    contentStyle={{ fontSize: "12px" }}
                  />
                  <Line
                    type="monotone"
                    dataKey="nav"
                    stroke="#14b8a6"
                    strokeWidth={2}
                    activeDot={{ r: 5 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>

            {/* 1/3 Colorful Pie Chart */}
            <div className="w-full lg:w-1/3 bg-white border border-gray-200 rounded-xl p-5 shadow-inner text-sm">
              <h3 className="text-sm font-semibold text-gray-700 mb-3">
                🥧 Investment Allocation
              </h3>
              <ResponsiveContainer width="100%" height={260}>
                <PieChart>
                  <Pie
                    dataKey="value"
                    data={investmentBreakdown}
                    cx="50%"
                    cy="50%"
                    outerRadius={80}
                    label={({ name, percent }) =>
                      `${name}: ${(percent * 100).toFixed(0)}%`
                    }
                    labelStyle={{ fontSize: "10px" }} // optional
                  >
                    {investmentBreakdown.map((_, index) => (
                      <Cell
                        key={`cell-${index}`}
                        fill={pieColors[index % pieColors.length]}
                      />
                    ))}
                  </Pie>
                  <Tooltip
                    formatter={(value) => `${value}%`}
                    contentStyle={{ fontSize: "12px" }}
                    itemStyle={{ fontSize: "12px" }}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>
        )}



        {/* Tab Content Placeholder */}
        <div className="bg-blue-50 border border-blue-200 p-6 rounded-xl shadow-inner mb-4">
          {selectedTab === "Strategies" && <Strategies />}
          <p className="text-lg text-gray-700">
            You are viewing: <strong>{selectedTab}</strong>
          </p>
          <p className="text-sm text-gray-500 mt-2">
            This section will show data or actions related to{" "}
            <strong>{selectedTab}</strong>.
          </p>
        </div>

        {/* Insight */}
        <div className="bg-green-50 border border-green-200 p-6 rounded-xl shadow-inner">
          <h3 className="text-xl font-semibold text-green-700 mb-3">
            💡 Fund Manager Insight
          </h3>
          <p className="text-gray-700">
            Diversify strategies and backtest regularly to minimize risk and
            optimize returns.
          </p>
        </div>
      </div>
    </div>
  );
};

export default FundManagerDashboard;
