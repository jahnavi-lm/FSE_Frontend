import { useState } from 'react';
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer
} from 'recharts';

// Dummy data - replace with your actual strategies store or prop
const mockStrategies = [
  {
    id: 1,
    name: "Breakout Strategy",
    result: {
      summary: "Good breakout opportunities.",
      pnl: "₹18000",
      trades: 14
    }
  },
  {
    id: 2,
    name: "Mean Reversion",
    result: {
      summary: "Captured mean reversions.",
      pnl: "₹12500",
      trades: 10
    }
  },
  {
    id: 3,
    name: "Momentum",
    result: null
  }
];

export default function Compare() {
  const completedStrategies = mockStrategies.filter(s => s.result);

  const [selected1, setSelected1] = useState(completedStrategies[0]?.id || null);
  const [selected2, setSelected2] = useState(completedStrategies[1]?.id || null);

  const strategy1 = completedStrategies.find(s => s.id === selected1);
  const strategy2 = completedStrategies.find(s => s.id === selected2);

  // Chart Data
  const chartData = [
    {
      metric: 'PnL',
      [strategy1?.name]: strategy1 ? Number(strategy1.result.pnl.replace(/[₹,]/g, '')) : 0,
      [strategy2?.name]: strategy2 ? Number(strategy2.result.pnl.replace(/[₹,]/g, '')) : 0,
    },
    {
      metric: 'Trades',
      [strategy1?.name]: strategy1?.result.trades || 0,
      [strategy2?.name]: strategy2?.result.trades || 0,
    }
  ];

  return (
    <div className="max-w-7xl mx-auto px-6 py-6 space-y-10">
      <h2 className="text-2xl font-bold text-gray-800 mb-4">📊 Compare Strategies</h2>

      {/* Dropdown Selectors */}
      <div className="flex flex-col lg:flex-row gap-6">
        <div className="flex-1">
          <label className="block mb-2 text-sm font-medium text-gray-700">
            Select Strategy 1
          </label>
          <select
            className="w-full border border-gray-300 p-3 rounded-lg focus:ring-teal-500 focus:outline-none"
            value={selected1 || ''}
            onChange={(e) => setSelected1(Number(e.target.value))}
          >
            <option value="">-- Select --</option>
            {completedStrategies.map((s) => (
              <option key={s.id} value={s.id}>{s.name}</option>
            ))}
          </select>
        </div>

        <div className="flex-1">
          <label className="block mb-2 text-sm font-medium text-gray-700">
            Select Strategy 2
          </label>
          <select
            className="w-full border border-gray-300 p-3 rounded-lg focus:ring-teal-500 focus:outline-none"
            value={selected2 || ''}
            onChange={(e) => setSelected2(Number(e.target.value))}
          >
            <option value="">-- Select --</option>
            {completedStrategies.map((s) => (
              <option key={s.id} value={s.id}>{s.name}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Blue Boxes for Strategy Results */}
      <div className="flex flex-col lg:flex-row gap-6">
        {strategy1 && (
          <div className="flex-1 bg-blue-50 border border-blue-200 p-6 rounded-xl shadow-inner">
            <h3 className="text-lg font-semibold text-blue-700 mb-3">
              {strategy1.name}
            </h3>
            <p className="mb-2"><strong>Summary:</strong> {strategy1.result.summary}</p>
            <p className="mb-2"><strong>PnL:</strong> {strategy1.result.pnl}</p>
            <p className="mb-2"><strong>Trades:</strong> {strategy1.result.trades}</p>
          </div>
        )}

        {strategy2 && (
          <div className="flex-1 bg-blue-50 border border-blue-200 p-6 rounded-xl shadow-inner">
            <h3 className="text-lg font-semibold text-blue-700 mb-3">
              {strategy2.name}
            </h3>
            <p className="mb-2"><strong>Summary:</strong> {strategy2.result.summary}</p>
            <p className="mb-2"><strong>PnL:</strong> {strategy2.result.pnl}</p>
            <p className="mb-2"><strong>Trades:</strong> {strategy2.result.trades}</p>
          </div>
        )}
      </div>

      {/* Green Box with Comparison Chart */}
      {(strategy1 && strategy2) && (
        <div className="bg-green-50 border border-green-200 p-6 rounded-xl shadow-inner">
          <h3 className="text-xl font-semibold text-green-700 mb-4">Comparison Chart</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={chartData} margin={{ top: 20, right: 30, left: 0, bottom: 5 }}>
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
      )}
    </div>
  );
}
