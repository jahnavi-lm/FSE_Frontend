// import React, { useState } from "react";
// import { FaMoneyBillWave, FaUserTie } from "react-icons/fa";
// import AllMutualFunds from "../../components/dashboard/AllMutualFunds";
// import AllFundManagers from "../../components/dashboard/AllFundManagers";
// import MutualFundPopup from "../../components/dashboard/MutualFundPopup";
// import EditMutualFundPopup from "../../components/Forms/EditMutualFUnd";

// const AmcDashboard = () => {
//   const [selectedTab, setSelectedTab] = useState("Mutual Funds");
//   const [showCreatePopup, setShowCreatePopup] = useState(false);

//   const tabs = ["Mutual Funds", "Fund Managers", "Overview"];

//   const summaryData = {
//     totalFunds: 11,
//     totalManagers: 6,
//   };

//   return (
//     <div className="max-w-7xl mx-auto px-6 py-6 min-h-screen">
//       {/* Header */}
//       <div className="flex items-center justify-between mb-6">
//         <h1 className="text-2xl font-bold text-gray-800">AMC Admin Dashboard</h1>
       
//       </div>

//       {/* Summary Cards */}
//       <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-6">
//         <div className="bg-white text-blue-700 shadow-sm rounded-xl p-5 border border-blue-200">
//           <div className="flex items-center gap-2 text-lg font-medium">
//             <FaMoneyBillWave />
//             <span>Total Mutual Funds</span>
//           </div>
//           <p className="text-2xl font-bold mt-2">{summaryData.totalFunds}</p>
//         </div>

//         <div className="bg-white text-green-700 shadow-sm rounded-xl p-5 border border-green-200">
//           <div className="flex items-center gap-2 text-lg font-medium">
//             <FaUserTie />
//             <span>Total Fund Managers</span>
//           </div>
//           <p className="text-2xl font-bold mt-2">{summaryData.totalManagers}</p>
//         </div>
//       </div>

//       {/* Tab Section */}
//       <div className="bg-white p-6 border border-gray-200 rounded-xl shadow-sm mb-6">
//         <div className="flex space-x-6 overflow-x-auto mb-6">
//           {tabs.map((tab) => (
//             <button
//               key={tab}
//               onClick={() => setSelectedTab(tab)}
//               className={`pb-2 text-md font-medium transition-all duration-200 ${
//                 selectedTab === tab
//                   ? "text-teal-600 border-b-2 border-teal-600"
//                   : "text-gray-500 hover:text-blue-600"
//               }`}
//             >
//               {tab}
//             </button>
//           ))}
//         </div>

//         {/* Tab Content */}
//         {selectedTab === "Overview" && (
//           <div className="text-gray-700">
//             <h2 className="text-lg font-semibold">Welcome to the AMC Admin Panel</h2>
//             <p className="text-sm mt-2 text-gray-500">
//               Manage all mutual funds and assign fund managers here.
//             </p>
//           </div>
//         )}

//         {selectedTab === "Mutual Funds" && (
//           <AllMutualFunds onCreate={() => setShowCreatePopup(true)} />
//         )}
//         {selectedTab === "Fund Managers" && <AllFundManagers />}
        
//       </div>

//       {/* Create/Edit Fund Modal */}
//       {showCreatePopup && (
//         <MutualFundPopup
//           onClose={() => setShowCreatePopup(false)}
//           onSaveSuccess={() => {
//             setShowCreatePopup(false);
//             // Optionally trigger data reload
//           }}
//         />
//       )}
//     </div>
//   );
// };

// export default AmcDashboard;


import React, { useState, useEffect } from "react";
import { FaMoneyBillWave, FaUserTie } from "react-icons/fa";
import AllMutualFunds from "../../components/dashboard/AllMutualFunds";
import AllFundManagers from "../../components/dashboard/AllFundManagers";
import MutualFundPopup from "../../components/dashboard/MutualFundPopup";
//import EditMutualFundPopup from "../../components/Forms/EditMutualFUnd";
import axios from "axios";

const AmcDashboard = () => {
  const [selectedTab, setSelectedTab] = useState("Mutual Funds");
  const [showCreatePopup, setShowCreatePopup] = useState(false);
  const [summaryData, setSummaryData] = useState({
    totalFunds: 0,
    totalManagers: 0,
  });

  const tabs = ["Mutual Funds", "Fund Managers"];

  const fetchSummaryCounts = async () => {
    try {
      const [fundsRes, managersRes] = await Promise.all([
        axios.get("http://localhost:8080/api/fund-schemes"),
        axios.get("http://localhost:8080/api/fundManagers"),
      ]);

      setSummaryData({
        totalFunds: fundsRes.data.length,
        totalManagers: managersRes.data.length,
      });
    } catch (error) {
      console.error("Error fetching dashboard summary:", error);
    }
  };

  useEffect(() => {
    fetchSummaryCounts();
  }, []);

  return (
    <div className="max-w-7xl mx-auto px-6 py-6 min-h-screen">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-gray-800">AMC Admin Dashboard</h1>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-6">
        <div className="bg-white text-blue-700 shadow-sm rounded-xl p-5 border border-blue-200">
          <div className="flex items-center gap-2 text-lg font-medium">
            <FaMoneyBillWave />
            <span>Total Mutual Funds</span>
          </div>
          <p className="text-2xl font-bold mt-2">{summaryData.totalFunds}</p>
        </div>

        <div className="bg-white text-green-700 shadow-sm rounded-xl p-5 border border-green-200">
          <div className="flex items-center gap-2 text-lg font-medium">
            <FaUserTie />
            <span>Total Fund Managers</span>
          </div>
          <p className="text-2xl font-bold mt-2">{summaryData.totalManagers}</p>
        </div>
      </div>

      {/* Tab Section */}
      <div className="bg-white p-6 border border-gray-200 rounded-xl shadow-sm mb-6">
        <div className="flex space-x-6 overflow-x-auto mb-6">
          {tabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setSelectedTab(tab)}
              className={`pb-2 text-md font-medium transition-all duration-200 ${
                selectedTab === tab
                  ? "text-teal-600 border-b-2 border-teal-600"
                  : "text-gray-500 hover:text-blue-600"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Tab Content */}
        {/* {selectedTab === "Overview" && (
          <div className="text-gray-700">
            <h2 className="text-lg font-semibold">Welcome to the AMC Admin Panel</h2>
            <p className="text-sm mt-2 text-gray-500">
              Manage all mutual funds and assign fund managers here.
            </p>
          </div>
        )} */}

        {selectedTab === "Mutual Funds" && (
          <AllMutualFunds onCreate={() => setShowCreatePopup(true)} />
        )}
        {selectedTab === "Fund Managers" && <AllFundManagers />}
      </div>

      {/* Create/Edit Fund Modal */}
      {showCreatePopup && (
        <MutualFundPopup
          onClose={() => setShowCreatePopup(false)}
          onSaveSuccess={() => {
            setShowCreatePopup(false);
            fetchSummaryCounts(); // Refresh counts on creation
          }}
        />
      )}
    </div>
  );
};

export default AmcDashboard;
