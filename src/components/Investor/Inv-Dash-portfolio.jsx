import React from "react";

function InvDashPortfolio() {
  const funds = [
    {
      name: "Axis Bluechip Fund",
      invested: 50000,
      nav: 61.34,
      percent: 33.3,
      profit: 7300,
    },
    {
      name: "Parag Parikh Flexi Cap",
      invested: 60000,
      nav: 92.11,
      percent: 40.0,
      profit: 10200,
    },
    {
      name: "SBI Equity Hybrid Fund",
      invested: 40000,
      nav: 58.25,
      percent: 26.7,
      profit: 4500,
    },
  ];

  return (
    <div className="flex flex-col space-y-6">
      {/* Portfolio Overview Section */}
      <div className="bg-blue-50 border border-blue-200 p-6 rounded-xl shadow-inner">
        <h3 className="text-xl font-semibold text-blue-700 mb-4">
          Portfolio Overview
        </h3>
        <p className="text-gray-700 mb-6">
          Here's how your investments are spread across mutual funds and their current performance.
        </p>

        <div className="overflow-x-auto">
          <table className="w-full table-auto text-sm text-left border border-blue-100 rounded-lg shadow-sm">
            <thead className="bg-blue-100 text-blue-800">
              <tr>
                <th className="p-3 font-semibold">Fund Name</th>
                <th className="p-3 font-semibold">Invested (₹)</th>
                <th className="p-3 font-semibold">Current NAV</th>
                <th className="p-3 font-semibold">% Allocation</th>
                <th className="p-3 font-semibold text-green-700">Profit / Loss</th>
                <th className="p-3 font-semibold">Buy /Sell</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-blue-100">
              {funds.map((fund, idx) => (
                <tr key={idx}>
                  <td className="p-3 font-medium text-gray-800">{fund.name}</td>
                  <td className="p-3 text-gray-700">₹{fund.invested.toLocaleString()}</td>
                  <td className="p-3 text-gray-700">₹{fund.nav}</td>
                  <td className="p-3 text-gray-700">{fund.percent}%</td>
                  <td className="p-3 text-green-600 font-semibold">
                    +₹{fund.profit.toLocaleString()}
                  </td>
                  <td className="p-3">
                    <button className="bg-indigo-600 hover:bg-indigo-700 text-white px-3 py-1 rounded-md text-sm transition duration-200">
                      Take Action
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Pro Tip Section 1 */}
      <div className="bg-blue-50 border border-blue-200 p-6 rounded-xl shadow-inner">
        <h3 className="text-xl font-semibold text-blue-700 mb-3">
          📈 Pro Tip
        </h3>
        <p className="text-gray-700">
          Invest consistently in SIPs and review your asset allocation every 6 months.
        </p>
      </div>

      {/* Pro Tip Section 2 (optional duplicate or change message) */}
      <div className="bg-blue-50 border border-blue-200 p-6 rounded-xl shadow-inner">
        <h3 className="text-xl font-semibold text-blue-700 mb-3">
          📉 Market Insight
        </h3>
        <p className="text-gray-700">
          Don’t react to short-term market volatility — focus on your long-term goals.
        </p>
      </div>
    </div>
  );
}

export default InvDashPortfolio;
