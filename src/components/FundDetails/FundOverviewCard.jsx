import React from "react";

function FundOverviewCard({ fundId }) {
  return (
    <div className="bg-white shadow-xl rounded-2xl p-6">
      <h2 className="text-2xl font-bold text-indigo-700 mb-4">Axis Bluechip Fund</h2>
      <p className="text-gray-700">👤 <strong>Fund Manager:</strong> Mr. Sharma</p>
      <p className="text-gray-700">💰 <strong>Invested:</strong> ₹50,000</p>
      <p className="text-gray-700">📊 <strong>Holdings:</strong> 12.5% | 810 units</p>
      <p className="text-gray-700">📈 <strong>Current NAV:</strong> ₹61.34</p>
    </div>
  );
}
export default FundOverviewCard;