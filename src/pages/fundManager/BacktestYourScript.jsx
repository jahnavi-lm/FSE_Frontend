import { useState } from "react";
import axios from "axios";
import ReactApexChart from "react-apexcharts";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  Legend,
} from "recharts";
import CodeMirror from "@uiw/react-codemirror";
import { javascript } from "@codemirror/lang-javascript";

export default function StrategyBacktestApp() {
  const [form, setForm] = useState({
    strategyName: "",
    strategyScript: "",
    symbol: "",
    startDate: "",
    endDate: "",
  });

  const [result, setResult] = useState(null);
  const [candleSeries, setCandleSeries] = useState([]);
  const [candleOptions, setCandleOptions] = useState({
    chart: {
      type: "candlestick",
      height: 350,
    },
    title: {
      text: "CandleStick Chart",
      align: "left",
    },
    xaxis: {
      type: "datetime",
    },
    yaxis: {
      tooltip: {
        enabled: true,
      },
      labels: {
        formatter: function (val) {
          return val.toFixed(2);
        },
      },
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
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    try {
      const [backtestResponse, candleResponse] = await Promise.all([
        axios.post("http://localhost:8080/api/backtest", form),
        axios.post("http://localhost:8080/api/backtest/candles", form),
      ]);

      setResult(backtestResponse.data);

      const formattedCandles = Array.from(
        new Map(
          candleResponse.data.data.map((d) => [
            d.x,
            { x: new Date(d.x), y: d.y },
          ])
        ).values()
      );

      setCandleSeries([{ data: formattedCandles }]);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="bg-blue-50 border border-blue-200 p-6 rounded-xl shadow-inner">
      <div className="flex flex-col lg:flex-row gap-6">
        <div className="w-full  mx-auto p-8 ">
          <h1 className="text-3xl font-bold text-blue-700 text-center mb-2 tracking-tight">
            Backtest your Strategy
          </h1>
          <p className="text-center text-gray-500 mb-8 text-base">
            Test your trading strategies with historical data. Write or paste
            your script below and see the results instantly.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-left">
            <div className="flex flex-col gap-4 text-left">
              <label
                className="text-sm font-medium text-gray-700"
                htmlFor="strategyName"
              >
                Strategy Name
              </label>
              <input
                className="border border-gray-300 focus:border-blue-500 p-2 rounded-lg bg-white shadow-sm focus:outline-none text-base transition-all duration-150 focus:shadow-md"
                type="text"
                name="strategyName"
                id="strategyName"
                placeholder="Strategy Name"
                value={form.strategyName}
                onChange={handleChange}
              />
              <label
                className="text-sm font-medium text-gray-700"
                htmlFor="symbol"
              >
                Symbol
              </label>
              <input
                className="border border-gray-300 focus:border-blue-500 p-2 rounded-lg bg-white shadow-sm focus:outline-none text-base transition-all duration-150 focus:shadow-md"
                type="text"
                name="symbol"
                id="symbol"
                placeholder="Symbol (e.g., INFY)"
                value={form.symbol}
                onChange={handleChange}
              />
              <label
                className="text-sm font-medium text-gray-700"
                htmlFor="startDate"
              >
                Start Date
              </label>
              <input
                className="border border-gray-300 focus:border-blue-500 p-2 rounded-lg bg-white shadow-sm focus:outline-none text-base transition-all duration-150 focus:shadow-md"
                type="date"
                name="startDate"
                id="startDate"
                value={form.startDate}
                onChange={handleChange}
              />
              <label
                className="text-sm font-medium text-gray-700"
                htmlFor="endDate"
              >
                End Date
              </label>
              <input
                className="border border-gray-300 focus:border-blue-500 p-2 rounded-lg bg-white shadow-sm focus:outline-none text-base transition-all duration-150 focus:shadow-md"
                type="date"
                name="endDate"
                id="endDate"
                value={form.endDate}
                onChange={handleChange}
              />
            </div>

            <div className="flex flex-col gap-4 text-left">
              <label
                className="text-sm font-medium text-gray-700"
                htmlFor="strategyScript"
              >
                Strategy Script
              </label>
              <div className="h-48 border border-gray-300 rounded-lg overflow-hidden focus-within:border-blue-500 focus-within:shadow-md transition-all duration-150 bg-gray-50">
                <CodeMirror
                  value={form.strategyScript}
                  height="100%"
                  theme="light"
                  extensions={[javascript()]}
                  onChange={(value) =>
                    setForm((f) => ({ ...f, strategyScript: value }))
                  }
                  basicSetup={{ lineNumbers: true, highlightActiveLine: true }}
                  placeholder="Write your strategy script here..."
                  style={{
                    fontSize: 15,
                    background: "transparent",
                    minHeight: "100%",
                    textAlign: "left",
                    fontFamily: "monospace",
                  }}
                />
              </div>
              <button
                className="bg-blue-600 text-white font-semibold px-6 py-2 rounded-lg shadow hover:bg-blue-700 hover:scale-105 transition-all duration-200 mt-4 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2"
                onClick={handleSubmit}
              >
                Run Backtest
              </button>
            </div>
          </div>

          {candleSeries.length > 0 && (
            <div className="mt-10">
              <h2 className="text-xl font-bold mb-4 text-gray-700">
                Backtest Summary
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
                <div className="bg-gray-100 p-4 rounded-lg shadow flex flex-col items-center">
                  <span className="text-sm text-gray-500">Initial Equity</span>
                  <span className="text-lg font-bold text-gray-800">
                    ₹{result.initialEquity.toFixed(2)}
                  </span>
                </div>
                <div className="bg-gray-100 p-4 rounded-lg shadow flex flex-col items-center">
                  <span className="text-sm text-gray-500">Final Equity</span>
                  <span className="text-lg font-bold text-gray-800">
                    ₹{result.finalEquity.toFixed(2)}
                  </span>
                </div>
                <div className="bg-gray-100 p-4 rounded-lg shadow flex flex-col items-center">
                  <span className="text-sm text-gray-500">Total Trades</span>
                  <span className="text-lg font-bold text-gray-800">
                    {result.totalTrades}
                  </span>
                </div>
              </div>
              <h3 className="text-lg font-semibold mt-8 mb-2 text-gray-700">
                Candlestick Chart
              </h3>
              <div className="bg-white rounded-lg shadow p-4">
                <ReactApexChart
                  options={candleOptions}
                  series={candleSeries}
                  type="candlestick"
                  height={350}
                />
              </div>
            </div>
          )}

          {result && (
            <div className="mt-10">
              <h3 className="text-lg font-semibold mt-8 mb-2 text-gray-700">
                Buy/Sell Price Graph
              </h3>
              <div className="bg-white rounded-lg shadow p-4 overflow-x-auto flex justify-center">
                <LineChart
                  width={900}
                  height={450}
                  fontSize="small"
                  data={result.trades.map((t) => ({
                    date: t.date,
                    price: t.price,
                    action: t.action,
                  }))}
                  margin={{ top: 20, right: 30, left: 0, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis
                    dataKey="date"
                    tickFormatter={(value) =>
                      new Date(value).toLocaleDateString()
                    }
                  />
                  <YAxis tickFormatter={(value) => value.toFixed(2)} />
                  <Tooltip
                    formatter={(value) => value.toFixed(2)}
                    labelFormatter={(label) => `Date: ${label}`}
                  />
                  <Legend />
                  <Line
                    type="monotone"
                    dataKey="price"
                    stroke="#2563eb"
                    dot={{ r: 5, stroke: "#2563eb", strokeWidth: 2 }}
                  />
                </LineChart>
              </div>

              <h3 className="text-lg font-semibold mt-8 mb-2 text-gray-700">
                Trades Table
              </h3>
              <div className="overflow-x-auto mt-2 bg-white rounded-lg shadow p-4">
                <table className="w-full table-auto text-left border border-gray-200 rounded-lg overflow-hidden text-sm">
                  <thead className="bg-gray-100">
                    <tr>
                      <th className="px-4 py-2">Date</th>
                      <th className="px-4 py-2">Action</th>
                      <th className="px-4 py-2">Price</th>
                      <th className="px-4 py-2">Symbol</th>
                      <th className="px-4 py-2">Quantity</th>
                      <th className="px-4 py-2">Total Cost</th>
                      <th className="px-4 py-2">Opening Balance</th>
                      <th className="px-4 py-2">Closing Balance</th>
                      <th className="px-4 py-2">NAV</th>
                      <th className="px-4 py-2">Realized Profit</th>
                    </tr>
                  </thead>
                  <tbody>
                    {result.trades.map((trade, index) => (
                      <tr
                        key={index}
                        className="border-t border-gray-100 hover:bg-blue-50 transition-all"
                      >
                        <td className="px-4 py-2">{trade.date}</td>
                        <td
                          className={`px-4 py-2 font-bold ${
                            trade.action === "BUY"
                              ? "text-green-600"
                              : "text-red-600"
                          }`}
                        >
                          {trade.action}
                        </td>
                        <td className="px-4 py-2">₹{trade.price.toFixed(2)}</td>
                        <td className="px-4 py-2">{trade.symbol || "—"}</td>
                        <td className="px-4 py-2">{trade.quantity}</td>
                        <td className="px-4 py-2">
                          ₹{trade.totalCostPrice.toFixed(2)}
                        </td>
                        <td className="px-4 py-2">
                          ₹{trade.openingBalance.toFixed(2)}
                        </td>
                        <td className="px-4 py-2">
                          ₹{trade.closingBalance.toFixed(2)}
                        </td>
                        <td className="px-4 py-2">₹{trade.price.toFixed(2)}</td>
                        <td
                          className={`px-4 py-2 font-bold ${
                            trade.realizedProfit > 0
                              ? "text-green-600"
                              : trade.realizedProfit < 0
                              ? "text-red-600"
                              : "text-gray-600"
                          }`}
                        >
                          ₹{trade.realizedProfit.toFixed(2)}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
