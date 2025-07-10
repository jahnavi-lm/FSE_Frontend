import ReactApexChart from "react-apexcharts";

export default function StrategyResultModal({
  result,
  onClose,
  candleSeries,
  companyCandleMap,
  selectedCompany,
  setSelectedCompany,
  setCandleSeries,
}) {
  if (!result) return null;

  const candleOptions = {
    chart: { type: "candlestick", height: 350 },
    title: { text: "CandleStick Chart", align: "left" },
    xaxis: { type: "datetime" },
    yaxis: {
      tooltip: { enabled: true },
      labels: { formatter: (val) => val.toFixed(2) },
    },
    tooltip: {
      custom: ({ series, seriesIndex, dataPointIndex, w }) => {
        const ohlc = w.globals.initialSeries[seriesIndex].data[dataPointIndex].y;
        const x = w.globals.initialSeries[seriesIndex].data[dataPointIndex].x;
        return `
<div style="padding: 10px; font-size: 13px;">
<b>${new Date(x).toLocaleDateString()}</b><br/>
<span>Open: ₹${ohlc[0].toFixed(2)}</span><br/>
<span>High: ₹${ohlc[1].toFixed(2)}</span><br/>
<span>Low: ₹${ohlc[2].toFixed(2)}</span><br/>
<span>Close: ₹${ohlc[3].toFixed(2)}</span>
</div>`;
      },
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

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <div className="bg-gray-100 p-4 rounded shadow text-center">
            <div className="text-sm text-gray-500">Initial Equity</div>
            <div className="text-lg font-bold text-gray-800">
              ₹{result.initialEquity?.toFixed(2) ?? "—"}
            </div>
          </div>
          <div className="bg-gray-100 p-4 rounded shadow text-center">
            <div className="text-sm text-gray-500">Final Equity</div>
            <div className="text-lg font-bold text-gray-800">
              ₹{result.finalEquity?.toFixed(2) ?? "—"}
            </div>
          </div>
          <div className="bg-gray-100 p-4 rounded shadow text-center">
            <div className="text-sm text-gray-500">Total Trades</div>
            <div className="text-lg font-bold text-gray-800">
              {result.totalTrades ?? "—"}
            </div>
          </div>
        </div>

        {/* Chart Section */}
        {companyCandleMap && Object.keys(companyCandleMap).length > 0 && (
          <>
            <div className="mb-4 flex gap-4 items-center">
              <label className="text-gray-700 font-medium">
                Select Company to View Chart:
              </label>
              <select
                className="border px-4 py-2 rounded-lg shadow-sm"
                value={selectedCompany}
                onChange={(e) => {
                  const selected = e.target.value;
                  setSelectedCompany(selected);
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
            <ReactApexChart
              options={candleOptions}
              series={candleSeries}
              type="candlestick"
              height={350}
            />
          </>
        )}

        {/* Trades Table — (already correct) */}
        <h3 className="text-lg font-semibold mt-8 mb-4">Trades Table</h3>
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
              {result.trades?.length ? (
                result.trades.map((trade, index) => (
                  <tr key={index} className="text-center">
                    <td className="p-2">{trade.date}</td>
                    <td
                      className={`p-2 font-bold ${
                        trade.action === "BUY" ? "text-green-600" : "text-red-600"
                      }`}
                    >
                      {trade.action}
                    </td>
                    <td className="p-2">₹{trade.price?.toFixed(2) ?? "—"}</td>
                    <td className="p-2">{trade.symbol ?? "—"}</td>
                    <td className="p-2">{trade.quantity ?? "—"}</td>
                    <td className="p-2">₹{trade.totalCostPrice?.toFixed(2) ?? "—"}</td>
                    <td className="p-2">₹{trade.openingBalance?.toFixed(2) ?? "—"}</td>
                    <td className="p-2">₹{trade.closingBalance?.toFixed(2) ?? "—"}</td>
                    <td className="p-2">₹{trade.price?.toFixed(2) ?? "—"}</td>
                    <td
                      className={`p-2 font-bold ${
                        trade.realizedProfit > 0
                          ? "text-green-600"
                          : trade.realizedProfit < 0
                          ? "text-red-600"
                          : "text-gray-600"
                      }`}
                    >
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
