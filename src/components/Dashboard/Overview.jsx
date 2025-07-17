import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { setChartRange } from "../../features/overview/overviewSlice";
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

export default function Overview() {
  const dispatch = useDispatch();
  const {
    chartRange,
    chartData,
    investmentBreakdown,
    investments,
    pieColors,
  } = useSelector((state) => state.overview);

  const handleSetChartRange = (range) => {
    dispatch(setChartRange(range));
  };

  return (
    <div className="space-y-10 ">
      {/* Charts Section */}
      <div className="bg-blue-50 border border-blue-200 p-6 rounded-xl shadow-inner">
        <div className="flex flex-col lg:flex-row gap-6">
          {/* Line Chart */}
          <div className="w-full lg:w-2/3 bg-white border border-gray-200 rounded-xl p-5 shadow-sm">
            <div className="flex justify-between items-center mb-3">
              <h3 className="text-base font-semibold text-gray-700">
                📈 Performance Chart
              </h3>
              <div className="space-x-2">
                {["Week", "Month", "Year"].map((r) => (
                  <button
                    key={r}
                    onClick={() => handleSetChartRange(r)}
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

          {/* Pie Chart */}
          <div className="w-full lg:w-1/3 bg-white border border-gray-200 rounded-xl p-5 shadow-sm">
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
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Fund Manager Investments Table */}
      <div className="bg-green-50 border border-green-200 p-6 rounded-xl shadow-inner">
        <h3 className="text-xl font-semibold text-green-700 mb-3">
          📋 Fund Manager's Stock Investment Details
        </h3>
        <div className="overflow-x-auto">
          <table className="min-w-full border text-sm">
            <thead className="bg-green-100">
              <tr>
                <th className="px-4 py-2 border">Stock Name/Ticker Symbol</th>
                <th className="px-4 py-2 border">Number of Shares</th>
                <th className="px-4 py-2 border">Purchase Date</th>
                <th className="px-4 py-2 border">Purchase Price (₹)</th>
                <th className="px-4 py-2 border">Current Price (₹)</th>
                <th className="px-4 py-2 border">Total Investment Value (₹)</th>
                <th className="px-4 py-2 border">Date of Last Trade</th>
                <th className="px-4 py-2 border">Percentage Change</th>
              </tr>
            </thead>
            <tbody>
              {investments.map((item) => (
                <tr key={item.id} className="hover:bg-green-50">
                  <td className="px-4 py-2 border">{item.stock}</td>
                  <td className="px-4 py-2 border">{item.quantity}</td>
                  <td className="px-4 py-2 border">{item.purchaseDate}</td>
                  <td className="px-4 py-2 border">₹{item.purchasePrice}</td>
                  <td className="px-4 py-2 border">₹{item.currentPrice}</td>
                  <td className="px-4 py-2 border">₹{item.totalValue}</td>
                  <td className="px-4 py-2 border">{item.lastTradeDate}</td>
                  <td className="px-4 py-2 border">{item.percentageChange}%</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}