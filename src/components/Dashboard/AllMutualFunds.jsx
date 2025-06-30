import React from "react";

export default function AllMutualFunds({ onEdit = () => {}, onCreate = () => {} }) {
  const mockFunds = [
    { id: "1", name: "Axis Bluechip Fund", type: "Equity", currentNav: 52.45, riskLevel: "High", category: "Large Cap", status: "Active" },
    { id: "2", name: "HDFC Flexi Cap Fund", type: "Equity", currentNav: 91.20, riskLevel: "Moderate", category: "Flexi Cap", status: "Active" },
    { id: "3", name: "Nippon India Small Cap", type: "Equity", currentNav: 142.76, riskLevel: "High", category: "Small Cap", status: "Active" },
    { id: "4", name: "ICICI Prudential Value Discovery", type: "Equity", currentNav: 111.32, riskLevel: "Moderate", category: "Value", status: "Active" },
    { id: "5", name: "Parag Parikh Flexi Cap", type: "Equity", currentNav: 71.92, riskLevel: "Low", category: "Flexi Cap", status: "Active" },
    { id: "6", name: "SBI Equity Hybrid Fund", type: "Hybrid", currentNav: 54.63, riskLevel: "Moderate", category: "Aggressive Hybrid", status: "Active" },
    { id: "7", name: "UTI Nifty Index Fund", type: "Index", currentNav: 129.51, riskLevel: "Low", category: "Index Fund", status: "Active" },
    { id: "8", name: "Mirae Asset Large Cap Fund", type: "Equity", currentNav: 87.38, riskLevel: "High", category: "Large Cap", status: "Active" },
    { id: "9", name: "Kotak Emerging Equity", type: "Equity", currentNav: 85.12, riskLevel: "High", category: "Mid Cap", status: "Active" },
    { id: "10", name: "Aditya Birla Sun Life Tax Relief 96", type: "ELSS", currentNav: 102.23, riskLevel: "High", category: "Tax Saving", status: "Active" },
  ];

  return (
    <div className="bg-white p-6 rounded-xl shadow-md border border-gray-200">
      <div className="flex justify-between items-center mb-5">
        <h2 className="text-2xl font-bold text-gray-800">📊 All Mutual Funds</h2>
        <button
          className="bg-teal-600 hover:bg-teal-700 text-white px-4 py-2 rounded-md text-sm font-medium transition duration-200"
          onClick={onCreate}
        >
          + Add Mutual Fund
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full border divide-y divide-gray-200 text-sm">
          <thead className="bg-gray-50">
            <tr className="text-left">
              <th className="p-3 font-bold text-gray-600 uppercase">Name</th>
              <th className="p-3 font-bold text-gray-600 uppercase">Type</th>
              <th className="p-3 font-bold text-gray-600 uppercase">NAV</th>
              <th className="p-3 font-bold text-gray-600 uppercase">Risk</th>
              <th className="p-3 font-bold text-gray-600 uppercase">Category</th>
              <th className="p-3 font-bold text-gray-600 uppercase">Status</th>
              <th className="p-3 font-bold text-gray-600 uppercase text-right">Action</th>
            </tr>
          </thead>

          <tbody className="bg-white divide-y divide-gray-100">
            {mockFunds.map((fund) => (
              <tr key={fund.id} className="hover:bg-gray-50 transition">
                <td className="p-3 font-semibold text-gray-800">{fund.name}</td>
                <td className="p-3 font-medium text-gray-700">{fund.type}</td>
                <td className="p-3 font-medium text-gray-700">₹{fund.currentNav.toFixed(2)}</td>
                <td className="p-3 font-medium text-gray-700">{fund.riskLevel}</td>
                <td className="p-3 font-medium text-gray-700">{fund.category}</td>
                <td className="p-3 font-medium text-green-600">{fund.status}</td>
                <td className="p-3 text-right">
                  <button
                    onClick={() => onEdit(fund)}
                    className="bg-indigo-100 text-indigo-600 hover:bg-indigo-200 px-3 py-1 rounded-full text-xs font-semibold transition"
                  >
                    ✏️ Edit
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
