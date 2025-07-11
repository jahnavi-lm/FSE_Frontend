import { useState } from "react";
import axios from "axios";
import ReactApexChart from "react-apexcharts";
import CodeMirror from "@uiw/react-codemirror";
import { javascript } from "@codemirror/lang-javascript";
import toast from "react-hot-toast"; // ✅ Imported toast

const INDICES = ["NIFTY 50", "NIFTY NEXT 50"];
const COMPANIES = [
  "HDFCBANK.NS", "ICICIBANK.NS", "RELIANCE.NS", "TCS.NS", "BHARTIARTL.NS", "INFY.NS",
  "BAJFINANCE.NS", "HINDUNILVR.NS", "ITC.NS", "LT.NS", "HCLTECH.NS", "KOTAKBANK.NS",
  "ULTRACEMCO.NS", "AXISBANK.NS", "TITAN.NS", "NTPC.NS", "ASIANPAINT.NS", "NESTLEIND.NS",
  "SBIN.NS", "SUNPHARMA.NS", "MARUTI.NS", "M&M.NS", "JSWSTEEL.NS", "TATAMOTORS.NS",
  "TATASTEEL.NS", "TECHM.NS", "WIPRO.NS", "ADANIENT.NS", "ADANIPORTS.NS", "COALINDIA.NS",
  "POWERGRID.NS", "DRREDDY.NS", "CIPLA.NS", "EICHERMOT.NS", "HEROMOTOCO.NS", "HINDALCO.NS",
  "INDUSINDBK.NS", "SHREECEM.NS", "BPCL.NS", "ONGC.NS", "GRASIM.NS", "IOC.NS", "HDFCLIFE.NS",
  "SBILIFE.NS", "BAJAJ-AUTO.NS", "BAJAJFINSV.NS", "BRITANNIA.NS", "HDFC.NS", "UPL.NS",
  "BOSCHLTD.NS", "ABB.NS", "APOLLOHOSP.NS", "AMBUJACEM.NS", "ADANIGREEN.NS", "BIOCON.NS",
  "BEL.NS", "BANKBARODA.NS", "BANDHANBNK.NS", "CANBK.NS", "CHOLAFIN.NS", "COLPAL.NS",
  "DABUR.NS", "DLF.NS", "GODREJCP.NS", "GAIL.NS", "HAVELLS.NS", "ICICIPRULI.NS", "INDIGO.NS",
  "LTIM.NS", "LTTS.NS", "L&TFH.NS", "LICI.NS", "MCDOWELL-N.NS", "MFSL.NS", "MUTHOOTFIN.NS",
  "NAUKRI.NS", "NHPC.NS", "NMDC.NS", "OFSS.NS", "PAGEIND.NS", "PETRONET.NS", "PIDILITIND.NS",
  "PIIND.NS", "PFC.NS", "RECLTD.NS", "SAIL.NS", "SIEMENS.NS", "SRF.NS", "TORNTPHARM.NS",
  "TRENT.NS", "TVSMOTOR.NS", "UBL.NS", "VOLTAS.NS", "ZYDUSLIFE.NS", "AUROPHARMA.NS",
  "ALKEM.NS", "INDUSTOWER.NS", "IOCL.NS", "JINDALSTEL.NS",
];

export default function StrategyBacktestApp() {
  const [form, setForm] = useState({
    strategyName: "",
    strategyScript: "",
    symbolList: [],
    startDate: "",
    endDate: "",
    initialCapital: 500000,
  });
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(null);
  const [result, setResult] = useState(null);
  const [candleSeries, setCandleSeries] = useState([]);
  const [companyCandleMap, setCompanyCandleMap] = useState({});
  const [selectedCompanyForChart, setSelectedCompanyForChart] = useState("");

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
        const ohlc = w.globals.initialSeries[seriesIndex].data[dataPointIndex].y;
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

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSelectSymbol = (symbol) => {
    if (INDICES.includes(symbol)) {
      setForm((prev) => ({ ...prev, symbolList: [symbol] }));
      setSelectedIndex(symbol);
    } else {
      if (!selectedIndex && !form.symbolList.includes(symbol)) {
        setForm((prev) => ({
          ...prev,
          symbolList: [...prev.symbolList, symbol],
        }));
      }
    }
    setDropdownVisible(false);
  };

  const removeSymbol = (symbol) => {
    setForm((prev) => ({
      ...prev,
      symbolList: prev.symbolList.filter((s) => s !== symbol),
    }));
    if (INDICES.includes(symbol)) setSelectedIndex(null);
  };

const handleSubmit = async () => {
  const toastId = toast.loading("Running backtest...", { duration: Infinity }); // stays until replaced
  try {
    const [backtestResponse, candleResponse] = await Promise.all([
      axios.post("http://localhost:8080/api/backtest", form),
      axios.post("http://localhost:8080/api/backtest/candles", form),
    ]);
    setResult(backtestResponse.data);

    const symbolWiseMap = {};
    for (const [symbol, candles] of Object.entries(candleResponse.data)) {
      const formatted = Array.from(
        new Map(candles.map((d) => [d.x, { x: new Date(d.x), y: d.y }])).values()
      );
      symbolWiseMap[symbol] = [{ data: formatted }];
    }

    setCompanyCandleMap(symbolWiseMap);
    const firstSymbol = Object.keys(symbolWiseMap)[0];
    setSelectedCompanyForChart(firstSymbol);
    setCandleSeries(symbolWiseMap[firstSymbol]);

    // ✅ Replace loading with success toast that disappears after 3 seconds
    toast.success("Backtest completed", { id: toastId, duration: 5000 });
  } catch (err) {
    console.error(err);
    toast.error("Backtest failed", { id: toastId }); // default duration
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
              <label className="text-sm font-medium text-gray-700">Strategy Name</label>
              <input
                className="border p-2 rounded-lg shadow-sm"
                type="text"
                name="strategyName"
                value={form.strategyName}
                onChange={handleChange}
                placeholder="Strategy Name"
              />
              <label className="text-sm font-medium text-gray-700">Select Index or Stocks</label>
              <div className="relative">
                <div
                  className="border p-2 rounded-lg shadow-sm bg-white cursor-pointer"
                  onClick={() => setDropdownVisible(!dropdownVisible)}
                >
                  Click to Select...
                </div>
                {dropdownVisible && (
                  <div className="absolute z-10 w-full bg-white border mt-1 rounded shadow-lg max-h-60 overflow-y-auto">
                    <div className="px-2 py-1 text-gray-600 font-semibold">Indices</div>
                    {INDICES.map((symbol) => (
                      <div
                        key={symbol}
                        className="px-4 py-2 flex justify-between hover:bg-blue-100 cursor-pointer"
                        onClick={() => handleSelectSymbol(symbol)}
                      >
                        <span>{symbol}</span>
                        {form.symbolList.includes(symbol) && <span>✅</span>}
                      </div>
                    ))}
                    <div className="px-2 py-1 text-gray-600 font-semibold mt-2">Stocks</div>
                    {COMPANIES.map((symbol) => (
                      <div
                        key={symbol}
                        className={`px-4 py-2 flex justify-between hover:bg-blue-100 cursor-pointer ${
                          selectedIndex ? "text-gray-400 cursor-not-allowed" : ""
                        }`}
                        onClick={() => !selectedIndex && handleSelectSymbol(symbol)}
                      >
                        <span>{symbol}</span>
                        {form.symbolList.includes(symbol) && <span>✅</span>}
                      </div>
                    ))}
                  </div>
                )}
              </div>
              <div className="flex flex-wrap gap-2 mt-2">
                {form.symbolList.map((symbol) => (
                  <span
                    key={symbol}
                    className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm flex items-center"
                  >
                    {symbol}
                    <button
                      className="ml-2 text-red-600 hover:text-red-800"
                      onClick={() => removeSymbol(symbol)}
                    >
                      ×
                    </button>
                  </span>
                ))}
              </div>
              <label className="text-sm font-medium text-gray-700">Start Date</label>
              <input
                className="border p-2 rounded-lg shadow-sm"
                type="date"
                name="startDate"
                value={form.startDate}
                onChange={handleChange}
              />
              <label className="text-sm font-medium text-gray-700">End Date</label>
              <input
                className="border p-2 rounded-lg shadow-sm"
                type="date"
                name="endDate"
                value={form.endDate}
                onChange={handleChange}
              />
            </div>

            <div className="flex flex-col gap-4">
              <label className="text-sm font-medium text-gray-700">Strategy Script</label>
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

              {Object.keys(companyCandleMap).length > 0 && (
                <div className="mb-4 flex gap-4 items-center">
                  <label className="text-gray-700 font-medium">
                    Select Company to View Chart:
                  </label>
                  <select
                    className="border px-4 py-2 rounded-lg shadow-sm"
                    value={selectedCompanyForChart}
                    onChange={(e) => {
                      const selected = e.target.value;
                      setSelectedCompanyForChart(selected);
                      setCandleSeries(companyCandleMap[selected]);
                    }}
                  >
                    {Object.keys(companyCandleMap).map((symbol) => (
                      <option key={symbol} value={symbol}>
                        {symbol}
                      </option>
                    ))}
                  </select>
                </div>
              )}

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
