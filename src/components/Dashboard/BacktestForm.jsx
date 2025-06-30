import { useState } from 'react';
import { mockFunds } from '../../../Data/BacktestData';
import { initialStrategies } from '../../../Data/strategiesData';

export default function BacktestForm({ onSave, onCancel, initialData }) {
    const [formData, setFormData] = useState(
        initialData || {
          fund: '',
          strategyId: '',
          stockSymbol: '',
          validFrom: '',
          validTo: '',
          capitalAllocation: '',
        }
      );

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newBacktest = {
      id: Date.now(),
      ...formData,
      status: 'not started',
    };
    onSave(newBacktest);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
      <div className="relative bg-white rounded-xl shadow-2xl w-full max-w-3xl max-h-[90vh] overflow-y-auto p-6">
        <button
          onClick={onCancel}
          className="absolute top-3 right-3 text-gray-500 hover:text-gray-800 text-2xl font-bold"
          aria-label="Close"
        >
          &times;
        </button>
        <h3 className="text-2xl font-bold text-teal-700 mb-4 text-center">
          Start New Backtest
        </h3>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block mb-2 text-sm font-medium text-gray-700">
                Select Fund <span className="text-red-500">*</span>
              </label>
              <select
                name="fund"
                value={formData.fund}
                onChange={handleChange}
                required
                className="w-full border border-gray-300 p-3 rounded-lg focus:ring-teal-500 focus:outline-none"
              >
                <option value="">Select Fund</option>
                {mockFunds.map((fund) => (
                  <option key={fund.id} value={fund.id}>{fund.name}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block mb-2 text-sm font-medium text-gray-700">
                Strategy <span className="text-red-500">*</span>
              </label>
              <select
                name="strategyId"
                value={formData.strategyId}
                onChange={handleChange}
                required
                className="w-full border border-gray-300 p-3 rounded-lg focus:ring-teal-500 focus:outline-none"
              >
                <option value="">Select Strategy</option>
                {initialStrategies.map((s) => (
                  <option key={s.id} value={s.id}>{s.name}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block mb-2 text-sm font-medium text-gray-700">
                Stock Symbol <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="stockSymbol"
                value={formData.stockSymbol}
                onChange={handleChange}
                required
                className="w-full border border-gray-300 p-3 rounded-lg focus:ring-teal-500 focus:outline-none"
              />
            </div>
            <div>
              <label className="block mb-2 text-sm font-medium text-gray-700">
                Capital Allocation (%) <span className="text-red-500">*</span>
              </label>
              <input
                type="number"
                name="capitalAllocation"
                value={formData.capitalAllocation}
                onChange={handleChange}
                required
                className="w-full border border-gray-300 p-3 rounded-lg focus:ring-teal-500 focus:outline-none"
              />
            </div>
            <div>
              <label className="block mb-2 text-sm font-medium text-gray-700">
                Valid From <span className="text-red-500">*</span>
              </label>
              <input
                type="date"
                name="validFrom"
                value={formData.validFrom}
                onChange={handleChange}
                required
                className="w-full border border-gray-300 p-3 rounded-lg focus:ring-teal-500 focus:outline-none"
              />
            </div>
            <div>
              <label className="block mb-2 text-sm font-medium text-gray-700">
                Valid To <span className="text-red-500">*</span>
              </label>
              <input
                type="date"
                name="validTo"
                value={formData.validTo}
                onChange={handleChange}
                required
                className="w-full border border-gray-300 p-3 rounded-lg focus:ring-teal-500 focus:outline-none"
              />
            </div>
          </div>
          <div className="flex justify-end mt-6">
            <button
              type="submit"
              className="bg-teal-600 text-white px-4 py-2 rounded hover:bg-teal-700 transition"
            >
              Save Simulation
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
