import React, { useEffect, useRef, useState, useMemo } from "react";
import { useSelector, useDispatch } from "react-redux";
import ReactApexChart from "react-apexcharts";
import CodeMirror from "@uiw/react-codemirror";
import { javascript } from "@codemirror/lang-javascript";
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";
import { FiInfo } from "react-icons/fi";
import {
  updateFormField,
  toggleDropdown,
  closeDropdown,
  toggleSymbolSelection,
  removeSymbol,
  updateScript,
  setSelectedCompanyForChart,
  runBacktest,
  saveBacktestStrategy,
  resetBacktest,
} from "../../features/backtest/backtestSlice";
import StrategyDocsModal from "../../components/Dashboard/StrategyDocsModal";

const INDICES = ["NIFTY 50", "NIFTY NEXT 50"];
const COMPANIES = [
  "HDFCBANK.NS", "ICICIBANK.NS", "RELIANCE.NS", "TCS.NS", "BHARTIARTL.NS", "INFY.NS", "BAJFINANCE.NS", "HINDUNILVR.NS",
  "ITC.NS", "LT.NS", "HCLTECH.NS", "KOTAKBANK.NS", "ULTRACEMCO.NS", "AXISBANK.NS", "TITAN.NS", "NTPC.NS",
  "ASIANPAINT.NS", "NESTLEIND.NS", "SBIN.NS", "SUNPHARMA.NS", "MARUTI.NS", "M&M.NS", "JSWSTEEL.NS", "TATAMOTORS.NS",
  "TATASTEEL.NS", "TECHM.NS", "WIPRO.NS", "ADANIENT.NS", "ADANIPORTS.NS", "COALINDIA.NS", "POWERGRID.NS", "DRREDDY.NS",
  "CIPLA.NS", "EICHERMOT.NS", "HEROMOTOCO.NS", "HINDALCO.NS", "INDUSINDBK.NS", "SHREECEM.NS", "BPCL.NS", "ONGC.NS",
  "GRASIM.NS", "IOC.NS", "HDFCLIFE.NS", "SBILIFE.NS", "BAJAJ-AUTO.NS", "BAJAJFINSV.NS", "BRITANNIA.NS", "HDFC.NS",
  "UPL.NS", "BOSCHLTD.NS", "ABB.NS", "APOLLOHOSP.NS", "AMBUJACEM.NS", "ADANIGREEN.NS", "BIOCON.NS", "BEL.NS",
  "BANKBARODA.NS", "BANDHANBNK.NS", "CANBK.NS", "CHOLAFIN.NS", "COLPAL.NS", "DABUR.NS", "DLF.NS", "GODREJCP.NS",
  "GAIL.NS", "HAVELLS.NS", "ICICIPRULI.NS", "INDIGO.NS", "LTIM.NS", "LTTS.NS", "L&TFH.NS", "LICI.NS", "MCDOWELL-N.NS",
  "MFSL.NS", "MUTHOOTFIN.NS", "NAUKRI.NS", "NHPC.NS", "NMDC.NS", "OFSS.NS", "PAGEIND.NS", "PETRONET.NS", "PIDILITIND.NS",
  "PIIND.NS", "PFC.NS", "RECLTD.NS", "SAIL.NS", "SIEMENS.NS", "SRF.NS", "TORNTPHARM.NS", "TRENT.NS", "TVSMOTOR.NS",
  "UBL.NS", "VOLTAS.NS", "ZYDUSLIFE.NS", "AUROPHARMA.NS", "ALKEM.NS", "INDUSTOWER.NS", "IOCL.NS", "JINDALSTEL.NS"
];

const TradesTable = ({ trades }) => {
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const [actionFilter, setActionFilter] = useState('All');

    const filteredTrades = useMemo(() => {
        if (actionFilter === 'All') return trades;
        return trades.filter(trade => trade.action === actionFilter);
    }, [trades, actionFilter]);

    const paginatedTrades = useMemo(() => {
        return filteredTrades.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);
    }, [filteredTrades, page, rowsPerPage]);

    const totalPages = Math.ceil(filteredTrades.length / rowsPerPage);

    useEffect(() => {
        setPage(0);
    }, [actionFilter, rowsPerPage]);

    return (
        <div>
            <div className="flex justify-between items-center mb-4">
                <div className="flex items-center gap-2">
                    <label className="text-sm font-medium">Filter by Action:</label>
                    <select value={actionFilter} onChange={(e) => setActionFilter(e.target.value)} className="p-2 border rounded">
                        <option value="All">All</option>
                        <option value="BUY">BUY</option>
                        <option value="SELL">SELL</option>
                    </select>
                </div>
            </div>
            <div className="overflow-x-auto">
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
                        {paginatedTrades.map((trade, index) => (
                            <tr key={index} className="text-center">
                                <td className="p-2">{new Date(trade.date).toLocaleDateString()}</td>
                                <td className={`p-2 font-bold ${trade.action === "BUY" ? "text-green-600" : "text-red-600"}`}>
                                    {trade.action}
                                </td>
                                <td className="p-2">₹{trade.price.toFixed(2)}</td>
                                <td className="p-2">{trade.symbol || "—"}</td>
                                <td className="p-2">{trade.quantity}</td>
                                <td className="p-2">₹{trade.totalCostPrice.toFixed(2)}</td>
                                <td className="p-2">₹{trade.openingBalance.toFixed(2)}</td>
                                <td className="p-2">₹{trade.closingBalance.toFixed(2)}</td>
                                <td className="p-2">₹{trade.price.toFixed(2)}</td>
                                <td className={`p-2 font-bold ${trade.realizedProfit > 0 ? "text-green-600" : trade.realizedProfit < 0 ? "text-red-600" : "text-gray-600"}`}>
                                    ₹{trade.realizedProfit.toFixed(2)}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <div className="flex justify-between items-center mt-4">
                <select value={rowsPerPage} onChange={(e) => setRowsPerPage(Number(e.target.value))} className="p-2 border rounded">
                    {[5, 10, 20].map(size => <option key={size} value={size}>Show {size}</option>)}
                </select>
                <div className="flex items-center gap-4">
                    <span className="text-sm">Page {page + 1} of {totalPages}</span>
                    <button onClick={() => setPage(p => Math.max(0, p - 1))} disabled={page === 0} className="p-2 border rounded mr-2">Previous</button>
                    <button onClick={() => setPage(p => Math.min(p + 1, totalPages - 1))} disabled={page >= totalPages - 1} className="p-2 border rounded">Next</button>
                </div>
            </div>
        </div>
    );
};

export default function StrategyBacktestApp() {
  const dispatch = useDispatch();
  const dropdownRef = useRef(null);
  const [showDocsModal, setShowDocsModal] = useState(false);
  const {
    form,
    dropdownVisible,
    result,
    candleSeries,
    companyCandleMap,
    selectedCompanyForChart,
  } = useSelector((state) => state.backtest);

  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        dispatch(closeDropdown());
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [dropdownRef, dispatch]);

  const candleOptions = {
    chart: { type: "candlestick", height: 350 },
    title: { text: "CandleStick Chart", align: "left" },
    xaxis: { type: "datetime" },
    yaxis: {
      tooltip: { enabled: true },
      labels: { formatter: (val) => val.toFixed(2) },
    },
    tooltip: {
      custom: function ({ series, seriesIndex, dataPointIndex, w }) {
        const ohlc =
          w.globals.initialSeries[seriesIndex].data[dataPointIndex].y;
        const x = w.globals.initialSeries[seriesIndex].data[dataPointIndex].x;
        return `
          <div style="padding: 10px; font-size: 13px;">
            <b>${new Date(x).toLocaleDateString()}</b><br/>
            <span>Open: ₹${ohlc[0].toFixed(2)}</span><br/>
            <span>High: ₹${ohlc[1].toFixed(2)}</span><br/>
            <span>Low: ₹${ohlc[2].toFixed(2)}</span><br/>
            <span>Close: ₹${ohlc[3].toFixed(2)}</span>
          </div>
        `;
      },
    },
  };
  
  const mergedSeries = useMemo(() => {
    if (!result) return [];
    
    const filteredTrades = result.trades.filter(t => selectedCompanyForChart === 'All' || t.symbol === selectedCompanyForChart);

    return [
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
  }, [result, selectedCompanyForChart])

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
      text: `Combined View${selectedCompanyForChart !== "All" ? ` for ${selectedCompanyForChart}` : ""}`,
      align: "left",
    },
    tooltip: {
      shared: true,
      intersect: false,
      x: { format: "dd MMM yyyy" },
    },
  };

  const handleChange = (e) => {
    dispatch(updateFormField({ name: e.target.name, value: e.target.value }));
  };

  const handleToggleSymbol = (symbol) => {
    dispatch(toggleSymbolSelection(symbol));
  };

  const handleRemoveSymbol = (symbol) => {
    dispatch(removeSymbol(symbol));
  };

  const handleScriptChange = (value) => {
    dispatch(updateScript(value));
  };

  const handleSubmit = () => {
    dispatch(runBacktest(form));
  };

  const handleSaveStrategy = () => {
    dispatch(saveBacktestStrategy(form));
  };

  const handleReset = () => {
    dispatch(resetBacktest());
  };

  return (
    <>
      {showDocsModal && <StrategyDocsModal onClose={() => setShowDocsModal(false)} />}
      <div className="bg-blue-50 border border-blue-200 p-6 rounded-xl shadow-inner">
        <div className="flex flex-col lg:flex-row gap-6">
          <div className="w-full mx-auto p-8">
            <h1 className="text-3xl font-bold text-blue-700 text-center mb-2">
              Backtest your Strategy
            </h1>
            <p className="text-center text-gray-500 mb-8">
              Test your trading strategies with historical data.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 p-6 bg-blue-50 rounded-xl shadow-lg">
              {/* LEFT SECTION */}
              <div className="flex flex-col gap-6">
                {/* Strategy Name */}
                <div>
                  <label className="block text-sm font-semibold text-gray-800 mb-1">
                    Strategy Name
                  </label>
                  <input
                    type="text"
                    name="strategyName"
                    value={form.strategyName}
                    onChange={handleChange}
                    placeholder="Enter strategy name"
                    className="w-full border border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-blue-400 focus:outline-none shadow-sm bg-white"
                  />
                </div>

                {/* Initial Capital */}
                <div>
                  <label className="block text-sm font-semibold text-gray-800 mb-1">
                    Initial Capital
                  </label>
                  <input
                    type="number"
                    name="initialCapital"
                    value={form.initialCapital}
                    onChange={handleChange}
                    placeholder="e.g., 500000"
                    className="w-full border border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-blue-400 focus:outline-none shadow-sm bg-white"
                  />
                </div>
              </div>

              {/* RIGHT SECTION */}
              <div className="flex flex-col gap-6">
                {/* Date Fields */}
                <div className="flex flex-col md:flex-row gap-6">
                  <div className="flex-1">
                    <label className="block text-sm font-semibold text-gray-800 mb-1">
                      Start Date
                    </label>
                    <input
                      type="date"
                      name="startDate"
                      value={form.startDate}
                      onChange={handleChange}
                      className="w-full border border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-blue-400 focus:outline-none shadow-sm bg-white"
                    />
                  </div>
                  <div className="flex-1">
                    <label className="block text-sm font-semibold text-gray-800 mb-1">
                      End Date
                    </label>
                    <input
                      type="date"
                      name="endDate"
                      value={form.endDate}
                      onChange={handleChange}
                      className="w-full border border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-blue-400 focus:outline-none shadow-sm bg-white"
                    />
                  </div>
                </div>

                {/* Symbol Selector */}
                <div className="relative" ref={dropdownRef}>
                  <label className="block text-sm font-semibold text-gray-800 mb-1">
                    Select Symbols
                  </label>
                  <div
                    className="border border-gray-300 p-2 rounded-md bg-white cursor-pointer shadow-sm hover:border-blue-400 transition-all"
                    onClick={() => dispatch(toggleDropdown())}
                  >
                    {form.symbolList.length > 0
                      ? `${form.symbolList.length} selected`
                      : "Click to Select..."}
                  </div>

                  {dropdownVisible && (
                    <div className="absolute mt-2 w-full border border-gray-300 rounded-md shadow-md p-3 bg-white z-20 max-h-64 overflow-y-auto space-y-2">
                      <div>
                        <p className="font-semibold text-gray-600">Indices</p>
                        {INDICES.map((symbol) => (
                          <label
                            key={symbol}
                            className="flex items-center space-x-2 hover:bg-blue-50 p-1 rounded"
                          >
                            <input
                              type="checkbox"
                              checked={form.symbolList.includes(symbol)}
                              onChange={() => handleToggleSymbol(symbol)}
                            />
                            <span>{symbol}</span>
                          </label>
                        ))}
                      </div>
                      <div className="mt-2">
                        <p className="font-semibold text-gray-600">Stocks</p>
                        {COMPANIES.map((symbol) => (
                          <label
                            key={symbol}
                            className="flex items-center space-x-2 hover:bg-blue-50 p-1 rounded"
                          >
                            <input
                              type="checkbox"
                              checked={form.symbolList.includes(symbol)}
                              onChange={() => handleToggleSymbol(symbol)}
                            />
                            <span>{symbol}</span>
                          </label>
                        ))}
                      </div>
                    </div>
                  )}
                  <div className="flex flex-wrap gap-2 mt-2">
                    {form.symbolList.map((symbol) => (
                      <span
                        key={symbol}
                        className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm flex items-center"
                      >
                        {symbol}
                        <button
                          className="ml-2 text-red-600 hover:text-red-800"
                          onClick={() => handleRemoveSymbol(symbol)}
                        >
                          ×
                        </button>
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* STRATEGY SCRIPT FULL WIDTH */}
              <div className="md:col-span-2 flex flex-col gap-4 mt-4">
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-2">
                    <label className="text-sm font-semibold text-gray-800">
                      Strategy Script
                    </label>
                    <button onClick={() => setShowDocsModal(true)} className="text-blue-500 hover:text-blue-700">
                        <FiInfo size={16} />
                    </button>
                  </div>
                  <div className="flex gap-3">
                    <button
                      type="button"
                      onClick={handleReset}
                      className="bg-red-600 text-white text-sm font-medium px-4 py-1.5 rounded hover:bg-red-700 transition"
                    >
                      Reset
                    </button>
                    <button
                      type="button"
                      onClick={handleSaveStrategy}
                      className="bg-green-600 text-white text-sm font-medium px-4 py-1.5 rounded hover:bg-green-700 transition"
                    >
                      Save
                    </button>
                  </div>
                </div>

                <div className="h-48 border border-gray-300 rounded-md overflow-hidden bg-white shadow-sm">
                  <CodeMirror
                    value={form.strategyScript}
                    height="100%"
                    theme="light"
                    extensions={[javascript()]}
                    onChange={handleScriptChange}
                    basicSetup={{ lineNumbers: true }}
                  />
                </div>

                <button
                  type="button"
                  className="bg-blue-600 text-white font-semibold px-6 py-2 rounded-md mt-2 hover:bg-blue-700 transition self-start"
                  onClick={handleSubmit}
                >
                  Run Backtest
                </button>
              </div>
            </div>
            {result && (
              <div className="mt-10 bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-base font-semibold text-gray-700">
                    📈 Equity Over Time
                  </h3>
                </div>
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart
                    data={result.trades.map((trade) => ({
                      date: new Date(trade.date).getTime(),
                      equity: trade.closingBalance,
                    }))}
                    margin={{ top: 5, right: 20, bottom: 5, left: 0 }}
                  >
                    <XAxis dataKey="date" tickFormatter={(timeStr) => new Date(timeStr).toLocaleDateString()} tick={{ fontSize: 12 }} />
                    <YAxis
                      tick={{ fontSize: 12 }}
                      tickFormatter={(val) => `₹${val.toFixed(0)}`}
                    />
                    <Tooltip
                      formatter={(value) => [`₹${value.toFixed(2)}`, "Equity"]}
                      labelFormatter={(timeStr) => new Date(timeStr).toLocaleDateString()}
                      contentStyle={{ fontSize: "12px" }}
                    />
                    <Line
                      type="monotone"
                      dataKey="equity"
                      stroke="#14b8a6"
                      strokeWidth={2}
                      activeDot={{ r: 4 }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            )}

            {result && (
              <div className="mt-10">
                <h2 className="text-xl font-bold mb-4">Backtest Summary</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
                  <div className="bg-gray-100 p-4 rounded shadow text-center">
                    <div className="text-sm text-gray-500">Initial Equity</div>
                    <div className="text-lg font-bold text-gray-800">
                      ₹{result.initialEquity.toFixed(2)}
                    </div>
                  </div>
                  <div className="bg-gray-100 p-4 rounded shadow text-center">
                    <div className="text-sm text-gray-500">Final Equity</div>
                    <div className="text-lg font-bold text-gray-800">
                      ₹{result.finalEquity.toFixed(2)}
                    </div>
                  </div>
                  <div className="bg-gray-100 p-4 rounded shadow text-center">
                    <div className="text-sm text-gray-500">Total Trades</div>
                    <div className="text-lg font-bold text-gray-800">
                      {result.totalTrades}
                    </div>
                  </div>
                </div>

                {Object.keys(companyCandleMap).length > 0 && (
                  <div className="mb-4 flex gap-4 items-center">
                    <label className="text-gray-700 font-medium">
                      Select Company to View Chart:
                    </label>
                    <select
                      className="border px-4 py-2 rounded-lg shadow-sm"
                      value={selectedCompanyForChart}
                      onChange={(e) =>
                        dispatch(setSelectedCompanyForChart(e.target.value))
                      }
                    >
                      <option value="All">All</option>
                      {Object.keys(companyCandleMap).map((symbol) => (
                        <option key={symbol} value={symbol}>
                          {symbol}
                        </option>
                      ))}
                    </select>
                  </div>
                )}
                  
                {selectedCompanyForChart !== "All" && candleSeries.length > 0 && 
                  <ReactApexChart
                      options={candleOptions}
                      series={JSON.parse(JSON.stringify(candleSeries))}
                      type="candlestick"
                      height={350}
                  />
                }

                {result.trades.length > 0 && (
                    <div className="mt-10">
                      <ReactApexChart
                        options={mergedOptions}
                        series={JSON.parse(JSON.stringify(mergedSeries))}
                        type="line"
                        height={400}
                      />
                    </div>
                  )}

                <h3 className="text-lg font-semibold mt-8 mb-2">Trades Table</h3>
                <TradesTable trades={result.trades} />
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}