import React, { useState, useEffect } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  LineChart,
  Line,
} from "recharts";
import { getAllStrategies, getBacktestResult } from "../../api/strategiesApi";
import { StrategyTradesTable } from "./StrategyTradesTable";

export default function Compare() {
  const [allStrategies, setAllStrategies] = useState([]);
  const [loadingStrategies, setLoadingStrategies] = useState(true);
  const [selected1, setSelected1] = useState(null);
  const [selected2, setSelected2] = useState(null);
  const [strategy1, setStrategy1] = useState(null);
  const [strategy2, setStrategy2] = useState(null);
  const [lineMetric, setLineMetric] = useState("BUY");

  useEffect(() => {
    async function fetchStrategies() {
      try {
        setLoadingStrategies(true);
        const res = await getAllStrategies();
        const data = res.data || [];
        const completed = data.filter((s) => s.status === "completed");
        setAllStrategies(completed);
      } catch (err) {
        console.error("Error fetching strategies:", err);
      } finally {
        setLoadingStrategies(false);
      }
    }
    fetchStrategies();
  }, []);

  const parseResultJson = (resultJson) => resultJson || "";

  useEffect(() => {
    async function fetchDetail() {
      if (!selected1) {
        setStrategy1(null);
        return;
      }
      try {
        const summaryData = allStrategies.find((s) => s.id === selected1);
        if (!summaryData) return;

        const res = await getBacktestResult(selected1);
        const resultData = res.data;
        const pnl = ((resultData.finalEquity || 0) - (resultData.initialEquity || 0)).toFixed(2);

        setStrategy1({
          id: selected1,
          name: summaryData.strategyName,
          result: {
            initialEquity: resultData.initialEquity,
            finalEquity: resultData.finalEquity,
            pnl: `₹${pnl}`,
          },
          full: {
            trades: resultData.trades || [],
          },
        });
      } catch (err) {
        console.error("Error fetching detail for Strategy 1:", err);
        setStrategy1(null);
      }
    }
    fetchDetail();
  }, [selected1, allStrategies]);

  useEffect(() => {
    async function fetchDetail() {
      if (!selected2) {
        setStrategy2(null);
        return;
      }
      try {
        const summaryData = allStrategies.find((s) => s.id === selected2);
        if (!summaryData) return;

        const res = await getBacktestResult(selected2);
        const resultData = res.data;
        const pnl = ((resultData.finalEquity || 0) - (resultData.initialEquity || 0)).toFixed(2);

        setStrategy2({
          id: selected2,
          name: summaryData.strategyName,
          result: {
            initialEquity: resultData.initialEquity,
            finalEquity: resultData.finalEquity,
            pnl: `₹${pnl}`,
          },
          full: {
            trades: resultData.trades || [],
          },
        });
      } catch (err) {
        console.error("Error fetching detail for Strategy 2:", err);
        setStrategy2(null);
      }
    }
    fetchDetail();
  }, [selected2, allStrategies]);

  const pnlData = strategy1 && strategy2 ? [
    {
      metric: "PnL",
      [strategy1.name]: parseFloat(strategy1.result.pnl.replace(/[₹,]/g, "")) || 0,
      [strategy2.name]: parseFloat(strategy2.result.pnl.replace(/[₹,]/g, "")) || 0,
    },
  ] : [];

  const tradesData = strategy1 && strategy2 ? [
    {
      metric: "Trades",
      [strategy1.name]: strategy1.full.trades.length || 0,
      [strategy2.name]: strategy2.full.trades.length || 0,
    },
  ] : [];

  const getLineChartData = (strategy, key, labelKey) =>
    strategy?.full.trades
      .filter((t) =>
        (key === "BUY" && t.action === "BUY") ||
        (key === "SELL" && t.action === "SELL") ||
        (key === "REALIZED_PROFIT")
      )
      .map((t) => ({
        date: t.date,
        [labelKey]:
          key === "BUY" || key === "SELL"
            ? t.totalCostPrice
            : t.realizedProfit,
      })) || [];

  const chart1 = getLineChartData(strategy1, lineMetric, strategy1?.name);
  const chart2 = getLineChartData(strategy2, lineMetric, strategy2?.name);

  const allDatesSet = new Set();
  chart1.forEach((d) => allDatesSet.add(d.date));
  chart2.forEach((d) => allDatesSet.add(d.date));
  const allDates = Array.from(allDatesSet).sort();

  const mergedLineChartData = allDates.map((date) => ({
    date,
    [strategy1?.name]: chart1.find((d) => d.date === date)?.[strategy1?.name] ?? null,
    [strategy2?.name]: chart2.find((d) => d.date === date)?.[strategy2?.name] ?? null,
  }));

  return (
    <div className="max-w-7xl mx-auto px-6 py-6 space-y-10">
      <h2 className="text-2xl font-bold text-gray-800 mb-4">📊 Compare Strategies</h2>

      {loadingStrategies ? (
        <p>Loading strategies...</p>
      ) : (
        <>
          <div className="flex flex-col lg:flex-row gap-6">
            {[1, 2].map((i) => (
              <div key={i} className="flex-1">
                <label className="block mb-2 text-sm font-medium text-gray-700">
                  Select Strategy {i}
                </label>
                <select
                  className="w-full border border-gray-300 p-3 rounded-lg focus:ring-teal-500 focus:outline-none"
                  value={i === 1 ? selected1 || "" : selected2 || ""}
                  onChange={(e) =>
                    i === 1
                      ? setSelected1(Number(e.target.value))
                      : setSelected2(Number(e.target.value))
                  }
                >
                  <option value="">-- Select --</option>
                  {allStrategies.map((s) => (
                    <option
                      key={s.id}
                      value={s.id}
                      disabled={(i === 1 && s.id === selected2) || (i === 2 && s.id === selected1)}
                    >
                      {s.strategyName}
                    </option>
                  ))}
                </select>
              </div>
            ))}
          </div>

          <div className="flex flex-col lg:flex-row gap-6">
            {[strategy1, strategy2].map(
              (strategy, idx) =>
                strategy && (
                  <div
                    key={idx}
                    className="flex-1 bg-blue-50 border border-blue-200 p-6 rounded-xl shadow-inner"
                  >
                    <h3 className="text-lg font-semibold text-blue-700 mb-3">{strategy.name}</h3>
                    <p className="mb-2 font-bold">
                      Initial: ₹{strategy.result.initialEquity?.toFixed(2) ?? "—"}
                    </p>
                    <p className="mb-2 font-bold">
                      Final: ₹{strategy.result.finalEquity?.toFixed(2) ?? "—"}
                    </p>
                    <p className="mb-2 font-bold">
                      Total Trades: {strategy.full.trades?.length ?? "—"}
                    </p>
                    <p
                      className={`mb-2 font-bold ${
                        parseFloat(strategy.result.pnl.replace(/[₹,]/g, "")) >= 0
                          ? "text-green-600"
                          : "text-red-600"
                      }`}
                    >
                      PnL: {strategy.result.pnl}
                    </p>
                  </div>
                )
            )}
          </div>

          {strategy1 && strategy2 && (
            <>
              <div className="flex flex-col lg:flex-row gap-6">
                <div className="flex-1 bg-green-50 border border-green-200 p-6 rounded-xl shadow-inner">
                  <h3 className="text-xl font-semibold text-green-700 mb-4">Comparison - PnL</h3>
                  <ResponsiveContainer width="100%" height={300}>
                    <BarChart data={pnlData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="metric" />
                      <YAxis />
                      <Tooltip />
                      <Legend />
                      <Bar dataKey={strategy1.name} fill="#14b8a6" />
                      <Bar dataKey={strategy2.name} fill="#3b82f6" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>

                <div className="flex-1 bg-green-50 border border-green-200 p-6 rounded-xl shadow-inner">
                  <h3 className="text-xl font-semibold text-green-700 mb-4">Comparison - Trades</h3>
                  <ResponsiveContainer width="100%" height={300}>
                    <BarChart data={tradesData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="metric" />
                      <YAxis />
                      <Tooltip />
                      <Legend />
                      <Bar dataKey={strategy1.name} fill="#14b8a6" />
                      <Bar dataKey={strategy2.name} fill="#3b82f6" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>

              <div className="bg-yellow-50 border border-yellow-200 p-6 rounded-xl shadow-inner">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-xl font-semibold text-yellow-700">
                    Trade Comparison - {lineMetric === "BUY" ? "Buy Cost Price" : lineMetric === "SELL" ? "Sell Cost Price" : "Realized Profit"}
                  </h3>
                  <select
                    className="border border-yellow-400 p-2 rounded-md text-sm bg-yellow-50 text-yellow-800"
                    value={lineMetric}
                    onChange={(e) => setLineMetric(e.target.value)}
                  >
                    <option value="BUY">Buy Cost Price</option>
                    <option value="SELL">Sell Cost Price</option>
                    <option value="REALIZED_PROFIT">Realized Profit</option>
                  </select>
                </div>

                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={mergedLineChartData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="date" />
                    <YAxis />
                    <Tooltip formatter={(value) => (value != null ? value.toFixed(2) : "N/A")} />
                    <Legend />
                    <Line
                      type="monotone"
                      dataKey={strategy1?.name}
                      stroke="#14b8a6"
                      strokeWidth={2}
                      dot={{ r: 3 }}
                      connectNulls
                    />
                    <Line
                      type="monotone"
                      dataKey={strategy2?.name}
                      stroke="#3b82f6"
                      strokeWidth={2}
                      dot={{ r: 3 }}
                      connectNulls
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>

              <div className="bg-white border border-gray-200 p-6 rounded-xl shadow-inner">
                <h3 className="text-xl font-semibold text-gray-800 mb-4">All Trades Comparison</h3>
                <div className="flex flex-col lg:flex-row gap-6">
                  <StrategyTradesTable strategy={strategy1} />
                  <StrategyTradesTable strategy={strategy2} />
                </div>
              </div>
            </>
          )}
        </>
      )}
    </div>
  );
}
