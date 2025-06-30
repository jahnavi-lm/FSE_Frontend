import { useState } from 'react';
import { mockFunds } from '../Data/BacktestData';
import { initialStrategies } from '../Data/strategiesData';
export default function Backtest() {
  const [showForm, setShowForm] = useState(false);
  const [backtests, setBacktests] = useState([]);

  const [formData, setFormData] = useState({
    fund: '',
    strategyId: '',
    stockSymbol: '',
    validFrom: '',
    validTo: '',
    capitalAllocation: '',
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleStartSimulation = (e) => {
    e.preventDefault();

    const newBacktest = {
      id: Date.now(),
      ...formData,
      status: 'not started',
    };

    setBacktests((prev) => [...prev, newBacktest]);
    setShowForm(false);

    setFormData({
      fund: '',
      strategyId: '',
      stockSymbol: '',
      validFrom: '',
      validTo: '',
      capitalAllocation: '',
    });
  };

  const updateStatus = (id, newStatus) => {
    setBacktests((prev) =>
      prev.map((bt) =>
        bt.id === id ? { ...bt, status: newStatus } : bt
      )
    );
  };

  return (
    <div className="px-6 py-4 bg-white shadow mt-4 mx-4 rounded-xl">
      <h2 className="text-2xl font-bold text-indigo-700 mb-4 border-b pb-2">
        Backtest & Simulate Strategies
      </h2>

      <button
        onClick={() => setShowForm(true)}
        className="mb-4 px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700 transition"
      >
        + New Backtest
      </button>

      {backtests.length > 0 && (
        <div className="mb-6">
          <h3 className="text-xl font-semibold text-gray-800 mb-2">Your Simulations</h3>
          <table className="min-w-full border">
            <thead className="bg-indigo-100">
              <tr>
                <th className="border px-4 py-2 text-left">Stock Symbol</th>
                <th className="border px-4 py-2 text-left">Fund</th>
                <th className="border px-4 py-2 text-left">Strategy</th>
                <th className="border px-4 py-2 text-left">Status</th>
                <th className="border px-4 py-2 text-left">Actions</th>
              </tr>
            </thead>
            <tbody>
              {backtests.map((bt) => (
                <tr key={bt.id} className="hover:bg-indigo-50">
                  <td className="border px-4 py-2">{bt.stockSymbol}</td>
                  <td className="border px-4 py-2">
                    {mockFunds.find((f) => f.id === bt.fund)?.name}
                  </td>
                  <td className="border px-4 py-2">
                    {initialStrategies.find((s) => s.id === parseInt(bt.strategyId))?.name}
                  </td>
                  <td className="border px-4 py-2 capitalize">{bt.status}</td>
                  <td className="border px-4 py-2 space-x-2">
                    {bt.status === 'not started' && (
                      <button
                        onClick={() => updateStatus(bt.id, 'running')}
                        className="px-3 py-1 bg-green-600 text-white rounded hover:bg-green-700"
                      >
                        Start
                      </button>
                    )}
                    {bt.status === 'running' && (
                      <button
                        onClick={() => updateStatus(bt.id, 'paused')}
                        className="px-3 py-1 bg-yellow-500 text-white rounded hover:bg-yellow-600"
                      >
                        Pause
                      </button>
                    )}
                    {bt.status === 'paused' && (
                      <button
                        onClick={() => updateStatus(bt.id, 'running')}
                        className="px-3 py-1 bg-green-600 text-white rounded hover:bg-green-700"
                      >
                        Resume
                      </button>
                    )}
                    {bt.status === 'completed' && (
                      <span className="text-green-700 font-semibold">Completed</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Modal for Form */}
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

            <h3 className="text-2xl font-bold text-indigo-700 mb-4 text-center">
              Start Simulation
            </h3>
            <form className="space-y-6" onSubmit={handleStartSimulation}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block mb-2 text-lg font-medium text-gray-700">
                    Select Fund <span className="text-red-500">*</span>
                  </label>
                  <select
                    name="fund"
                    value={formData.fund}
                    onChange={handleChange}
                    required
                    className="w-full border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  >
                    <option value="">Select Fund</option>
                    {mockFunds.map((fund) => (
                      <option key={fund.id} value={fund.id}>
                        {fund.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block mb-2 text-lg font-medium text-gray-700">
                    Strategy <span className="text-red-500">*</span>
                  </label>
                  <select
                    name="strategyId"
                    value={formData.strategyId}
                    onChange={handleChange}
                    required
                    className="w-full border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  >
                    <option value="">Select Strategy</option>
                    {initialStrategies.map((s) => (
                      <option key={s.id} value={s.id}>
                        {s.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block mb-2 text-lg font-medium text-gray-700">
                    Stock Symbol <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="stockSymbol"
                    value={formData.stockSymbol}
                    onChange={handleChange}
                    required
                    className="w-full border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                </div>

                <div>
                  <label className="block mb-2 text-lg font-medium text-gray-700">
                    Capital Allocation (%) <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="number"
                    name="capitalAllocation"
                    value={formData.capitalAllocation}
                    onChange={handleChange}
                    required
                    className="w-full border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                </div>

                <div>
                  <label className="block mb-2 text-lg font-medium text-gray-700">
                    Valid From Date <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="date"
                    name="validFrom"
                    value={formData.validFrom}
                    onChange={handleChange}
                    required
                    className="w-full border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                </div>

                <div>
                  <label className="block mb-2 text-lg font-medium text-gray-700">
                    Valid To Date <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="date"
                    name="validTo"
                    value={formData.validTo}
                    onChange={handleChange}
                    required
                    className="w-full border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                </div>
              </div>

              <div className="flex justify-end mt-6">
                <button
                  type="submit"
                  className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition"
                >
                  Start Simulation Engine
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
