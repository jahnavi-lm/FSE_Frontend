import { useState } from 'react';
import { initialStrategies } from './Data/strategiesData';
import StrategiesForm from './StrategiesForm';

export default function Strategies() {
  const [strategies, setStrategies] = useState(initialStrategies);
  const [showForm, setShowForm] = useState(false);
  const [editingStrategy, setEditingStrategy] = useState(null);

  const handleAddStrategy = () => {
    setEditingStrategy(null);
    setShowForm(true);
  };

  const handleSaveStrategy = (strategy) => {
    setStrategies((prev) => {
      const exists = prev.some((s) => s.id === strategy.id);
      if (exists) {
        return prev.map((s) => (s.id === strategy.id ? strategy : s));
      }
      return [...prev, strategy];
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

  return (
    <div className="px-6 py-4 bg-white shadow mt-4 mx-4 rounded-xl">
      <h2 className="text-2xl font-bold text-indigo-700 mb-4 border-b pb-2">
        Your Strategies
      </h2>

      <button
        onClick={handleAddStrategy}
        className="mb-4 px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700 transition"
      >
        + Add New Strategy
      </button>

      <div className="overflow-x-auto">
        <table className="min-w-full border">
          <thead className="bg-indigo-100">
            <tr>
              <th className="border px-4 py-2 text-left">Name</th>
              <th className="border px-4 py-2 text-left">Type</th>
              <th className="border px-4 py-2 text-left">Edit</th>
              <th className="border px-4 py-2 text-left">Delete</th>
            </tr>
          </thead>
          <tbody>
            {strategies.map((strategy) => (
              <tr key={strategy.id} className="hover:bg-indigo-50">
                <td className="border px-4 py-2">{strategy.name}</td>
                <td className="border px-4 py-2">{strategy.type}</td>
                <td className="border px-4 py-2">
                  <button
                    onClick={() => handleEdit(strategy.id)}
                    className="text-indigo-600 hover:text-indigo-800"
                  >
                    Edit
                  </button>
                </td>
                <td className="border px-4 py-2">
                  <button
                    onClick={() => handleDelete(strategy.id)}
                    className="text-red-600 hover:text-red-800"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
            {strategies.length === 0 && (
              <tr>
                <td colSpan="5" className="text-center py-4 text-gray-500">
                  No strategies available.
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
    </div>
  );
}
