import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchResults, setSelectedResult, clearSelectedResult } from "../../features/results/resultsSlice";
import ResultDetail from "./ResultsDetails";

export default function Results() {
  const dispatch = useDispatch();
  const { results, selected, status } = useSelector((state) => state.results);

  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchResults());
    }
  }, [status, dispatch]);
  
  if (status === 'loading') {
    return (
      <div className="bg-blue-50 border border-blue-200 p-6 rounded-xl shadow-inner">
        <div className="text-center text-gray-500 py-10">Loading results...</div>
      </div>
    );
  }

  if (!results.length) {
    return (
      <div className="bg-blue-50 border border-blue-200 p-6 rounded-xl shadow-inner">
        <div className="text-center text-gray-500 py-10">
          No results yet. Complete some backtests!
        </div>
      </div>
    );
  }

  return (
    <div className="bg-blue-50 border border-blue-200 p-6 rounded-xl shadow-inner">
      <div className="max-w-7xl mx-auto px-6 py-6">
        <h2 className="text-xl font-bold mb-4">📈 Backtest Results</h2>

        {selected ? (
          <ResultDetail result={selected} onBack={() => dispatch(clearSelectedResult())} />
        ) : (
          <div className="overflow-x-auto bg-white border rounded-xl shadow-sm">
            <table className="min-w-full text-sm text-left">
              <thead className="bg-gray-100">
                <tr>
                  <th className="px-4 py-3 border-b">Stock</th>
                  <th className="px-4 py-3 border-b">Fund</th>
                  <th className="px-4 py-3 border-b">Strategy</th>
                  <th className="px-4 py-3 border-b">Simulated P&L</th>
                  <th className="px-4 py-3 border-b">Actions</th>
                </tr>
              </thead>
              <tbody>
                {results.map((r) => (
                  <tr key={r.id} className="hover:bg-gray-50">
                    <td className="px-4 py-3 border-b">{r.stockSymbol}</td>
                    <td className="px-4 py-3 border-b">{r.fund}</td>
                    <td className="px-4 py-3 border-b">{r.strategyId}</td>
                    <td className="px-4 py-3 border-b">₹{r.simulatedPnL.toFixed(2)}</td>
                    <td className="px-4 py-3 border-b">
                      <button
                        onClick={() => dispatch(setSelectedResult(r))}
                        className="px-3 py-1 bg-teal-600 text-white rounded hover:bg-teal-700"
                      >
                        View
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}