import React, { useEffect } from "react";
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, LineChart, Line
} from "recharts";
import { useSelector, useDispatch } from "react-redux";
import {
  fetchCompletedStrategies,
  fetchStrategyDetails,
  selectStrategy1,
  selectStrategy2,
  setLineMetric
} from "../../features/compare/compareSlice";
import { StrategyCompareTable } from "./StrategyCompareTable";

export default function Compare() {
  const dispatch = useDispatch();
  const {
    allStrategies,
    status,
    selected1,
    selected2,
    strategy1,
    strategy2,
    lineMetric,
  } = useSelector((state) => state.compare);
  
  useEffect(() => {
    dispatch(fetchCompletedStrategies());
  }, [dispatch]);

  useEffect(() => {
    if (selected1) {
      dispatch(fetchStrategyDetails({ strategyId: selected1, strategyNum: 1 }));
    }
  }, [selected1, dispatch]);

  useEffect(() => {
    if (selected2) {
      dispatch(fetchStrategyDetails({ strategyId: selected2, strategyNum: 2 }));
    }
  }, [selected2, dispatch]);

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

  const allDatesSet = new Set([...chart1.map(d => d.date), ...chart2.map(d => d.date)]);
  const allDates = Array.from(allDatesSet).sort();

  const mergedLineChartData = allDates.map((date) => ({
    date,
    [strategy1?.name]: chart1.find((d) => d.date === date)?.[strategy1?.name] ?? null,
    [strategy2?.name]: chart2.find((d) => d.date === date)?.[strategy2?.name] ?? null,
  }));

  return (
    <div className="max-w-7xl mx-auto px-6 py-6 space-y-10">
      <h2 className="text-2xl font-bold text-gray-800 mb-4">📊 Compare Strategies</h2>

      {status === 'loading' ? (
        <p>Loading strategies...</p>
      ) : (
        <>
          <div className="flex flex-col lg:flex-row gap-6">
            <div className="flex-1">
              <label className="block mb-2 text-sm font-medium text-gray-700">Select Strategy 1</label>
              <select
                className="w-full border border-gray-300 p-3 rounded-lg focus:ring-teal-500 focus:outline-none"
                value={selected1 || ""}
                onChange={(e) => dispatch(selectStrategy1(Number(e.target.value)))}
              >
                <option value="">-- Select --</option>
                {allStrategies.map((s) => (
                  <option key={s.id} value={s.id} disabled={s.id === selected2}>
                    {s.strategyName}
                  </option>
                ))}
              </select>
            </div>
            <div className="flex-1">
              <label className="block mb-2 text-sm font-medium text-gray-700">Select Strategy 2</label>
              <select
                className="w-full border border-gray-300 p-3 rounded-lg focus:ring-teal-500 focus:outline-none"
                value={selected2 || ""}
                onChange={(e) => dispatch(selectStrategy2(Number(e.target.value)))}
              >
                <option value="">-- Select --</option>
                {allStrategies.map((s) => (
                  <option key={s.id} value={s.id} disabled={s.id === selected1}>
                    {s.strategyName}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="flex flex-col lg:flex-row gap-6">
            {[strategy1, strategy2].map(
              (strategy, idx) =>
                strategy && (
                  <div key={idx} className="flex-1 bg-blue-50 border border-blue-200 p-6 rounded-xl shadow-inner">
                    <h3 className="text-lg font-semibold text-blue-700 mb-3">{strategy.name}</h3>
                    <p className="mb-2 font-bold">Initial: ₹{strategy.result.initialEquity?.toFixed(2) ?? "—"}</p>
                    <p className="mb-2 font-bold">Final: ₹{strategy.result.finalEquity?.toFixed(2) ?? "—"}</p>
                    <p className="mb-2 font-bold">Total Trades: {strategy.full.trades?.length ?? "—"}</p>
                    <p className={`mb-2 font-bold ${parseFloat(strategy.result.pnl.replace(/[₹,]/g, "")) >= 0 ? "text-green-600" : "text-red-600"}`}>
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
                      <CartesianGrid strokeDasharray="3 3" /><XAxis dataKey="metric" /><YAxis /><Tooltip /><Legend />
                      <Bar dataKey={strategy1.name} fill="#14b8a6" />
                      <Bar dataKey={strategy2.name} fill="#3b82f6" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
                <div className="flex-1 bg-green-50 border border-green-200 p-6 rounded-xl shadow-inner">
                  <h3 className="text-xl font-semibold text-green-700 mb-4">Comparison - Trades</h3>
                  <ResponsiveContainer width="100%" height={300}>
                    <BarChart data={tradesData}>
                      <CartesianGrid strokeDasharray="3 3" /><XAxis dataKey="metric" /><YAxis /><Tooltip /><Legend />
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
                    onChange={(e) => dispatch(setLineMetric(e.target.value))}
                  >
                    <option value="BUY">Buy Cost Price</option>
                    <option value="SELL">Sell Cost Price</option>
                    <option value="REALIZED_PROFIT">Realized Profit</option>
                  </select>
                </div>
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={mergedLineChartData}>
                    <CartesianGrid strokeDasharray="3 3" /><XAxis dataKey="date" /><YAxis /><Tooltip formatter={(value) => (value != null ? value.toFixed(2) : "N/A")} /><Legend />
                    <Line type="monotone" dataKey={strategy1?.name} stroke="#14b8a6" strokeWidth={2} dot={{ r: 3 }} connectNulls />
                    <Line type="monotone" dataKey={strategy2?.name} stroke="#3b82f6" strokeWidth={2} dot={{ r: 3 }} connectNulls />
                  </LineChart>
                </ResponsiveContainer>
              </div>

              <div className="bg-white border border-gray-200 p-6 rounded-xl shadow-inner">
                <h3 className="text-xl font-semibold text-gray-800 mb-4">All Trades Comparison</h3>
                <div className="flex flex-col lg:flex-row gap-6">
                  <StrategyCompareTable strategy={strategy1} />
                  <StrategyCompareTable strategy={strategy2} />
                </div>
              </div>
            </>
          )}
        </>
      )}
    </div>
  );
}