function FundTransactionTable() {
  const txns = [
    { date: "2024-05-10", action: "Buy", amount: 10000, nav: 61.25 },
    { date: "2024-06-05", action: "SIP", amount: 5000, nav: 61.85 },
  ];

  return (
    <div className="bg-white shadow-xl rounded-2xl p-6">
      <h3 className="text-xl font-semibold text-indigo-700 mb-4">Transaction History</h3>
      <table className="w-full text-sm text-left border border-blue-100 rounded-lg shadow-sm">
        <thead className="bg-blue-100 text-blue-800">
          <tr>
            <th className="p-3">Date</th>
            <th className="p-3">Action</th>
            <th className="p-3">Amount ₹</th>
            <th className="p-3">NAV</th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-blue-100">
          {txns.map((txn, idx) => (
            <tr key={idx}>
              <td className="p-3">{txn.date}</td>
              <td className="p-3">{txn.action}</td>
              <td className="p-3">₹{txn.amount}</td>
              <td className="p-3">₹{txn.nav}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}


export default FundTransactionTable;