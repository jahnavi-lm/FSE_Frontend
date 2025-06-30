import React from "react";
import { defaultFundManagers } from "../AllFundManagers";

export default function FundManagerOverview({ mutualFunds = [] }) {
  // Group funds by manager ID
  const fundMap = {};
  mutualFunds.forEach((fund) => {
    if (fund.assignedManager) {
      const managerId = fund.assignedManager.id;
      if (!fundMap[managerId]) fundMap[managerId] = [];
      fundMap[managerId].push(fund);
    }
  });

  return (
    <div className="bg-white p-6 rounded-xl shadow-md border border-gray-200">
      <h2 className="text-2xl font-bold text-gray-800 mb-4">📋 Fund Manager Overview</h2>
      <table className="w-full border divide-y divide-gray-200 text-sm">
        <thead className="bg-gray-50">
          <tr className="text-left">
            <th className="p-3 font-bold text-gray-600 uppercase">Fund Manager</th>
            <th className="p-3 font-bold text-gray-600 uppercase">Employee Code</th>
            <th className="p-3 font-bold text-gray-600 uppercase">Assigned Mutual Funds</th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-100">
          {defaultFundManagers.map((manager) => (
            <tr key={manager.id}>
              <td className="p-3 font-semibold text-gray-800">{manager.user.name}</td>
              <td className="p-3 font-medium text-gray-700">{manager.employeeCode}</td>
              <td className="p-3">
                {fundMap[manager.id]?.length > 0 ? (
                  <ul className="list-disc list-inside space-y-1">
                    {fundMap[manager.id].map((fund) => (
                      <li key={fund.id}>{fund.name}</li>
                    ))}
                  </ul>
                ) : (
                  <span className="text-gray-500 italic">No assigned funds</span>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
