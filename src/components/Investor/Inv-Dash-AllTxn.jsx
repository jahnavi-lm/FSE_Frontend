import React, { useState , useEffect } from "react";
import { getInvestorTransactions } from "../../api/investorApi"; 
import { Link } from 'react-router-dom';

function InvDashTransactions() {
  const [activeTab, setActiveTab] = useState("invest");

  const bankTransactions = [
    {
      date: "2024-06-10",
      type: "Deposit",
      amount: 15000,
      mode: "UPI",
      reference: "TXN12345678",
    },
    {
      date: "2024-06-15",
      type: "Withdrawal",
      amount: 5000,
      mode: "Bank Transfer",
      reference: "TXN87654321",
    },
  ];

  const [investmentHistory, setInvestmentHistory] = useState([]);
  useEffect(() => {
  const investorId = JSON.parse(localStorage.getItem("user"))?.id;
  if (!investorId) return;

  getInvestorTransactions(investorId)
    .then(setInvestmentHistory)
    .catch((err) => {
      console.error("Failed to fetch transactions", err);
      setInvestmentHistory([]);
    });
}, []);


  return (
    <div className="flex flex-col space-y-6">
      <div className="bg-blue-50 border border-blue-200 p-6 rounded-xl shadow-inner">
        <h3 className="text-xl font-semibold text-blue-700 mb-4">
          My Transactions
        </h3>

        {/* Toggle buttons */}
        <div className="flex justify-center space-x-2 mb-6">
          <button
            onClick={() => setActiveTab("bank")}
            className={`px-4 py-2 rounded-full border font-medium ${
              activeTab === "bank"
                ? "bg-indigo-600 text-white border-indigo-600"
                : "bg-white text-indigo-600 border-indigo-600 hover:bg-indigo-50"
            }`}
          >
            Bank/Wallet Txns
          </button>
          <button
            onClick={() => setActiveTab("invest")}
            className={`px-4 py-2 rounded-full border font-medium ${
              activeTab === "invest"
                ? "bg-indigo-600 text-white border-indigo-600"
                : "bg-white text-indigo-600 border-indigo-600 hover:bg-indigo-50"
            }`}
          >
            Investment History
          </button>
        </div>

        {/* Content */}
        {activeTab === "bank" ? (
          <>
            <p className="text-gray-700 mb-4">
              Here's a record of your bank or wallet transactions related to your account.
            </p>
            <div className="overflow-x-auto">
              <table className="w-full table-fixed text-sm text-left border border-blue-100 rounded-lg shadow-sm">
                <thead className="bg-blue-100 text-blue-800">
                  <tr>
                    <th className="p-3 font-semibold w-[140px]">Date</th>
                    <th className="p-3 font-semibold w-[120px]">Type</th>
                    <th className="p-3 font-semibold w-[120px]">Amount ₹</th>
                    <th className="p-3 font-semibold w-[120px]">Mode</th>
                    <th className="p-3 font-semibold w-[200px]">Reference ID</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-blue-100">
                  {bankTransactions.map((txn, idx) => (
                    <tr key={idx}>
                      <td className="p-3 text-gray-700">{txn.date}</td>
                      <td className="p-3 text-gray-700">{txn.type}</td>
                      <td className="p-3 text-gray-700">₹{txn.amount}</td>
                      <td className="p-3 text-gray-700">{txn.mode}</td>
                      <td className="p-3 text-gray-700">{txn.reference}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </>
        ) : (
          <>
            <p className="text-gray-700 mb-4">
              Below is your mutual fund investment activity.
            </p>
            <div className="overflow-x-auto">
              <table className="w-full table-fixed text-sm text-left border border-blue-100 rounded-lg shadow-sm">
                <thead className="bg-blue-100 text-blue-800">
                  <tr>
                    <th className="p-3 font-semibold w-[140px]">Date</th>
                    <th className="p-3 font-semibold w-[240px]">Fund Name</th>
                    <th className="p-3 font-semibold w-[100px]">Action</th>
                    <th className="p-3 font-semibold w-[120px]">Amount ₹</th>
                    <th className="p-3 font-semibold w-[100px]">NAV</th>
                    <th className="p-3 font-semibold w-[100px]">Units</th>
                    <th className="p-3 font-semibold w-[100px]">View Fund</th>
                     
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-blue-100">
                  {investmentHistory.map((txn, idx) => (
                <tr key={idx}>
                  <td className="p-3 text-gray-700">
                    {new Date(txn.txnTime).toLocaleDateString()}
                  </td>
                  <td className="p-3 text-gray-700 truncate" title={txn.schemeName}>
                    {txn.schemeName}
                  </td>
                  <td className="p-3 text-gray-700">{txn.type}</td>
                  <td className="p-3 text-gray-700">₹{txn.amount.toFixed(2)}</td>
                  <td className="p-3 text-gray-700">{txn.navAtTransaction.toFixed(2)}</td>
                  <td className="p-3 text-gray-700">{txn.units.toFixed(4)}</td>
                  <td className="p-3">
                     <Link
                        to={`/view/fund/${txn.schemeId}`}
                        className="bg-indigo-600 hover:bg-indigo-700 text-white px-3 py-1 rounded-md text-sm transition duration-200"
                      >
                        View
                      </Link>
                  </td>
                </tr>
              ))}

                </tbody>
              </table>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default InvDashTransactions;
