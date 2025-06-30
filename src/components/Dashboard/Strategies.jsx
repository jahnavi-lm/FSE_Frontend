import { useState } from 'react';
import { initialStrategies } from '../../../Data/strategiesData';
import StrategiesForm from "./StrategiesForm";

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
    <div className="max-w-7xl mx-auto px-6 py-6">

      <div className="flex justify-end mb-4">
        <button
          onClick={handleAddStrategy}
          className="px-5 py-2 bg-teal-600 text-white rounded hover:bg-teal-700 transition"
        >
          + Add Strategy
        </button>
      </div>

      <div className=" bg-white overflow-x-auto border rounded-xl shadow-sm">
        <table className="min-w-full text-sm text-left">
          <thead className="bg-gray-100 text-gray-700">
            <tr>
              <th className="px-4 py-3 border-b">Name</th>
              <th className="px-4 py-3 border-b">Type</th>
              <th className="px-4 py-3 border-b">Edit</th>
              <th className="px-4 py-3 border-b">Delete</th>
            </tr>
          </thead>
          <tbody>
            {strategies.map((strategy) => (
              <tr key={strategy.id} className="hover:bg-gray-50">
                <td className="px-4 py-3 border-b text-bold">{strategy.name}</td>
                <td className="px-4 py-3 border-b">{strategy.type}</td>
                <td className="px-4 py-3 border-b">
                  <button
                    onClick={() => handleEdit(strategy.id)}
                    className="text-blue-600 hover:text-blue-800"
                  >
                    Edit
                  </button>
                </td>
                <td className="px-4 py-3 border-b">
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
                <td colSpan="4" className="text-center py-6 text-gray-500">
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
    </div>
  );
}