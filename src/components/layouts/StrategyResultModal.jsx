// import React, { useState, useMemo } from "react";
// import ReactApexChart from "react-apexcharts";

// export default function StrategyResultModal({ result, onClose, companyCandleMap }) {
//   const [selectedCompany, setSelectedCompany] = useState("All");
//   const [candleSeries, setCandleSeries] = useState([]);

//   if (!result) return null;

//   const trades = result.trades ?? [];
//   const allSymbols = Array.from(new Set(trades.map((t) => t.symbol)));

//   const dropdownOptions = ["All", ...allSymbols];

//   // Filter trades by selected company
//   const filteredTrades = useMemo(() => {
//     if (selectedCompany === "All") return trades;
//     return trades.filter((t) => t.symbol === selectedCompany);
//   }, [selectedCompany, trades]);

//   // Per-company metrics
//   const initialEquityPerCompany = filteredTrades
//     .filter((t) => t.action === "BUY")
//     .reduce((sum, t) => sum + (t.totalCostPrice || 0), 0);

//   const realizedProfitPerCompany = filteredTrades
//     .filter((t) => t.action === "SELL")
//     .reduce((sum, t) => sum + (t.realizedProfit || 0), 0);

//   const finalEquityPerCompany = initialEquityPerCompany + realizedProfitPerCompany;
//   const totalTradesPerCompany = filteredTrades.length;

//   // Dropdown change handler
//   const handleCompanyChange = (selected) => {
//     setSelectedCompany(selected);
//     if (selected === "All") {
//       setCandleSeries([]);
//     } else if (companyCandleMap && companyCandleMap[selected]) {
//       setCandleSeries(companyCandleMap[selected]);
//     }
//   };

//   // Chart Options
//   const candleOptions = {
//     chart: { type: "candlestick", height: 350 },
//     title: { text: "CandleStick Chart", align: "left" },
//     xaxis: { type: "datetime" },
//     yaxis: {
//       tooltip: { enabled: true },
//       labels: { formatter: (val) => val.toFixed(2) },
//     },
//   };

//   const mergedSeries = [
//     {
//       name: "Closing Balance",
//       type: "line",
//       data: filteredTrades.map((t) => ({
//         x: new Date(t.date).getTime(),
//         y: t.closingBalance,
//       })),
//     },
//     {
//       name: "Realized Profit",
//       type: "column",
//       data: filteredTrades.map((t) => ({
//         x: new Date(t.date).getTime(),
//         y: t.realizedProfit,
//       })),
//     },
//     {
//       name: "BUY",
//       type: "scatter",
//       data: filteredTrades
//         .filter((t) => t.action === "BUY")
//         .map((t) => ({
//           x: new Date(t.date).getTime(),
//           y: t.price,
//         })),
//     },
//     {
//       name: "SELL",
//       type: "scatter",
//       data: filteredTrades
//         .filter((t) => t.action === "SELL")
//         .map((t) => ({
//           x: new Date(t.date).getTime(),
//           y: t.price,
//         })),
//     },
//   ];

//   const mergedOptions = {
//     chart: {
//       height: 400,
//       type: "line",
//       stacked: false,
//       zoom: { enabled: true },
//     },
//     dataLabels: { enabled: false },
//     stroke: { width: [2, 0, 0, 0], curve: "smooth" },
//     markers: { size: [0, 0, 6, 6] },
//     xaxis: { type: "datetime" },
//     yaxis: [{
//       labels: { formatter: (val) => `₹${val.toFixed(2)}` },
//     }],
//     plotOptions: {
//       bar: {
//         columnWidth: '50%',
//         colors: {
//           ranges: [
//             { from: -10000, to: 0, color: "#f87171" },
//             { from: 0, to: 10000, color: "#4ade80" },
//           ],
//         },
//       },
//     },
//     colors: ["#3b82f6", "#10b981", "#6366f1", "#ef4444"],
//     title: {
//       text: `Combined View${selectedCompany !== "All" ? ` for ${selectedCompany}` : ""}`,
//       align: "left",
//     },
//     tooltip: {
//       shared: true,
//       intersect: false,
//       x: { format: "dd MMM yyyy" },
//     },
//   };

//   return (
//     <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
//       <div className="relative bg-white rounded-xl shadow-2xl w-full max-w-5xl max-h-[90vh] overflow-y-auto p-6">
//         <button
//           onClick={onClose}
//           className="absolute top-3 right-3 text-gray-500 hover:text-gray-800 text-2xl font-bold"
//           aria-label="Close"
//         >
//           &times;
//         </button>

//         <h2 className="text-2xl font-bold text-teal-700 mb-6 text-center">
//           Simulation Result
//         </h2>

//         {/* Overall Stats (Always) */}
//         <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
//           <div className="bg-gray-100 p-4 rounded shadow text-center">
//             <div className="text-sm text-gray-500">Overall Initial Equity</div>
//             <div className="text-lg font-bold text-gray-800">
//               ₹{result.initialEquity?.toFixed(2) ?? "—"}
//             </div>
//           </div>
//           <div className="bg-gray-100 p-4 rounded shadow text-center">
//             <div className="text-sm text-gray-500">Overall Final Equity</div>
//             <div className="text-lg font-bold text-gray-800">
//               ₹{result.finalEquity?.toFixed(2) ?? "—"}
//             </div>
//           </div>
//           <div className="bg-gray-100 p-4 rounded shadow text-center">
//             <div className="text-sm text-gray-500">Overall Total Trades</div>
//             <div className="text-lg font-bold text-gray-800">
//               {result.totalTrades ?? "—"}
//             </div>
//           </div>
//         </div>

//         {/* Dropdown */}
//         <div className="mb-4 flex gap-4 items-center">
//           <label className="text-gray-700 font-medium">Select Company:</label>
//           <select
//             className="border px-4 py-2 rounded-lg shadow-sm"
//             value={selectedCompany}
//             onChange={(e) => handleCompanyChange(e.target.value)}
//           >
//             {dropdownOptions.map((symbol) => (
//               <option key={symbol} value={symbol}>{symbol}</option>
//             ))}
//           </select>
//         </div>

//         {/* Company-Specific Stats */}
//         {selectedCompany !== "All" && (
//           <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
//             <div className="bg-gray-100 p-4 rounded shadow text-center">
//               <div className="text-sm text-gray-500">Initial Equity ({selectedCompany})</div>
//               <div className="text-lg font-bold text-gray-800">
//                 ₹{initialEquityPerCompany.toFixed(2)}
//               </div>
//             </div>
//             <div className="bg-gray-100 p-4 rounded shadow text-center">
//               <div className="text-sm text-gray-500">Final Equity ({selectedCompany})</div>
//               <div className="text-lg font-bold text-gray-800">
//                 ₹{finalEquityPerCompany.toFixed(2)}
//               </div>
//             </div>
//             <div className="bg-gray-100 p-4 rounded shadow text-center">
//               <div className="text-sm text-gray-500">Total Trades ({selectedCompany})</div>
//               <div className="text-lg font-bold text-gray-800">
//                 {totalTradesPerCompany}
//               </div>
//             </div>
//           </div>
//         )}

//         {/* Candlestick Chart */}
//         {selectedCompany !== "All" && candleSeries?.length > 0 && (
//           <ReactApexChart
//             options={candleOptions}
//             series={candleSeries}
//             type="candlestick"
//             height={350}
//           />
//         )}

//         {/* Merged Chart */}
//         {filteredTrades.length > 0 && (
//           <div className="mt-10">
//             <ReactApexChart
//               options={mergedOptions}
//               series={mergedSeries}
//               type="line"
//               height={400}
//             />
//           </div>
//         )}

//         {/* Trades Table */}
//         <h3 className="text-lg font-semibold mt-8 mb-4">
//           Trades Table {selectedCompany !== "All" && `(${selectedCompany})`}
//         </h3>
//         <div className="overflow-x-auto border rounded-lg shadow">
//           <table className="table-auto w-full text-sm border">
//             <thead className="bg-gray-100">
//               <tr>
//                 <th className="p-2">Date</th>
//                 <th className="p-2">Action</th>
//                 <th className="p-2">Price</th>
//                 <th className="p-2">Symbol</th>
//                 <th className="p-2">Quantity</th>
//                 <th className="p-2">Total Cost</th>
//                 <th className="p-2">Opening Balance</th>
//                 <th className="p-2">Closing Balance</th>
//                 <th className="p-2">NAV</th>
//                 <th className="p-2">Realized Profit</th>
//               </tr>
//             </thead>
//             <tbody>
//               {filteredTrades.length ? (
//                 filteredTrades.map((trade, index) => (
//                   <tr key={index} className="text-center">
//                     <td className="p-2">{trade.date}</td>
//                     <td className={`p-2 font-bold ${trade.action === "BUY" ? "text-green-600" : "text-red-600"}`}>
//                       {trade.action}
//                     </td>
//                     <td className="p-2">₹{trade.price?.toFixed(2) ?? "—"}</td>
//                     <td className="p-2">{trade.symbol ?? "—"}</td>
//                     <td className="p-2">{trade.quantity ?? "—"}</td>
//                     <td className="p-2">₹{trade.totalCostPrice?.toFixed(2) ?? "—"}</td>
//                     <td className="p-2">₹{trade.openingBalance?.toFixed(2) ?? "—"}</td>
//                     <td className="p-2">₹{trade.closingBalance?.toFixed(2) ?? "—"}</td>
//                     <td className="p-2">₹{trade.price?.toFixed(2) ?? "—"}</td>
//                     <td className={`p-2 font-bold ${trade.realizedProfit > 0 ? "text-green-600" : trade.realizedProfit < 0 ? "text-red-600" : "text-gray-600"}`}>
//                       ₹{trade.realizedProfit?.toFixed(2) ?? "—"}
//                     </td>
//                   </tr>
//                 ))
//               ) : (
//                 <tr>
//                   <td colSpan="10" className="text-center text-gray-400 py-4">
//                     No trades available.
//                   </td>
//                 </tr>
//               )}
//             </tbody>
//           </table>
//         </div>
//       </div>
//     </div>
//   );
// }
import React, { useState, useMemo } from "react";
import ReactApexChart from "react-apexcharts";

// --- SVG Icons for UI Enhancement ---
const WalletIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="h-8 w-8 text-blue-500"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
    strokeWidth={2}
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z"
    />
  </svg>
);

const ChartUpIcon = ({ className }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className={`h-8 w-8 ${className}`}
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
    strokeWidth={2}
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"
    />
  </svg>
);

const TradeIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="h-8 w-8 text-gray-500"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
    strokeWidth={2}
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4"
    />
  </svg>
);

export default function StrategyResultModal({
  result,
  onClose,
  companyCandleMap,
}) {
  // State for existing company selection and chart data
  const [selectedCompany, setSelectedCompany] = useState("All");
  const [candleSeries, setCandleSeries] = useState([]);

  // New state for table filtering and pagination
  const [actionFilter, setActionFilter] = useState("All"); // 'All', 'BUY', or 'SELL'
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);

  if (!result) return null;

  const trades = result.trades ?? [];
  const allSymbols = Array.from(new Set(trades.map((t) => t.symbol)));
  const dropdownOptions = ["All", ...allSymbols];

  // Memoized calculation for trades filtered by company (used for charts and stats)
  const filteredTrades = useMemo(() => {
    if (selectedCompany === "All") return trades;
    return trades.filter((t) => t.symbol === selectedCompany);
  }, [selectedCompany, trades]);

  // Memoized calculation for trades filtered by action (for the table)
  const actionFilteredTrades = useMemo(() => {
    if (actionFilter === "All") {
      return filteredTrades;
    }
    return filteredTrades.filter((trade) => trade.action === actionFilter);
  }, [filteredTrades, actionFilter]);

  // Memoized calculation for paginating the filtered trades (for the table)
  const paginatedTrades = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return actionFilteredTrades.slice(startIndex, endIndex);
  }, [actionFilteredTrades, currentPage, itemsPerPage]);

  // Calculate total pages for pagination controls
  const totalPages = Math.ceil(actionFilteredTrades.length / itemsPerPage);

  // Per-company metrics (driven by company filter, not action filter)
  const initialEquityPerCompany = filteredTrades
    .filter((t) => t.action === "BUY")
    .reduce((sum, t) => sum + (t.totalCostPrice || 0), 0);

  const realizedProfitPerCompany = filteredTrades
    .filter((t) => t.action === "SELL")
    .reduce((sum, t) => sum + (t.realizedProfit || 0), 0);

  const finalEquityPerCompany =
    initialEquityPerCompany + realizedProfitPerCompany;
  const totalTradesPerCompany = filteredTrades.length;

  // Dropdown change handler for company selection
  const handleCompanyChange = (selected) => {
    setSelectedCompany(selected);
    setCurrentPage(1); // Reset to first page on new selection
    if (selected === "All") {
      setCandleSeries([]);
    } else if (companyCandleMap && companyCandleMap[selected]) {
      setCandleSeries(companyCandleMap[selected]);
    }
  };

  // Handler for action filter change
  const handleActionFilterChange = (e) => {
    setActionFilter(e.target.value);
    setCurrentPage(1); // Reset to first page
  };

  // Handler for items per page change
  const handleItemsPerPageChange = (e) => {
    setItemsPerPage(Number(e.target.value));
    setCurrentPage(1); // Reset to first page
  };

  // Chart Options (unchanged)
  const candleOptions = {
    chart: { type: "candlestick", height: 350 },
    title: { text: "CandleStick Chart", align: "left" },
    xaxis: { type: "datetime" },
    yaxis: {
      tooltip: { enabled: true },
      labels: { formatter: (val) => val.toFixed(2) },
    },
  };

  // Merged Chart Series (unchanged)
  const mergedSeries = [
    {
      name: "Closing Balance",
      type: "line",
      data: filteredTrades.map((t) => ({
        x: new Date(t.date).getTime(),
        y: t.closingBalance,
      })),
    },
    {
      name: "Realized Profit",
      type: "column",
      data: filteredTrades.map((t) => ({
        x: new Date(t.date).getTime(),
        y: t.realizedProfit,
      })),
    },
    {
      name: "BUY",
      type: "scatter",
      data: filteredTrades
        .filter((t) => t.action === "BUY")
        .map((t) => ({
          x: new Date(t.date).getTime(),
          y: t.price,
        })),
    },
    {
      name: "SELL",
      type: "scatter",
      data: filteredTrades
        .filter((t) => t.action === "SELL")
        .map((t) => ({
          x: new Date(t.date).getTime(),
          y: t.price,
        })),
    },
  ];

  // Merged Chart Options (unchanged)
  const mergedOptions = {
    chart: {
      height: 400,
      type: "line",
      stacked: false,
      zoom: { enabled: true },
    },
    dataLabels: { enabled: false },
    stroke: { width: [2, 0, 0, 0], curve: "smooth" },
    markers: { size: [0, 0, 6, 6] },
    xaxis: { type: "datetime" },
    yaxis: [
      {
        labels: { formatter: (val) => `₹${val.toFixed(2)}` },
      },
    ],
    plotOptions: {
      bar: {
        columnWidth: "50%",
        colors: {
          ranges: [
            { from: -10000, to: 0, color: "#ef4444" }, // Red for loss
            { from: 0, to: 10000, color: "#22c55e" }, // Green for profit
          ],
        },
      },
    },
    colors: ["#3b82f6", "#10b981", "#6366f1", "#ef4444"],
    title: {
      text: `Combined View${
        selectedCompany !== "All" ? ` for ${selectedCompany}` : ""
      }`,
      align: "left",
    },
    tooltip: {
      shared: true,
      intersect: false,
      x: { format: "dd MMM yyyy" },
    },
  };

  const overallProfit = (result.finalEquity ?? 0) - (result.initialEquity ?? 0);
  const companyProfit = finalEquityPerCompany - initialEquityPerCompany;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
      <div className="relative bg-gradient-to-br from-gray-50 to-gray-100 rounded-2xl shadow-2xl w-full max-w-7xl max-h-[95vh] overflow-y-auto p-6 scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-200">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-800 hover:bg-gray-200 rounded-full p-1 transition-all"
          aria-label="Close"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>

        <h2 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-teal-500 to-cyan-600 mb-6 text-center">
          Simulation Result
        </h2>

        {/* --- Overall Stats --- */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white p-5 rounded-xl shadow-lg flex items-center gap-4 border-l-4 border-blue-500">
            <WalletIcon />
            <div>
              <div className="text-sm text-gray-500">
                Overall Initial Equity
              </div>
              <div className="text-2xl font-bold text-gray-800">
                ₹{result.initialEquity?.toFixed(2) ?? "—"}
              </div>
            </div>
          </div>
          <div
            className={`bg-white p-5 rounded-xl shadow-lg flex items-center gap-4 border-l-4 ${
              overallProfit >= 0 ? "border-green-500" : "border-red-500"
            }`}
          >
            <ChartUpIcon
              className={overallProfit >= 0 ? "text-green-500" : "text-red-500"}
            />
            <div>
              <div className="text-sm text-gray-500">Overall Final Equity</div>
              <div className="text-2xl font-bold text-gray-800">
                ₹{result.finalEquity?.toFixed(2) ?? "—"}
              </div>
            </div>
          </div>
          <div className="bg-white p-5 rounded-xl shadow-lg flex items-center gap-4 border-l-4 border-gray-500">
            <TradeIcon />
            <div>
              <div className="text-sm text-gray-500">Overall Total Trades</div>
              <div className="text-2xl font-bold text-gray-800">
                {result.totalTrades ?? "—"}
              </div>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2 pb-4 mb-6 border-b border-gray-200">
          <label className="text-gray-700 font-medium whitespace-nowrap">
            Company:
          </label>
          <select
            className="border-gray-300 px-3 py-2 rounded-lg shadow-sm focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition"
            value={selectedCompany}
            onChange={(e) => handleCompanyChange(e.target.value)}
          >
            {dropdownOptions.map((symbol) => (
              <option key={symbol} value={symbol}>
                {symbol}
              </option>
            ))}
          </select>
        </div>

        {/* --- Company-Specific Stats --- */}
        {selectedCompany !== "All" && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8 animate-fade-in">
            <div className="bg-white/70 p-4 rounded-xl shadow-md flex items-center gap-4 border-l-4 border-blue-400">
              <WalletIcon />
              <div>
                <div className="text-sm text-gray-500">
                  Initial Equity ({selectedCompany})
                </div>
                <div className="text-xl font-bold text-gray-800">
                  ₹{initialEquityPerCompany.toFixed(2)}
                </div>
              </div>
            </div>
            <div
              className={`bg-white/70 p-4 rounded-xl shadow-md flex items-center gap-4 border-l-4 ${
                companyProfit >= 0 ? "border-green-400" : "border-red-400"
              }`}
            >
              <ChartUpIcon
                className={
                  companyProfit >= 0 ? "text-green-500" : "text-red-500"
                }
              />
              <div>
                <div className="text-sm text-gray-500">
                  Final Equity ({selectedCompany})
                </div>
                <div className="text-xl font-bold text-gray-800">
                  ₹{finalEquityPerCompany.toFixed(2)}
                </div>
              </div>
            </div>
            <div className="bg-white/70 p-4 rounded-xl shadow-md flex items-center gap-4 border-l-4 border-gray-400">
              <TradeIcon />
              <div>
                <div className="text-sm text-gray-500">
                  Total Trades ({selectedCompany})
                </div>
                <div className="text-xl font-bold text-gray-800">
                  {totalTradesPerCompany}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* --- Charts Section --- */}
        <div className="mt-10 bg-white p-6 rounded-xl shadow-lg">
          {/* Candlestick Chart */}
          {selectedCompany !== "All" && candleSeries?.length > 0 && (
            <ReactApexChart
              options={candleOptions}
              series={[{ data: candleSeries }]}
              type="candlestick"
              height={350}
            />
          )}

          {/* Merged Chart */}
          {filteredTrades.length > 0 && (
            <div className="mt-6">
              <ReactApexChart
                options={mergedOptions}
                series={mergedSeries}
                type="line"
                height={400}
              />
            </div>
          )}
        </div>

        {/* --- Trades Table Section --- */}
        <div className="mt-8 mb-8 bg-white p-6 rounded-xl shadow-lg">
          <h3 className="text-xl font-semibold mb-4 text-gray-700">
            Trades Details {selectedCompany !== "All" && `(${selectedCompany})`}
          </h3>

          {/* Filter controls for the table */}
          <div className="flex flex-wrap gap-4 items-center mb-4 pb-4 border-b border-gray-200">
            <div className="flex items-center gap-2">
              <label className="text-gray-700 font-medium">Action:</label>
              <select
                className="border-gray-300 px-3 py-2 rounded-lg shadow-sm focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition"
                value={actionFilter}
                onChange={handleActionFilterChange}
              >
                <option value="All">All</option>
                <option value="BUY">Buy</option>
                <option value="SELL">Sell</option>
              </select>
            </div>
          </div>

          {/* Trades Table */}
          <div className="overflow-x-auto">
            <table className="table-auto w-full text-sm">
              <thead className="bg-gray-100">
                <tr>
                  <th className="p-3 text-left font-semibold text-gray-600">
                    Date
                  </th>
                  <th className="p-3 text-left font-semibold text-gray-600">
                    Action
                  </th>
                  <th className="p-3 text-left font-semibold text-gray-600">
                    Price
                  </th>
                  <th className="p-3 text-left font-semibold text-gray-600">
                    Symbol
                  </th>
                  <th className="p-3 text-left font-semibold text-gray-600">
                    Quantity
                  </th>
                  <th className="p-3 text-left font-semibold text-gray-600">
                    Total Cost
                  </th>
                  <th className="p-3 text-left font-semibold text-gray-600">
                    Opening Balance
                  </th>
                  <th className="p-3 text-left font-semibold text-gray-600">
                    Closing Balance
                  </th>
                  <th className="p-3 text-left font-semibold text-gray-600">
                    NAV
                  </th>
                  <th className="p-3 text-left font-semibold text-gray-600">
                    Realized P/L
                  </th>
                </tr>
              </thead>
              <tbody>
                {paginatedTrades.length > 0 ? (
                  paginatedTrades.map((trade, index) => (
                    <tr
                      key={index}
                      className={`border-t border-gray-200 hover:bg-gray-50 ${
                        trade.realizedProfit < 0 ? "bg-red-50/50" : ""
                      } ${trade.realizedProfit > 0 ? "bg-green-50/50" : ""}`}
                    >
                      <td className="p-3 text-gray-700">{trade.date}</td>
                      <td
                        className={`p-3 font-bold ${
                          trade.action === "BUY"
                            ? "text-green-600"
                            : "text-red-600"
                        }`}
                      >
                        <span
                          className={`px-2 py-1 rounded-full text-xs ${
                            trade.action === "BUY"
                              ? "bg-green-100 text-green-800"
                              : "bg-red-100 text-red-800"
                          }`}
                        >
                          {trade.action}
                        </span>
                      </td>
                      <td className="p-3 text-gray-700">
                        ₹{trade.price?.toFixed(2) ?? "—"}
                      </td>
                      <td className="p-3 text-gray-700">
                        {trade.symbol ?? "—"}
                      </td>
                      <td className="p-3 text-gray-700">
                        {trade.quantity ?? "—"}
                      </td>
                      <td className="p-3 text-gray-700">
                        ₹{trade.totalCostPrice?.toFixed(2) ?? "—"}
                      </td>
                      <td className="p-3 text-gray-700">
                        ₹{trade.openingBalance?.toFixed(2) ?? "—"}
                      </td>
                      <td className="p-3 text-gray-700">
                        ₹{trade.closingBalance?.toFixed(2) ?? "—"}
                      </td>
                      <td className="p-3 text-gray-700">
                        ₹{trade.price?.toFixed(2) ?? "—"}
                      </td>
                      <td
                        className={`p-3 font-bold ${
                          trade.realizedProfit > 0
                            ? "text-green-600"
                            : trade.realizedProfit < 0
                            ? "text-red-600"
                            : "text-gray-600"
                        }`}
                      >
                        {trade.realizedProfit > 0
                          ? "↑ "
                          : trade.realizedProfit < 0
                          ? "↓ "
                          : ""}
                        ₹{trade.realizedProfit?.toFixed(2) ?? "—"}
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td
                      colSpan="10"
                      className="text-center text-gray-500 py-12"
                    >
                      <div className="flex flex-col items-center gap-2">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-12 w-12 text-gray-300"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                          />
                        </svg>
                        <span>No trades match the current filters.</span>
                      </div>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {/* Pagination Controls */}
          <div className="flex flex-wrap justify-between items-center mt-4 pt-4 border-t border-gray-200">
            <div>
              <select
                value={itemsPerPage}
                onChange={handleItemsPerPageChange}
                className="border-gray-300 px-2 py-1 rounded-lg shadow-sm text-sm focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition"
              >
                <option value={5}>5 per page</option>
                <option value={10}>10 per page</option>
                <option value={20}>20 per page</option>
                <option value={50}>50 per page</option>
              </select>
            </div>
            <div className="flex items-center gap-4">
              <span className="text-sm text-gray-600">
                Page {totalPages > 0 ? currentPage : 0} of {totalPages}
              </span>
              <div className="flex gap-2">
                <button
                  onClick={() =>
                    setCurrentPage((prev) => Math.max(prev - 1, 1))
                  }
                  disabled={currentPage === 1}
                  className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg shadow-sm hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  Previous
                </button>
                <button
                  onClick={() =>
                    setCurrentPage((prev) => Math.min(prev + 1, totalPages))
                  }
                  disabled={currentPage === totalPages || totalPages === 0}
                  className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg shadow-sm hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  Next
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
