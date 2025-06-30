import React from "react";

function InvDashAllSchemes() {
  const schemes = [
    {
      name: "Axis Bluechip Fund",
      nav: 61.34,
      category: "Large Cap",
      risk: "Moderate",
      holding: 12.5,
    },
    {
      name: "Parag Parikh Flexi Cap",
      nav: 92.11,
      category: "Flexi Cap",
      risk: "Moderately High",
      holding: 18.2,
    },
    {
      name: "Mirae Asset Emerging Bluechip",
      nav: 83.79,
      category: "Mid Cap",
      risk: "High",
      holding: 7.3,
    },
  ];

  return (
    <div className="flex flex-col space-y-6">
      {/* Section Intro */}
      <div className="bg-blue-50 border border-blue-200 p-6 rounded-xl shadow-inner">
        <h3 className="text-xl font-semibold text-blue-700 mb-4">
          All Mutual Fund Schemes
        </h3>
        <p className="text-gray-700 mb-6">
          Browse and explore available mutual fund schemes. Use this list to learn about NAVs, fund types, risk levels, and your current holding. Click “View” to analyze in detail or invest.
        </p>

        <div className="overflow-x-auto">
          <table className="w-full table-auto text-sm text-left border border-blue-100 rounded-lg shadow-sm">
            <thead className="bg-blue-100 text-blue-800">
              <tr>
                <th className="p-3 font-semibold">Fund Name</th>
                <th className="p-3 font-semibold">Current NAV</th>
                <th className="p-3 font-semibold">Category</th>
                <th className="p-3 font-semibold">Risk</th>
                <th className="p-3 font-semibold">% Holding</th>
                <th className="p-3 font-semibold">Action</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-blue-100">
              {schemes.map((scheme, idx) => (
                <tr key={idx}>
                  <td className="p-3 font-medium text-gray-800">{scheme.name}</td>
                  <td className="p-3 text-gray-700">₹{scheme.nav}</td>
                  <td className="p-3 text-gray-700">{scheme.category}</td>
                  <td className="p-3 text-gray-700">{scheme.risk}</td>
                  <td className="p-3 text-gray-700">{scheme.holding}%</td>
                  <td className="p-3">
                    <button className="bg-indigo-600 hover:bg-indigo-700 text-white px-3 py-1 rounded-md text-sm transition duration-200">
                      View
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Optional Tip or Callout */}
      <div className="bg-blue-50 border border-blue-200 p-6 rounded-xl shadow-inner">
        <h3 className="text-xl font-semibold text-blue-700 mb-3">💡 Did You Know?</h3>
        <p className="text-gray-700">
          Regularly reviewing schemes across categories helps you diversify and balance your risk based on market trends.
        </p>
      </div>
    </div>
  );
}

export default InvDashAllSchemes;
