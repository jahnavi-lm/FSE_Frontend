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
    symbolList: [],
    startDate: "",
    endDate: "",
    initialCapital: 500000,
  });

  const [result, setResult] = useState(null);
  const [candleSeries, setCandleSeries] = useState([]);
  const [candleOptions, setCandleOptions] = useState({
    chart: { type: "candlestick", height: 350 },
    title: { text: "CandleStick Chart", align: "left" },
    xaxis: { type: "datetime" },
    yaxis: {
      tooltip: { enabled: true },
      labels: {
        formatter: (val) => val.toFixed(2),
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
    const { name, value } = e.target;
    if (name === "symbolList") {
      const list = value
        .split(",")
        .map((s) => s.trim())
        .filter((s) => s);
      setForm((prev) => ({ ...prev, symbolList: list }));
    } else {
      setForm((prev) => ({ ...prev, [name]: value }));
    }
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
        <div className="w-full mx-auto p-8">
          <h1 className="text-3xl font-bold text-blue-700 text-center mb-2">
            Backtest your Strategy
          </h1>
          <p className="text-center text-gray-500 mb-8">
            Test your trading strategies with historical data.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="flex flex-col gap-4">
              <label className="text-sm font-medium text-gray-700">
                Strategy Name
              </label>
              <input
                className="border p-2 rounded-lg shadow-sm"
                type="text"
                name="strategyName"
                placeholder="Strategy Name"
                value={form.strategyName}
                onChange={handleChange}
              />

              <label className="text-sm font-medium text-gray-700">
                Symbol List (comma-separated)
              </label>
              <input
                className="border p-2 rounded-lg shadow-sm"
                type="text"
                name="symbolList"
                placeholder="e.g., INFY.NS, TCS.NS, RELIANCE.NS"
                value={form.symbolList.join(", ")}
                onChange={handleChange}
              />

              <label className="text-sm font-medium text-gray-700">
                Start Date
              </label>
              <input
                className="border p-2 rounded-lg shadow-sm"
                type="date"
                name="startDate"
                value={form.startDate}
                onChange={handleChange}
              />

              <label className="text-sm font-medium text-gray-700">
                End Date
              </label>
              <input
                className="border p-2 rounded-lg shadow-sm"
                type="date"
                name="endDate"
                value={form.endDate}
                onChange={handleChange}
              />
            </div>

            <div className="flex flex-col gap-4">
              <label className="text-sm font-medium text-gray-700">
                Strategy Script
              </label>
              <div className="h-48 border rounded-lg overflow-hidden bg-gray-50">
                <CodeMirror
                  value={form.strategyScript}
                  height="100%"
                  theme="light"
                  extensions={[javascript()]}
                  onChange={(value) =>
                    setForm((f) => ({ ...f, strategyScript: value }))
                  }
                  basicSetup={{ lineNumbers: true }}
                />
              </div>
              <button
                className="bg-blue-600 text-white font-semibold px-6 py-2 rounded-lg mt-4 hover:bg-blue-700 transition-all"
                onClick={handleSubmit}
              >
                Run Backtest
              </button>
            </div>
          </div>

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

              <ReactApexChart
                options={candleOptions}
                series={candleSeries}
                type="candlestick"
                height={350}
              />

              <h3 className="text-lg font-semibold mt-8 mb-2">Trades Table</h3>
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
                    {result.trades.map((trade, index) => (
                      <tr key={index} className="text-center">
                        <td className="p-2">{trade.date}</td>
                        <td
                          className={`p-2 font-bold ${
                            trade.action === "BUY"
                              ? "text-green-600"
                              : "text-red-600"
                          }`}
                        >
                          {trade.action}
                        </td>
                        <td className="p-2">₹{trade.price.toFixed(2)}</td>
                        <td className="p-2">{trade.symbol || "—"}</td>
                        <td className="p-2">{trade.quantity}</td>
                        <td className="p-2">₹{trade.totalCostPrice.toFixed(2)}</td>
                        <td className="p-2">₹{trade.openingBalance.toFixed(2)}</td>
                        <td className="p-2">₹{trade.closingBalance.toFixed(2)}</td>
                        <td className="p-2">₹{trade.price.toFixed(2)}</td>
                        <td
                          className={`p-2 font-bold ${
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
