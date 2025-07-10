import React, { useEffect, useState, useMemo } from "react";
import axios from "axios";

const AmcOverview = () => {
  const [fundManagers, setFundManagers] = useState([]);
  const [allFunds, setAllFunds] = useState([]);

  useEffect(() => {
    fetchFundManagers();
    fetchFundSchemes();
  }, []);

  const fetchFundManagers = async () => {
    try {
      const response = await axios.get("http://localhost:8080/api/fundManagers");
      setFundManagers(response.data);
    } catch (error) {
      console.error("Error fetching fund managers:", error);
    }
  };

  const fetchFundSchemes = async () => {
    try {
      const response = await axios.get("http://localhost:8080/api/fund-schemes");
      setAllFunds(response.data);
    } catch (error) {
      console.error("Error fetching fund schemes:", error);
    }
  };

  // Map: fundManagerId -> list of assigned funds
  const managerMap = useMemo(() => {
    const map = {};

    for (const manager of fundManagers) {
      map[manager.id] = {
        ...manager,
        assignedFunds: [],
      };
    }

    for (const fund of allFunds) {
      const manager = fund.assignedManager;
      if (manager && manager.id && map[manager.id]) {
        map[manager.id].assignedFunds.push(fund);
      }
    }

    return Object.values(map);
  }, [fundManagers, allFunds]);

  return (
    <div className="bg-white border border-gray-200 rounded-xl shadow-md p-6">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">
        🏢 Fund Managers & Assigned Mutual Funds
      </h2>

      <div className="overflow-x-auto">
        <table className="min-w-full border divide-y divide-gray-200 text-sm">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-4 py-2 text-left font-bold text-gray-600 uppercase w-1/3">
                Fund Manager
              </th>
              <th className="px-4 py-2 text-left font-bold text-gray-600 uppercase w-2/3">
                Assigned Mutual Funds
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-100">
            {managerMap.map((manager) => (
              <tr key={manager.id} className="align-top">
                <td className="px-4 py-3 font-semibold text-gray-800">
                  {manager.user?.name}
                </td>
                <td className="px-4 py-3 text-gray-700">
                  {manager.assignedFunds.length > 0 ? (
                    <ul className="list-disc ml-5 space-y-1">
                      {manager.assignedFunds.map((fund) => (
                        <li key={fund.id}>
                          <span className="text-indigo-700 font-medium">{fund.name}</span>{" "}
                          <span className="text-gray-500 text-sm">({fund.type})</span>
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <span className="italic text-gray-400">No funds assigned</span>
                  )}
                </td>
              </tr>
            ))}

            {managerMap.length === 0 && (
              <tr>
                <td colSpan="2" className="text-center text-gray-500 py-4">
                  No fund managers or data found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AmcOverview;


// import React, { useMemo } from "react";
// import { defaultFundManagers } from "./AllFundManagers"; // Adjust path as needed

// const AmcOverview = ({
//   fundManagers = defaultFundManagers,
//   allFunds = [], // Accepts backend data
// }) => {
//   // Efficient mapping: fundManagerId -> assignedFunds[]
//   const managerMap = useMemo(() => {
//     const map = {};
//     for (const manager of fundManagers) {
//       map[manager.id] = {
//         ...manager,
//         assignedFunds: [],
//       };
//     }

//     for (const fund of allFunds) {
//       const manager = fund.assignedManager;
//       if (manager && manager.id && map[manager.id]) {
//         map[manager.id].assignedFunds.push(fund);
//       }
//     }

//     return Object.values(map);
//   }, [fundManagers, allFunds]);

//   return (
//     <div className="bg-white border border-gray-200 rounded-xl shadow-md p-6">
//       <h2 className="text-2xl font-bold text-gray-800 mb-6">🏢 Fund Managers & Allocated Mutual Funds</h2>

//       <div className="overflow-x-auto">
//         <table className="min-w-full divide-y divide-gray-200">
//           <thead className="bg-gray-50">
//             <tr>
//               <th className="px-4 py-2 text-left text-xs font-extrabold text-gray-600 uppercase">Name</th>
//               <th className="px-4 py-2 text-left text-xs font-extrabold text-gray-600 uppercase">Employee Code</th>
//               <th className="px-4 py-2 text-left text-xs font-extrabold text-gray-600 uppercase">Experience</th>
//               <th className="px-4 py-2 text-left text-xs font-extrabold text-gray-600 uppercase">Qualification</th>
//               <th className="px-4 py-2 text-left text-xs font-extrabold text-gray-600 uppercase">Allocated Funds</th>
//             </tr>
//           </thead>
//           <tbody className="bg-white divide-y divide-gray-100">
//             {managerMap.map((manager) => (
//               <tr key={manager.id} className="align-top">
//                 <td className="px-4 py-3 font-semibold text-gray-800">{manager.user.name}</td>
//                 <td className="px-4 py-3 text-sm text-gray-700">{manager.employeeCode}</td>
//                 <td className="px-4 py-3 text-sm text-gray-700">{manager.experienceYears} yrs</td>
//                 <td className="px-4 py-3 text-sm text-gray-700">{manager.qualification}</td>
//                 <td className="px-4 py-3 text-sm text-gray-700">
//                   {manager.assignedFunds.length > 0 ? (
//                     <ul className="list-disc pl-4 space-y-1">
//                       {manager.assignedFunds.map((fund) => (
//                         <li key={fund.id}>
//                           <span className="font-medium text-indigo-700">{fund.name}</span> —{" "}
//                           <span className="text-gray-600">{fund.type}</span>
//                         </li>
//                       ))}
//                     </ul>
//                   ) : (
//                     <span className="text-gray-400 italic">No funds assigned</span>
//                   )}
//                 </td>
//               </tr>
//             ))}

//             {managerMap.length === 0 && (
//               <tr>
//                 <td colSpan="5" className="text-center text-gray-500 py-4">
//                   No fund managers found.
//                 </td>
//               </tr>
//             )}
//           </tbody>
//         </table>
//       </div>
//     </div>
//   );
// };

// export default AmcOverview;


// import React from "react";
// import { defaultFundManagers } from "../AllFundManagers";

// export default function FundManagerOverview({ mutualFunds = [] }) {
//   // Group funds by manager ID
//   const fundMap = {};
//   mutualFunds.forEach((fund) => {
//     if (fund.assignedManager) {
//       const managerId = fund.assignedManager.id;
//       if (!fundMap[managerId]) fundMap[managerId] = [];
//       fundMap[managerId].push(fund);
//     }
//   });

//   return (
//     <div className="bg-white p-6 rounded-xl shadow-md border border-gray-200">
//       <h2 className="text-2xl font-bold text-gray-800 mb-4">📋 Fund Manager Overview</h2>
//       <table className="w-full border divide-y divide-gray-200 text-sm">
//         <thead className="bg-gray-50">
//           <tr className="text-left">
//             <th className="p-3 font-bold text-gray-600 uppercase">Fund Manager</th>
//             <th className="p-3 font-bold text-gray-600 uppercase">Employee Code</th>
//             <th className="p-3 font-bold text-gray-600 uppercase">Assigned Mutual Funds</th>
//           </tr>
//         </thead>
//         <tbody className="bg-white divide-y divide-gray-100">
//           {defaultFundManagers.map((manager) => (
//             <tr key={manager.id}>
//               <td className="p-3 font-semibold text-gray-800">{manager.user.name}</td>
//               <td className="p-3 font-medium text-gray-700">{manager.employeeCode}</td>
//               <td className="p-3">
//                 {fundMap[manager.id]?.length > 0 ? (
//                   <ul className="list-disc list-inside space-y-1">
//                     {fundMap[manager.id].map((fund) => (
//                       <li key={fund.id}>{fund.name}</li>
//                     ))}
//                   </ul>
//                 ) : (
//                   <span className="text-gray-500 italic">No assigned funds</span>
//                 )}
//               </td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     </div>
//   );
// }
