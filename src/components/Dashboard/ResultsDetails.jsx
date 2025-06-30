export default function ResultDetail({ result, onBack }) {
    return (
      <div className="bg-white p-6 border rounded-xl shadow-sm">
        <button
          onClick={onBack}
          className="mb-4 text-teal-600 hover:text-teal-800 text-sm"
        >
          ← Back to Results
        </button>
        <h3 className="text-xl font-bold mb-4">📜 Result Details</h3>
        <p><strong>Stock:</strong> {result.stockSymbol}</p>
        <p><strong>Fund:</strong> {result.fund}</p>
        <p><strong>Strategy:</strong> {result.strategyId}</p>
        <p><strong>Simulated P&L:</strong> ₹{result.simulatedPnL}</p>
        <p><strong>Status:</strong> {result.status}</p>
        <h4 className="mt-4 mb-2 font-semibold">Trades:</h4>
        <ul className="list-disc pl-5 text-sm">
          {result.trades.map((t, i) => (
            <li key={i}>
              {t.action} {t.qty} shares at ₹{t.price}
            </li>
          ))}
        </ul>
      </div>
    );
  }
  