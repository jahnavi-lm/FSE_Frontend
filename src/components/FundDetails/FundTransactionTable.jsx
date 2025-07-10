import React, { useEffect, useState } from "react";
import { getTransactionsForFund } from "../../api/investorApi"; // Ensure path is correct

function FundTransactionTable({ fundId }) {
  const [txns, setTxns] = useState([]);
  const [loading, setLoading] = useState(true);
  const investorId = JSON.parse(localStorage.getItem("user"))?.id;
  //console.log(investorId);

  useEffect(() => {
    if (!fundId || !investorId) return;

    setLoading(true);
    getTransactionsForFund(investorId, fundId)
      .then((res) => setTxns(res))
      .catch((err) => {
        console.error("Failed to load transactions", err);
        setTxns([]);
      })
      .finally(() => setLoading(false));
  }, [fundId, investorId]);

  return (
    <div className="bg-white shadow-xl rounded-2xl p-6">
      <h3 className="text-xl font-semibold text-indigo-700 mb-4">
        Transaction History
      </h3>

      {loading ? (
        <p className="text-gray-500 text-sm">Loading...</p>
      ) : txns.length === 0 ? (
        <p className="text-sm text-gray-500">No transactions found for this fund.</p>
      ) : (
        <table className="w-full text-sm text-left border border-blue-100 rounded-lg shadow-sm">
          <thead className="bg-blue-100 text-blue-800">
            <tr>
              <th className="p-3">Date</th>
              <th className="p-3">Action</th>
              <th className="p-3">Amount ₹</th>
              <th className="p-3">NAV</th>
              <th className="p-3">Units</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-blue-100">
            {txns.map((txn, idx) => (
              <tr key={idx}>
                <td className="p-3">
                  {new Date(txn.txnTime).toLocaleDateString()}
                </td>
                <td className="p-3">{txn.type}</td>
                <td className="p-3">₹{txn.amount.toFixed(2)}</td>
                <td className="p-3">₹{txn.navAtTransaction.toFixed(2)}</td>
                <td className="p-3">{txn.units.toFixed(4)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default FundTransactionTable;
