import { useState, useEffect } from 'react';
import { mockFunds, initialBacktests } from '../../../Data/BacktestData';
import { initialStrategies } from '../../../Data/strategiesData';
import BacktestForm from './BacktestForm';

export default function Backtest({ results, setResults }) {
  const [backtests, setBacktests] = useState(initialBacktests);
  const [showForm, setShowForm] = useState(false);
  const [editingBacktest, setEditingBacktest] = useState(null);

  const handleAddBacktest = () => {
    setEditingBacktest(null);
    setShowForm(true);
  };

  const handleRerunBacktest = (bt) => {
    setEditingBacktest(bt);
    setShowForm(true);
  };

  const handleSaveBacktest = (updatedBacktest) => {
    if (editingBacktest) {
      // EDIT IN PLACE
      setBacktests((prev) =>
        prev.map((bt) =>
          bt.id === editingBacktest.id
            ? { ...updatedBacktest, id: editingBacktest.id, status: 'not started' }
            : bt
        )
      );
    } else {
      // ADD NEW
      setBacktests((prev) => [
        ...prev,
        { ...updatedBacktest, id: Date.now(), status: 'not started' },
      ]);
    }
    setShowForm(false);
  };

  const handleUpdateStatus = (id, newStatus) => {
    setBacktests((prev) =>
      prev.map((bt) => (bt.id === id ? { ...bt, status: newStatus } : bt))
    );
  };

  useEffect(() => {
    setResults((prev) => {
      let newResults = [...prev];
  
      backtests.forEach((bt) => {
        if (bt.status === 'completed') {
          const exists = newResults.some((r) => r.backtestId === bt.id);
          if (!exists) {
            const newResult = {
              id: Date.now(),
              backtestId: bt.id,
              ...bt,
              simulatedPnL: Math.floor(Math.random() * 50000) - 10000,
              trades: [
                { stock: bt.stockSymbol, qty: 50, price: 500, action: 'BUY' },
                { stock: bt.stockSymbol, qty: 30, price: 520, action: 'SELL' },
              ],
            };
            newResults.push(newResult);
          }
        }
      });
  
      return newResults;
    });
  }, []); 
  

  return (
    <div className="bg-blue-50 border border-blue-200 p-6 rounded-xl shadow-inner">
    <div className="max-w-7xl mx-auto px-6 py-6">
      {/* Header */}
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold text-gray-800 flex items-center gap-2">
          📜 Backtest Tracker
        </h2>
        <button
          onClick={handleAddBacktest}
          className="px-5 py-2 bg-teal-600 text-white rounded hover:bg-teal-700 transition"
        >
          + Add New Backtest
        </button>
      </div>

      {/* Table */}
      {backtests.length > 0 && (
        <div className="bg-white overflow-x-auto border rounded-xl shadow-sm">
          <table className="min-w-full text-sm text-left">
            <thead className="bg-gray-100 text-gray-700">
              <tr>
                <th className="px-4 py-3 border-b">Stock Symbol</th>
                <th className="px-4 py-3 border-b">Fund</th>
                <th className="px-4 py-3 border-b">Strategy</th>
                <th className="px-4 py-3 border-b">Status</th>
                <th className="px-4 py-3 border-b">Actions</th>
              </tr>
            </thead>
            <tbody>
              {backtests.map((bt) => (
                <tr key={bt.id} className="hover:bg-gray-50">
                  <td className="px-4 py-3 border-b">{bt.stockSymbol}</td>
                  <td className="px-4 py-3 border-b">
                    {mockFunds.find((f) => f.id === bt.fund)?.name || bt.fund}
                  </td>
                  <td className="px-4 py-3 border-b">
                    {initialStrategies.find((s) => s.id === parseInt(bt.strategyId))?.name || bt.strategyId}
                  </td>
                  <td className="px-4 py-3 border-b capitalize">{bt.status}</td>
                  <td className="px-4 py-3 border-b space-x-2">
                    {bt.status === 'not started' && (
                      <button
                        onClick={() => handleUpdateStatus(bt.id, 'running')}
                        className="px-3 py-1 bg-green-600 text-white rounded hover:bg-green-700"
                      >
                        Start
                      </button>
                    )}
                    {bt.status === 'running' && (
                      <button
                        onClick={() => handleUpdateStatus(bt.id, 'paused')}
                        className="px-3 py-1 bg-yellow-500 text-white rounded hover:bg-yellow-600"
                      >
                        Pause
                      </button>
                    )}
                    {bt.status === 'paused' && (
                      <button
                        onClick={() => handleUpdateStatus(bt.id, 'running')}
                        className="px-3 py-1 bg-green-600 text-white rounded hover:bg-green-700"
                      >
                        Resume
                      </button>
                    )}
                    {bt.status === 'completed' && (
                      <button
                        onClick={() => handleRerunBacktest(bt)}
                        className="px-3 py-1 bg-teal-500 text-white rounded hover:bg-teal-600"
                      >
                        Rerun
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {backtests.length === 0 && (
        <div className="text-center text-gray-500 py-10">
          No backtests found. Click "+ Add New Backtest" to start one.
        </div>
      )}

      {/* Form */}
      {showForm && (
        <BacktestForm
          onSave={handleSaveBacktest}
          onCancel={() => setShowForm(false)}
          initialData={editingBacktest}
        />
      )}
    </div>
    </div>
  );
}
