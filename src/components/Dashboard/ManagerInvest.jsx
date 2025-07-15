import React, { useEffect, useState } from "react";
import { fetchSchemesByManager } from "../../api/fundManagerApi";

export default function ManagerInvest({ managerId }) {
  const [schemes, setSchemes] = useState([]);

  useEffect(() => {
    const loadData = async () => {
      try {
        const data = await fetchSchemesByManager(managerId);
        setSchemes(data);
      } catch (err) {
        console.error("Error fetching schemes:", err);
      }
    };

    if (managerId) loadData();
  }, [managerId]);

  const handleAction = (type, scheme) => {
    console.log(`${type} clicked for scheme:`, scheme);
    // Later: open Buy/Sell modal
  };

  return (
    <div className="bg-green-50 border border-green-200 p-6 rounded-xl shadow-inner mt-6">
      <h3 className="text-xl font-semibold text-green-700 mb-4">
        📋 Fund Manager's Scheme Overview
      </h3>

      {schemes.length === 0 ? (
        <p className="text-sm text-gray-600">No schemes assigned yet.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full border text-sm bg-white">
            <thead className="bg-green-100">
              <tr>
                <th className="px-4 py-2 border">Scheme Name</th>
                <th className="px-4 py-2 border">Category</th>
                <th className="px-4 py-2 border">AUM (₹)</th>
                <th className="px-4 py-2 border">NAV (₹)</th>
                <th className="px-4 py-2 border">Risk</th>
                <th className="px-4 py-2 border">Launched</th>
                <th className="px-4 py-2 border">Actions</th>
              </tr>
            </thead>
            <tbody>
              {schemes.map((scheme) => (
                <tr key={scheme.id} className="hover:bg-green-50">
                  <td className="px-4 py-2 border">{scheme.name}</td>
                  <td className="px-4 py-2 border">{scheme.category}</td>
                  <td className="px-4 py-2 border">₹{scheme.aum.toLocaleString()}</td>
                  <td className="px-4 py-2 border">₹{scheme.currentNav}</td>
                  <td className="px-4 py-2 border">{scheme.riskLevel}</td>
                  <td className="px-4 py-2 border">{scheme.launchDate}</td>
                  <td className="px-4 py-2 border text-center">
                    <div className="flex justify-center gap-2">
                      <button
                        className="bg-blue-600 text-white px-3 py-1 rounded-md text-xs hover:bg-blue-700"
                        onClick={() => handleAction("Buy", scheme)}
                      >
                        Buy
                      </button>
                      <button
                        className="bg-red-500 text-white px-3 py-1 rounded-md text-xs hover:bg-red-600"
                        onClick={() => handleAction("Sell", scheme)}
                      >
                        Sell
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
