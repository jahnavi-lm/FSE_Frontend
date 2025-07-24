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
import FundCompanyActionModal from "../FundManager/FundCompanyActionModal";
import { closeModal } from "../../features/investment/investmentSlice";

// Utility to format numbers prettily with two decimals and INR symbol
const formatNumber = (num) =>
  "₹" +
  (typeof num === "number"
    ? num.toLocaleString("en-IN", {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      })
    : "-");

// NAV CHART Calculation
function getNAVHistory(transactions) {
  if (!Array.isArray(transactions) || transactions.length === 0) return [];
  const ordered = [...transactions]
    .filter((t) => t.status === "SUCCESS")
    .sort((a, b) => new Date(a.transactionDate) - new Date(b.transactionDate));
  let dailyNAV = [];
  let cumNAV = 0;
  let lastDate = null;
  ordered.forEach((txn) => {
    const day = txn.transactionDate.split("T")[0];
    if (lastDate !== day && lastDate !== null) {
      dailyNAV.push({ date: lastDate, nav: cumNAV });
    }
    if (txn.transactionType === "BUY") {
      cumNAV += Number(txn.totalValue) || 0;
    }
    if (txn.transactionType === "SELL") {
      cumNAV -= Number(txn.totalValue) || 0;
    }
    lastDate = day;
  });
  if (lastDate !== null) dailyNAV.push({ date: lastDate, nav: cumNAV });
  return dailyNAV;
}

function filterByRange(data, range) {
  if (!Array.isArray(data) || data.length === 0) return [];
  const now = new Date();
  let cutoff = new Date();
  if (range === "Week") cutoff.setDate(now.getDate() - 7);
  else if (range === "Month") cutoff.setMonth(now.getMonth() - 1);
  else if (range === "Year") cutoff.setFullYear(now.getFullYear() - 1);
  else return data;
  return data.filter((row) => new Date(row.date) >= cutoff);
}

export default function Overview({
  investedCompanyList = [],
  transectionHistory = [],
  managerId,
  schemeId,
  onTransactionComplete,
  currentAum = 0,
}) {
  const dispatch = useDispatch();
  const { chartRange, pieColors } = useSelector((state) => state.overview);
  const { isModalOpen, selectedCompany, actionType } = useSelector(
    (state) => state.investment
  );

  // Pie chart: allocation
  const totalCurrentInvestment = investedCompanyList.reduce(
    (sum, c) => sum + (Number(c.investedAmount) || 0),
    0
  );
  const pieData = investedCompanyList.map((c) => ({
    name: c.companyName,
    value: Math.round((Number(c.investedAmount) || 0) * 100) / 100,
    percent:
      totalCurrentInvestment > 0
        ? (Number(c.investedAmount) / totalCurrentInvestment) * 100
        : 0,
  }));

  // Transaction history (desc)
  const transactionRows = Array.isArray(transectionHistory)
    ? [...transectionHistory].sort(
        (a, b) => new Date(b.transactionDate) - new Date(a.transactionDate)
      )
    : [];

  // NAV chart data
  const navHistoryData = getNAVHistory(transectionHistory);
  const filteredNavHistoryData = filterByRange(
    navHistoryData,
    chartRange || "Year"
  );

  const handleSetChartRange = (range) => {
    dispatch(setChartRange(range));
  };

  const handleAction = (type, company) => {
    if (!schemeId) {
      alert("⚠️ Please select a fund scheme before performing this action.");
      return;
    }
    dispatch({
      type: "investment/openModal",
      payload: { actionType: type, company },
    });
  };

  return (
    <div className="space-y-10">
      {/* Summary Bar */}
      <div className="bg-slate-100 border border-slate-200 rounded-xl p-4 shadow-sm flex gap-10 items-center text-sm font-medium">
        <span>
          <span className="text-gray-500">AUM:</span>{" "}
          <span className="text-blue-700 font-semibold">
            {formatNumber(currentAum)}
          </span>
        </span>
        <span>
          <span className="text-gray-500">Invested (Stocks):</span>{" "}
          <span className="text-green-700 font-semibold">
            {formatNumber(totalCurrentInvestment)}
          </span>
        </span>
      </div>
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
              <LineChart data={filteredNavHistoryData}>
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
              🥧 Investment Allocation (% of Invested)
            </h3>
            <ResponsiveContainer width="100%" height={260}>
              <PieChart>
                <Pie
                  dataKey="value"
                  data={pieData}
                  nameKey="name"
                  cx="50%"
                  cy="50%"
                  outerRadius={80}
                  label={({ name, percent }) =>
                    `${name}: ${(percent * 100).toFixed(0)}%`
                  }
                >
                  {pieData.map((_, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={
                        pieColors
                          ? pieColors[index % pieColors.length]
                          : `#${Math.floor(Math.random() * 16777215).toString(16)}`
                      }
                    />
                  ))}
                </Pie>
                <Tooltip
                  formatter={(value, name, props) => [
                    `${formatNumber(value)} (${props.payload.percent.toFixed(
                      1
                    )}%)`,
                    `${name}`,
                  ]}
                  contentStyle={{ fontSize: "12px" }}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Holdings Table */}
      <div className="bg-green-50 border border-green-200 p-6 rounded-xl shadow-inner">
        <h3 className="text-xl font-semibold text-green-700 mb-3">
          📋 Fund Manager's Current Holdings
        </h3>
        <div className="overflow-x-auto">
          <table className="min-w-full border text-sm">
            <thead className="bg-green-100">
              <tr>
                <th className="px-4 py-2 border">Stock Name/Ticker</th>
                <th className="px-4 py-2 border">Number of Shares</th>
                <th className="px-4 py-2 border">Last Purchase Date</th>
                <th className="px-4 py-2 border">Total Investment (₹)</th>
                <th className="px-4 py-2 border">% of Invested</th>
                <th className="px-4 py-2 border">Action</th>
              </tr>
            </thead>
            <tbody>
              {investedCompanyList.map((item) => (
                <tr key={item.id} className="hover:bg-green-100">
                  <td className="px-4 py-2 border">{item.companyName}</td>
                  <td className="px-4 py-2 border">{item.numberOfStocks}</td>
                  <td className="px-4 py-2 border">{item.investmentDate}</td>
                  <td className="px-4 py-2 border">
                    {formatNumber(item.investedAmount)}
                  </td>
                  <td className="px-4 py-2 border">
                    {totalCurrentInvestment > 0
                      ? ((item.investedAmount /
                          totalCurrentInvestment) *
                          100
                        ).toFixed(1)
                      : 0}
                    %
                  </td>
                  <td className="px-4 py-2 border flex gap-2">
                    <button
                      className="bg-blue-600 text-white px-3 py-1 rounded-md text-xs hover:bg-blue-700"
                      onClick={() => handleAction("BUY", item)}
                    >
                      Buy
                    </button>
                    <button
                      className="bg-red-500 text-white px-3 py-1 rounded-md text-xs hover:bg-red-600"
                      onClick={() => handleAction("SELL", item)}
                    >
                      Sell
                    </button>
                  </td>
                </tr>
              ))}
              {investedCompanyList.length === 0 && (
                <tr>
                  <td colSpan={6} className="text-center text-gray-500 py-6">
                    No investments yet.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* TRANSACTION HISTORY TABLE */}
      <div className="bg-sky-50 border border-sky-200 p-6 rounded-xl shadow-inner">
        <h3 className="text-xl font-semibold text-blue-700 mb-3">
          📝 Full Transaction History
        </h3>
        <div className="overflow-x-auto">
          <table className="min-w-full border text-xs">
            <thead className="bg-sky-100">
              <tr>
                <th className="px-3 py-2 border">Date</th>
                <th className="px-3 py-2 border">Stock Name</th>
                <th className="px-3 py-2 border">Type</th>
                <th className="px-3 py-2 border">Status</th>
                <th className="px-3 py-2 border">Number of Shares</th>
                <th className="px-3 py-2 border">Price/Share (₹)</th>
                <th className="px-3 py-2 border">Total Value (₹)</th>
              </tr>
            </thead>
            <tbody>
              {transactionRows.map((tx, idx) => (
                <tr
                  key={idx}
                  className={tx.status === "FAILED" ? "text-red-500" : ""}
                >
                  <td className="px-3 py-2 border">
                    {new Date(tx.transactionDate).toLocaleString()}
                  </td>
                  <td className="px-3 py-2 border">{tx.companyName}</td>
                  <td className="px-3 py-2 border">{tx.transactionType}</td>
                  <td className={`px-3 py-2 border`}>
                    <span
                      className={
                        tx.status === "SUCCESS"
                          ? "text-green-600 font-semibold"
                          : "text-red-500 font-semibold"
                      }
                    >
                      {tx.status}
                    </span>
                  </td>
                  <td className="px-3 py-2 border">{tx.numberOfStocks}</td>
                  <td className="px-3 py-2 border">
                    {formatNumber(tx.pricePerStock)}
                  </td>
                  <td className="px-3 py-2 border">
                    {formatNumber(tx.totalValue)}
                  </td>
                </tr>
              ))}
              {transactionRows.length === 0 && (
                <tr>
                  <td colSpan={7} className="text-center text-gray-500 py-6">
                    No transaction history.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Pass investedCompanyList (crucial for showing 'Units Held' in modal) */}
      <FundCompanyActionModal
        isOverview={true}
        isOpen={isModalOpen}
        onClose={() => dispatch(closeModal())}
        actionType={actionType}
        company={selectedCompany}
        schemeId={schemeId}
        managerId={managerId}
        onTransactionComplete={onTransactionComplete}
        investedCompanyList={investedCompanyList}
        showStockInput={true}
      />
    </div>
  );
}
