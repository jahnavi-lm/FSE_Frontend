import React, { useEffect } from "react";
// import toast from "react-hot-toast";
import { useSelector, useDispatch } from "react-redux";
import {
  fetchStrategies,
  addStrategy,
  removeStrategy,
  runSimulation,
  stopCurrentSimulation,
  fetchResult,
  openForm,
  closeForm,
  closeResult,
} from "../../features/strategies/strategiesSlice";
import StrategiesForm from "./StrategiesForm";
import StrategyResultModal from "../layouts/StrategyResultModal";

export default function Strategies() {
  const dispatch = useDispatch();
  const {
    strategies,
    status,
    showForm,
    editingStrategy,
    showResult,
    runningSimulations,
  } = useSelector((state) => state.strategies);

  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchStrategies());
    }
  }, [status, dispatch]);

  const handleSaveStrategy = async (strategy) => {
    await dispatch(addStrategy(strategy));
    dispatch(closeForm());
    dispatch(fetchStrategies());
  };

  const handleDelete = async (id) => {
    if (confirm("Are you sure you want to delete this strategy?")) {
      await dispatch(removeStrategy(id));
      // toast.success("Strategy deleted successfully!");
    }
  };

  const handleStartSimulation = async (id) => {
    // const toastId = toast.loading("Running simulation...");
    try {
      await dispatch(runSimulation(id));
      // toast.success("Simulation completed successfully!", { id: toastId });
      dispatch(fetchStrategies());
    } catch (error) {
      // toast.error("Failed to start simulation.", { id: toastId });
    }
  };

  const handleViewResult = (id) => {
    dispatch(fetchResult(id));
  };
  
  return (
    <div className="bg-blue-50 border border-blue-200 p-6 rounded-xl shadow-inner">
      <div className="max-w-7xl mx-auto px-6 py-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold text-gray-800 flex items-center gap-2">
            Your Strategies
          </h2>
          <button
            onClick={() => dispatch(openForm())}
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
                <th className="px-4 py-3 border-b">Symbols</th>
                <th className="px-4 py-3 border-b">Status</th>
                <th className="px-4 py-3 border-b">Simulation</th>
                <th className="px-4 py-3 border-b">Result</th>
                <th className="px-4 py-3 border-b">Edit</th>
                <th className="px-4 py-3 border-b">Delete</th>
              </tr>
            </thead>
            <tbody>
              {strategies.map((strategy) => {
                const { id, strategyName, symbolList, status: strategyStatus } = strategy;
                const isRunning = runningSimulations[id];

                return (
                  <tr key={id} className="hover:bg-gray-50">
                    <td className="px-4 py-3 border-b font-semibold">{strategyName}</td>
                    <td className="px-4 py-3 border-b">
                      {symbolList?.length > 3
                        ? `${symbolList.slice(0, 2).join(", ")}...`
                        : symbolList?.join(", ")}
                    </td>
                    <td className="px-4 py-3 border-b capitalize">
                      {strategyStatus?.replace(/_/g, " ")}
                    </td>
                    <td className="px-4 py-3 border-b">
                      {strategyStatus === "running" ? (
                        <button
                          onClick={() => dispatch(stopCurrentSimulation(id))}
                          className="px-3 py-1 bg-red-600 text-white rounded hover:bg-red-700 transition text-xs"
                        >
                          Stop
                        </button>
                      ) : (
                        <button
                          onClick={() => handleStartSimulation(id)}
                          className="px-3 py-1 bg-teal-600 text-white rounded transition text-xs disabled:opacity-50"
                          disabled={strategyStatus === "completed" || isRunning}
                        >
                          {isRunning ? "Running..." : "Start"}
                        </button>
                      )}
                    </td>
                    <td className="px-4 py-3 border-b">
                      {strategyStatus === "completed" ? (
                        <button
                          onClick={() => handleViewResult(id)}
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
                        onClick={() => dispatch(openForm(strategy))}
                        className="text-blue-600 hover:text-blue-800 text-xs"
                      >
                        Edit
                      </button>
                    </td>
                    <td className="px-4 py-3 border-b">
                      <button
                        onClick={() => handleDelete(id)}
                        className="text-red-600 hover:text-red-800 text-xs"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {showForm && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
            <div className="relative bg-white rounded-xl shadow-2xl w-full max-w-3xl max-h-[90vh] overflow-y-auto scrollbar-hide">
              <button
                onClick={() => dispatch(closeForm())}
                className="absolute top-3 right-3 text-gray-500 hover:text-gray-800 text-2xl font-bold"
                aria-label="Close"
              >
                &times;
              </button>
              <StrategiesForm
                initialValues={editingStrategy}
                onSave={handleSaveStrategy}
                onCancel={() => dispatch(closeForm())}
              />
            </div>
          </div>
        )}

        {showResult && (
          <StrategyResultModal
            result={showResult}
            onClose={() => dispatch(closeResult())}
          />
        )}
      </div>
    </div>
  );
}