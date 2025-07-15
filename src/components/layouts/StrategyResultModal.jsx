import React, { useState, useMemo } from "react";
import ReactApexChart from "react-apexcharts";

export default function StrategyResultModal({ result, onClose, companyCandleMap }) {
  const [selectedCompany, setSelectedCompany] = useState("All");
  const [candleSeries, setCandleSeries] = useState([]);

  if (!result) return null;

  const trades = result.trades ?? [];
  const allSymbols = Array.from(new Set(trades.map((t) => t.symbol)));

  const dropdownOptions = ["All", ...allSymbols];

  // Filter trades by selected company
  const filteredTrades = useMemo(() => {
    if (selectedCompany === "All") return trades;
    return trades.filter((t) => t.symbol === selectedCompany);
  }, [selectedCompany, trades]);

  // Per-company metrics
  const initialEquityPerCompany = filteredTrades
    .filter((t) => t.action === "BUY")
    .reduce((sum, t) => sum + (t.totalCostPrice || 0), 0);

  const realizedProfitPerCompany = filteredTrades
    .filter((t) => t.action === "SELL")
    .reduce((sum, t) => sum + (t.realizedProfit || 0), 0);

  const finalEquityPerCompany = initialEquityPerCompany + realizedProfitPerCompany;
  const totalTradesPerCompany = filteredTrades.length;

  // Dropdown change handler
  const handleCompanyChange = (selected) => {
    setSelectedCompany(selected);
    if (selected === "All") {
      setCandleSeries([]);
    } else if (companyCandleMap && companyCandleMap[selected]) {
      setCandleSeries(companyCandleMap[selected]);
    }
  };

  // Chart Options
  const candleOptions = {
    chart: { type: "candlestick", height: 350 },
    title: { text: "CandleStick Chart", align: "left" },
    xaxis: { type: "datetime" },
    yaxis: {
      tooltip: { enabled: true },
      labels: { formatter: (val) => val.toFixed(2) },
    },
  };

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
    yaxis: [{
      labels: { formatter: (val) => `₹${val.toFixed(2)}` },
    }],
    plotOptions: {
      bar: {
        columnWidth: '50%',
        colors: {
          ranges: [
            { from: -10000, to: 0, color: "#f87171" },
            { from: 0, to: 10000, color: "#4ade80" },
          ],
        },
      },
    },
    colors: ["#3b82f6", "#10b981", "#6366f1", "#ef4444"],
    title: {
      text: `Combined View${selectedCompany !== "All" ? ` for ${selectedCompany}` : ""}`,
      align: "left",
    },
    tooltip: {
      shared: true,
      intersect: false,
      x: { format: "dd MMM yyyy" },
    },
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
      <div className="relative bg-white rounded-xl shadow-2xl w-full max-w-5xl max-h-[90vh] overflow-y-auto p-6">
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-500 hover:text-gray-800 text-2xl font-bold"
          aria-label="Close"
        >
          &times;
        </button>

        <h2 className="text-2xl font-bold text-teal-700 mb-6 text-center">
          Simulation Result
        </h2>

        {/* Overall Stats (Always) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <div className="bg-gray-100 p-4 rounded shadow text-center">
            <div className="text-sm text-gray-500">Overall Initial Equity</div>
            <div className="text-lg font-bold text-gray-800">
              ₹{result.initialEquity?.toFixed(2) ?? "—"}
            </div>
          </div>
          <div className="bg-gray-100 p-4 rounded shadow text-center">
            <div className="text-sm text-gray-500">Overall Final Equity</div>
            <div className="text-lg font-bold text-gray-800">
              ₹{result.finalEquity?.toFixed(2) ?? "—"}
            </div>
          </div>
          <div className="bg-gray-100 p-4 rounded shadow text-center">
            <div className="text-sm text-gray-500">Overall Total Trades</div>
            <div className="text-lg font-bold text-gray-800">
              {result.totalTrades ?? "—"}
            </div>
          </div>
        </div>

        {/* Dropdown */}
        <div className="mb-4 flex gap-4 items-center">
          <label className="text-gray-700 font-medium">Select Company:</label>
          <select
            className="border px-4 py-2 rounded-lg shadow-sm"
            value={selectedCompany}
            onChange={(e) => handleCompanyChange(e.target.value)}
          >
            {dropdownOptions.map((symbol) => (
              <option key={symbol} value={symbol}>{symbol}</option>
            ))}
          </select>
        </div>

        {/* Company-Specific Stats */}
        {selectedCompany !== "All" && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
            <div className="bg-gray-100 p-4 rounded shadow text-center">
              <div className="text-sm text-gray-500">Initial Equity ({selectedCompany})</div>
              <div className="text-lg font-bold text-gray-800">
                ₹{initialEquityPerCompany.toFixed(2)}
              </div>
            </div>
            <div className="bg-gray-100 p-4 rounded shadow text-center">
              <div className="text-sm text-gray-500">Final Equity ({selectedCompany})</div>
              <div className="text-lg font-bold text-gray-800">
                ₹{finalEquityPerCompany.toFixed(2)}
              </div>
            </div>
            <div className="bg-gray-100 p-4 rounded shadow text-center">
              <div className="text-sm text-gray-500">Total Trades ({selectedCompany})</div>
              <div className="text-lg font-bold text-gray-800">
                {totalTradesPerCompany}
              </div>
            </div>
          </div>
        )}

        {/* Candlestick Chart */}
        {selectedCompany !== "All" && candleSeries?.length > 0 && (
          <ReactApexChart
            options={candleOptions}
            series={candleSeries}
            type="candlestick"
            height={350}
          />
        )}

        {/* Merged Chart */}
        {filteredTrades.length > 0 && (
          <div className="mt-10">
            <ReactApexChart
              options={mergedOptions}
              series={mergedSeries}
              type="line"
              height={400}
            />
          </div>
        )}

        {/* Trades Table */}
        <h3 className="text-lg font-semibold mt-8 mb-4">
          Trades Table {selectedCompany !== "All" && `(${selectedCompany})`}
        </h3>
        <div className="overflow-x-auto border rounded-lg shadow">
          <table className="table-auto w-full text-sm border">
            <thead className="bg-gray-100">
              <tr>
                <th className="p-2">Date</th>
                <th className="p-2">Action</th>
                <th className="p-2">Price</th>
                <th className="p-2">Symbol</th>
                <th className="p-2">Quantity</th>
                <th className="p-2">Total Cost</th>
                <th className="p-2">Opening Balance</th>
                <th className="p-2">Closing Balance</th>
                <th className="p-2">NAV</th>
                <th className="p-2">Realized Profit</th>
              </tr>
            </thead>
            <tbody>
              {filteredTrades.length ? (
                filteredTrades.map((trade, index) => (
                  <tr key={index} className="text-center">
                    <td className="p-2">{trade.date}</td>
                    <td className={`p-2 font-bold ${trade.action === "BUY" ? "text-green-600" : "text-red-600"}`}>
                      {trade.action}
                    </td>
                    <td className="p-2">₹{trade.price?.toFixed(2) ?? "—"}</td>
                    <td className="p-2">{trade.symbol ?? "—"}</td>
                    <td className="p-2">{trade.quantity ?? "—"}</td>
                    <td className="p-2">₹{trade.totalCostPrice?.toFixed(2) ?? "—"}</td>
                    <td className="p-2">₹{trade.openingBalance?.toFixed(2) ?? "—"}</td>
                    <td className="p-2">₹{trade.closingBalance?.toFixed(2) ?? "—"}</td>
                    <td className="p-2">₹{trade.price?.toFixed(2) ?? "—"}</td>
                    <td className={`p-2 font-bold ${trade.realizedProfit > 0 ? "text-green-600" : trade.realizedProfit < 0 ? "text-red-600" : "text-gray-600"}`}>
                      ₹{trade.realizedProfit?.toFixed(2) ?? "—"}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="10" className="text-center text-gray-400 py-4">
                    No trades available.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
