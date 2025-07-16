
// import React, { useState } from "react";
// import MutualFundPopup from "../Forms/CreateMutualFund";
// import EditMutualFundPopup from "../Forms/EditMutualFUnd";
// import { defaultFundManagers } from "./AllFundManagers";

// export default function AllMutualFunds({ onEdit = () => {}, onCreate = () => {} }) {
//   const [showPopup, setShowPopup] = useState(false);
//   const [showEditPopup, setShowEditPopup] = useState(false);
//   const [editingFund, setEditingFund] = useState(null);
//   const [assigningFund, setAssigningFund] = useState(null);
//   const [funds, setFunds] = useState([
     
//     { id: "1", name: "Axis Bluechip Fund", type: "Equity", currentNav: 52.45, riskLevel: "High", category: "Large Cap", status: "Active" },
//     { id: "2", name: "HDFC Flexi Cap Fund", type: "Equity", currentNav: 91.20, riskLevel: "Moderate", category: "Flexi Cap", status: "Active" },
//     { id: "3", name: "Nippon India Small Cap", type: "Equity", currentNav: 142.76, riskLevel: "High", category: "Small Cap", status: "Active" },
//     { id: "4", name: "ICICI Prudential Value Discovery", type: "Equity", currentNav: 111.32, riskLevel: "Moderate", category: "Value", status: "Active" },
//     { id: "5", name: "Parag Parikh Flexi Cap", type: "Equity", currentNav: 71.92, riskLevel: "Low", category: "Flexi Cap", status: "Active" },
//     { id: "6", name: "SBI Equity Hybrid Fund", type: "Hybrid", currentNav: 54.63, riskLevel: "Moderate", category: "Aggressive Hybrid", status: "Active" },
//     { id: "7", name: "UTI Nifty Index Fund", type: "Index", currentNav: 129.51, riskLevel: "Low", category: "Index Fund", status: "Active" },
//     { id: "8", name: "Mirae Asset Large Cap Fund", type: "Equity", currentNav: 87.38, riskLevel: "High", category: "Large Cap", status: "Active" },
//     { id: "9", name: "Kotak Emerging Equity", type: "Equity", currentNav: 85.12, riskLevel: "High", category: "Mid Cap", status: "Active" },
//     { id: "10", name: "Aditya Birla Sun Life Tax Relief 96", type: "ELSS", currentNav: 102.23, riskLevel: "High", category: "Tax Saving", status: "Active" },

//   ]);

//   const assignManager = (manager) => {
//     setFunds((prevFunds) =>
//       prevFunds.map((fund) =>
//         fund.id === assigningFund.id ? { ...fund, assignedManager: manager } : fund
//       )
//     );
//     setAssigningFund(null); // Close modal
//   };

//   return (
//     <div className="bg-white p-6 rounded-xl shadow-md border border-gray-200">
//       <div className="flex justify-between items-center mb-5">
//         <h2 className="text-2xl font-bold text-gray-800">📊 All Mutual Funds</h2>
//         <button
//           className="bg-teal-600 hover:bg-teal-700 text-white px-4 py-2 rounded-md text-sm font-medium transition duration-200"
//           onClick={() => setShowPopup(true)}
//         >
//           + Add Mutual Fund
//         </button>
//       </div>

//       <div className="overflow-x-auto">
//         <table className="w-full border divide-y divide-gray-200 text-sm">
//           <thead className="bg-gray-50">
//             <tr className="text-left">
//               <th className="p-3 font-bold text-gray-600 uppercase">Name</th>
//               <th className="p-3 font-bold text-gray-600 uppercase">Type</th>
//               <th className="p-3 font-bold text-gray-600 uppercase">NAV</th>
//               <th className="p-3 font-bold text-gray-600 uppercase">Risk</th>
//               <th className="p-3 font-bold text-gray-600 uppercase">Category</th>
//               <th className="p-3 font-bold text-gray-600 uppercase">Status</th>
//               <th className="p-3 font-bold text-gray-600 uppercase text-right">Action</th>
//             </tr>
//           </thead>

//           <tbody className="bg-white divide-y divide-gray-100">
//             {funds.map((fund) => (
//               <tr key={fund.id} className="hover:bg-gray-50 transition">
//                 <td className="p-3 font-semibold text-gray-800">{fund.name}</td>
//                 <td className="p-3 font-medium text-gray-700">{fund.type}</td>
//                 <td className="p-3 font-medium text-gray-700">₹{fund.currentNav?.toFixed(2)}</td>
//                 <td className="p-3 font-medium text-gray-700">{fund.riskLevel}</td>
//                 <td className="p-3 font-medium text-gray-700">{fund.category}</td>
//                 <td className="p-3 font-medium text-green-600">{fund.status}</td>
               
//                 <td className="p-3 text-right space-x-2">
//                   <button
//                     onClick={() => {
//                       setEditingFund(fund);
//                       setShowEditPopup(true);
//                     }}
//                     className="bg-indigo-100 text-indigo-600 hover:bg-indigo-200 px-3 py-1 rounded-full text-xs font-semibold transition"
//                   >
//                     ✏️ Edit
//                   </button>
//                   <button
//                     onClick={() => setAssigningFund(fund)}
//                     className="bg-yellow-100 text-yellow-700 hover:bg-yellow-200 px-3 py-1 rounded-full text-xs font-semibold transition"
//                   >
//                     👤 Assign FM
//                   </button>
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>

//       {/* Add Modal */}
//       {showPopup && (
//         <MutualFundPopup
//           show={showPopup}
//           onClose={() => setShowPopup(false)}
//           onSaveSuccess={() => setShowPopup(false)}
//         />
//       )}

//       {/* Edit Modal */}
//       {showEditPopup && editingFund && (
//         <EditMutualFundPopup
//           show={showEditPopup}
//           fundData={editingFund}
//           onClose={() => {
//             setShowEditPopup(false);
//             setEditingFund(null);
//           }}
//           onSaveSuccess={() => {
//             setShowEditPopup(false);
//             setEditingFund(null);
//           }}
//         />
//       )}

//       {/* Assign Modal */}
//       {assigningFund && (
//   <div className="fixed inset-0 z-50 bg-black bg-opacity-40 flex items-center justify-center">
//     <div className="bg-white rounded-lg shadow-xl w-[400px] max-w-full p-6">
//       <h3 className="text-lg font-semibold mb-2">
//         Assign Fund Manager to <span className="text-indigo-600">{assigningFund.name}</span>
//       </h3>

//       {assigningFund.assignedManager && (
//         <div className="mb-4 text-sm text-gray-700 bg-gray-100 px-3 py-2 rounded-md border border-gray-300">
//           🔒 Already assigned to: <strong>{assigningFund.assignedManager.user.name}</strong>
//         </div>
//       )}

//       <ul className="space-y-2 max-h-60 overflow-y-auto">
//         {defaultFundManagers.map((manager) => (
//           <li
//             key={manager.id}
//             className="flex items-center justify-between p-2 border rounded hover:bg-gray-100 transition"
//           >
//             <div>
//               <p className="font-bold">{manager.user.name}</p>
//               <p className="text-sm text-gray-600">{manager.qualification}</p>
//             </div>
//             <button
//               className="bg-blue-500 text-white text-xs px-3 py-1 rounded hover:bg-blue-600"
//               onClick={() => assignManager(manager)}
//             >
//               Assign
//             </button>
//           </li>
//         ))}
//       </ul>

//       <button
//         className="mt-4 text-sm text-gray-600 underline hover:text-gray-800"
//         onClick={() => setAssigningFund(null)}
//       >
//         Cancel
//       </button>
//     </div>
//   </div>

//       )}
//     </div>
//   );
// }
import React, { useState, useEffect } from "react";
import axios from "axios";
import MutualFundPopup from "../Forms/CreateMutualFund";
import EditMutualFundPopup from "../Forms/EditMutualFund";

export default function AllMutualFunds() {
  const [showPopup, setShowPopup] = useState(false);
  const [showEditPopup, setShowEditPopup] = useState(false);
  const [editingFund, setEditingFund] = useState(null);
  const [assigningFund, setAssigningFund] = useState(null);
  const [funds, setFunds] = useState([]);
  const [fundManagers, setFundManagers] = useState([]);

  const fundBaseUrl = "http://localhost:8080/api/fund-schemes";
  const managerBaseUrl = "http://localhost:8080/api/fundManagers";

  const fetchFunds = async () => {
    try {
      const response = await axios.get(fundBaseUrl);
      setFunds(response.data);
    } catch (error) {
      console.error("Error fetching funds:", error);
    }
  };

  const fetchFundManagers = async () => {
    try {
      const response = await axios.get(managerBaseUrl);
      setFundManagers(response.data);
    } catch (error) {
      console.error("Error fetching fund managers:", error);
    }
  };

  useEffect(() => {
    fetchFunds();
    fetchFundManagers();
  }, []);

  const assignManager = async (manager) => {
    try {
      await axios.post(`${fundBaseUrl}/${assigningFund.id}/assign-manager`, {
        managerId: manager.id,
      });
      fetchFunds();
      setAssigningFund(null);
    } catch (error) {
      console.error("Error assigning manager:", error);
    }
  };

  return (
    <div className="bg-white p-6 rounded-xl shadow-md border border-gray-200">
      <div className="flex justify-between items-center mb-5">
        <h2 className="text-2xl font-bold text-gray-800">📊 All Mutual Funds</h2>
        <button
          className="bg-teal-600 hover:bg-teal-700 text-white px-4 py-2 rounded-md text-sm font-medium"
          onClick={() => setShowPopup(true)}
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
            {funds.map((fund) => (
              <tr key={fund.id} className="hover:bg-gray-50">
                <td className="p-3 font-semibold text-gray-800">{fund.name}</td>
                <td className="p-3 font-medium text-gray-700">{fund.type}</td>
                <td className="p-3 font-medium text-gray-700">₹{fund.currentNav?.toFixed(2)}</td>
                <td className="p-3 font-medium text-gray-700">{fund.riskLevel}</td>
                <td className="p-3 font-medium text-gray-700">{fund.category}</td>
                <td className="p-3 font-medium text-green-600">{fund.status}</td>
                <td className="p-3 text-right space-x-2">
                  <button
                    onClick={() => {
                      setEditingFund(fund);
                      setShowEditPopup(true);
                    }}
                    className="bg-indigo-100 text-indigo-600 hover:bg-indigo-200 px-3 py-1 rounded-full text-xs font-semibold"
                  >
                    ✏️ Edit
                  </button>
                  <button
                    onClick={() => setAssigningFund(fund)}
                    className="bg-yellow-100 text-yellow-700 hover:bg-yellow-200 px-3 py-1 rounded-full text-xs font-semibold"
                  >
                    👤 Assign FM
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {showPopup && (
        <MutualFundPopup
          show={showPopup}
          onClose={() => setShowPopup(false)}
          onSaveSuccess={() => {
            setShowPopup(false);
            fetchFunds();
          }}
        />
      )}

      {showEditPopup && editingFund && (
        <EditMutualFundPopup
          show={showEditPopup}
          fundData={editingFund}
          onClose={() => {
            setShowEditPopup(false);
            setEditingFund(null);
          }}
          onSaveSuccess={() => {
            setShowEditPopup(false);
            setEditingFund(null);
            fetchFunds();
          }}
        />
      )}

      {assigningFund && (
        <div className="fixed inset-0 z-50 bg-black bg-opacity-40 flex items-center justify-center">
          <div className="bg-white rounded-lg shadow-xl w-[400px] p-6">
            <h3 className="text-lg font-semibold mb-2">
              Assign Fund Manager to <span className="text-indigo-600">{assigningFund.name}</span>
            </h3>

            <ul className="space-y-2 max-h-60 overflow-y-auto">
              {fundManagers.map((manager) => (
                <li
                  key={manager.id}
                  className="flex items-center justify-between p-2 border rounded hover:bg-gray-100"
                >
                  <div>
                    <p className="font-bold">{manager.name}</p>
                    <p className="text-sm text-gray-600">{manager.qualification}</p>
                  </div>
                  <button
                    className="bg-blue-500 text-white text-xs px-3 py-1 rounded hover:bg-blue-600"
                    onClick={() => assignManager(manager)}
                  >
                    Assign
                  </button>
                </li>
              ))}
            </ul>

            <button
              className="mt-4 text-sm text-gray-600 underline hover:text-gray-800"
              onClick={() => setAssigningFund(null)}
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
