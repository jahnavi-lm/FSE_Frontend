import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getAllSchemInvestedByInvestor } from "../../api/investorApi"

function InvDashPortfolio() {
  const [funds, setFunds] = useState([]);
  const [loading, setLoading] = useState(true);
  const investorId = localStorage.getItem("investorId"); 

  function handleTakeActionClick() {
    window.scrollTo(0, 0);
  }

  useEffect(() => {
    async function fetchPortfolio() {
      try {
        const data = await getAllSchemInvestedByInvestor(investorId);
        setFunds(data);
      } catch (error) {
        console.error("Failed to fetch portfolio:", error);
        setFunds([]);
      } finally {
        setLoading(false);
      }
    }

    if (investorId) {
      fetchPortfolio();
    }
  }, [investorId]);

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
                <th className="p-3 font-semibold">Buy / Sell</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-blue-100">
              {loading ? (
                <tr>
                  <td colSpan="6" className="p-4 text-center text-gray-500">Loading portfolio...</td>
                </tr>
              ) : funds.length === 0 ? (
                <tr>
                  <td colSpan="6" className="p-4 text-center text-gray-500">No investments found.</td>
                </tr>
              ) : (
                funds.map((fund) => (
                  <tr key={fund.id}>
                    <td className="p-3 font-medium text-gray-800">{fund.name}</td>
                    <td className="p-3 text-gray-700">₹{fund.invested.toLocaleString()}</td>
                    <td className="p-3 text-gray-700">₹{fund.nav}</td>
                    <td className="p-3 text-gray-700">{fund.percent}%</td>
                    <td className={`p-3 font-semibold ${fund.profit >= 0 ? "text-green-600" : "text-red-600"}`}>
                      ₹{fund.profit.toLocaleString()}
                    </td>
                    <td className="p-3">
                      <Link
                        onClick={handleTakeActionClick}
                        to={`/view/fund/${fund.id}`}
                        className="bg-indigo-600 hover:bg-indigo-700 text-white px-3 py-1 rounded-md text-sm transition duration-200"
                      >
                        Take Action
                      </Link>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Pro Tip Section */}
      <div className="bg-blue-50 border border-blue-200 p-6 rounded-xl shadow-inner">
        <h3 className="text-xl font-semibold text-blue-700 mb-3">
          📈 Pro Tip
        </h3>
        <p className="text-gray-700">
          Invest consistently in SIPs and review your asset allocation every 6 months.
        </p>
      </div>

      {/* Market Insight */}
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
