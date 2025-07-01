import { useState } from 'react';
import { initialStrategies } from '../../../Data/strategiesData';
import StrategiesForm from "./StrategiesForm";

export default function Strategies() {
  const [strategies, setStrategies] = useState(
    initialStrategies.map((s) => ({
      ...s,
      status: s.status || 'not started',
      result: s.result || null
    }))
  );
  const [showForm, setShowForm] = useState(false);
  const [editingStrategy, setEditingStrategy] = useState(null);
  const [showResult, setShowResult] = useState(null);

  const handleAddStrategy = () => {
    setEditingStrategy(null);
    setShowForm(true);
  };

  const handleSaveStrategy = (strategy) => {
    setStrategies((prev) => {
      const exists = prev.some((s) => s.id === strategy.id);
      if (exists) {
        return prev.map((s) =>
          s.id === strategy.id
            ? { ...strategy, status: s.status, result: s.result }
            : s
        );
      }
      return [...prev, { ...strategy, status: 'not started', result: null }];
    });
    setShowForm(false);
    setEditingStrategy(null);
  };

  const handleEdit = (id) => {
    const strategyToEdit = strategies.find((s) => s.id === id);
    if (strategyToEdit) {
      setEditingStrategy(strategyToEdit);
      setShowForm(true);
    }
  };

  const handleDelete = (id) => {
    if (confirm('Are you sure you want to delete this strategy?')) {
      setStrategies(strategies.filter((s) => s.id !== id));
    }
  };

  const handleStartSimulation = (id) => {
    setStrategies((prev) =>
      prev.map((s) =>
        s.id === id ? { ...s, status: 'running' } : s
      )
    );

    // Simulate async processing
    setTimeout(() => {
      setStrategies((prev) =>
        prev.map((s) =>
          s.id === id
            ? {
                ...s,
                status: 'completed',
                result: {
                  summary: 'Simulation completed successfully.',
                  pnl: `₹${(Math.random() * 20000 + 5000).toFixed(0)}`,
                  trades: Math.floor(Math.random() * 20) + 5
                }
              }
            : s
        )
      );
    }, 3000);
  };

  const handleStopSimulation = (id) => {
    setStrategies((prev) =>
      prev.map((s) =>
        s.id === id ? { ...s, status: 'stopped' } : s
      )
    );
  };

  return (
    <div className="bg-blue-50 border border-blue-200 p-6 rounded-xl shadow-inner">
      <div className="max-w-7xl mx-auto px-6 py-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold text-gray-800 flex items-center gap-2">
            Your Strategies
          </h2>
          <button
            onClick={handleAddStrategy}
            className="px-5 py-2 bg-teal-600 text-white rounded hover:bg-teal-700 transition"
          >
            + Add Strategy
          </button>
        </div>

        <div className="bg-white overflow-x-auto border rounded-xl shadow-sm">
          <table className="min-w-full text-sm text-left">
            <thead className="bg-gray-100 text-gray-700">
              <tr>
                <th className="px-4 py-3 border-b">Name</th>
                <th className="px-4 py-3 border-b">Type</th>
                <th className="px-4 py-3 border-b">Status</th>
                <th className="px-4 py-3 border-b">Simulation</th>
                <th className="px-4 py-3 border-b">Result</th>
                <th className="px-4 py-3 border-b">Edit</th>
                <th className="px-4 py-3 border-b">Delete</th>
              </tr>
            </thead>
            <tbody>
              {strategies.map((strategy) => (
                <tr key={strategy.id} className="hover:bg-gray-50">
                  <td className="px-4 py-3 border-b font-semibold">{strategy.name}</td>
                  <td className="px-4 py-3 border-b">{strategy.type}</td>
                  <td className="px-4 py-3 border-b capitalize">{strategy.status}</td>
                  <td className="px-4 py-3 border-b">
                    {strategy.status === 'running' ? (
                      <button
                        onClick={() => handleStopSimulation(strategy.id)}
                        className="px-3 py-1 bg-red-600 text-white rounded hover:bg-red-700 transition text-xs"
                      >
                        Stop
                      </button>
                    ) : (
                      <button
                        onClick={() => handleStartSimulation(strategy.id)}
                        className="px-3 py-1 bg-teal-600 text-white rounded hover:bg-teal-700 transition text-xs"
                        disabled={strategy.status === 'completed'}
                      >
                        Start
                      </button>
                    )}
                  </td>
                  <td className="px-4 py-3 border-b">
                    {strategy.result && strategy.status === 'completed' ? (
                      <button
                        onClick={() => setShowResult(strategy.result)}
                        className="text-indigo-600 hover:text-indigo-800 text-xs"
                      >
                        View
                      </button>
                    ) : (
                      <span className="text-gray-400 text-xs">-</span>
                    )}
                  </td>
                  <td className="px-4 py-3 border-b">
                    <button
                      onClick={() => handleEdit(strategy.id)}
                      className="text-blue-600 hover:text-blue-800 text-xs"
                    >
                      Edit
                    </button>
                  </td>
                  <td className="px-4 py-3 border-b">
                    <button
                      onClick={() => handleDelete(strategy.id)}
                      className="text-red-600 hover:text-red-800 text-xs"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
              {strategies.length === 0 && (
                <tr>
                  <td colSpan="7" className="text-center py-6 text-gray-500">
                    No strategies found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {showForm && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
            <div className="relative bg-white rounded-xl shadow-2xl w-full max-w-3xl max-h-[90vh] overflow-y-auto p-6">
              <button
                onClick={() => setShowForm(false)}
                className="absolute top-3 right-3 text-gray-500 hover:text-gray-800 text-2xl font-bold"
                aria-label="Close"
              >
                &times;
              </button>
              <StrategiesForm
                initialValues={editingStrategy}
                onSave={handleSaveStrategy}
                onCancel={() => {
                  setShowForm(false);
                  setEditingStrategy(null);
                }}
              />
            </div>
          </div>
        )}

        {showResult && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
            <div className="relative bg-white rounded-xl shadow-2xl w-full max-w-md p-6">
              <button
                onClick={() => setShowResult(null)}
                className="absolute top-3 right-3 text-gray-500 hover:text-gray-800 text-2xl font-bold"
                aria-label="Close"
              >
                &times;
              </button>
              <h3 className="text-xl font-bold text-teal-700 mb-4 text-center">Simulation Result</h3>
              <p className="text-gray-700 mb-2">
                <strong>Summary:</strong> {showResult.summary}
              </p>
              <p className="text-gray-700 mb-2">
                <strong>PnL:</strong> {showResult.pnl}
              </p>
              <p className="text-gray-700 mb-2">
                <strong>Trades:</strong> {showResult.trades}
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
