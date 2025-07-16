
// import React, { useState } from "react";

// // ✅ Exported so other files can import the list
// export const defaultFundManagers = [
//   {
//     id: 1,
//     user: { name: "Rohit Verma" },
//     employeeCode: "FM001",
//     experienceYears: 8,
//     qualification: "MBA Finance",
//     bio: "Specialist in equity funds.",
//   },
//   {
//     id: 2,
//     user: { name: "Neha Sharma" },
//     employeeCode: "FM002",
//     experienceYears: 6,
//     qualification: "CA, CFA",
//     bio: "Focused on debt and hybrid ",
//   },
//   {
//     id: 3,
//     user: { name: "Amit Patel" },
//     employeeCode: "FM003",
//     experienceYears: 10,
//     qualification: "Ph.D. Economics",
//     bio: "Ex-Morgan Stanley",
//   },
//   {
//     id: 4,
//     user: { name: "Sanya Mehta" },
//     employeeCode: "FM004",
//     experienceYears: 4,
//     qualification: "MBA, CFP",
//     bio: "Active fund manager.",
//   },
//   {
//     id: 5,
//     user: { name: "Kabir Anand" },
//     employeeCode: "FM005",
//     experienceYears: 12,
//     qualification: "M.Com, CFA",
//     bio: "Veteran in thematic.",
//   },
// ];

// const AllFundManagers = ({
//   fundManagers = [],
//   onDelete = (id) => console.log("Delete", id),
// }) => {
//   const [managers, setManagers] = useState(
//     fundManagers.length > 0 ? fundManagers : defaultFundManagers
//   );

//   const handleDelete = (id) => {
//     const updatedList = managers.filter((m) => m.id !== id);
//     setManagers(updatedList);
//     onDelete(id);
//   };

//   return (
//     <div className="bg-white border border-gray-200 rounded-xl shadow-md p-6">
//       <h2 className="text-xl font-bold text-gray-800 mb-4">📋 All Fund Managers</h2>
//       <div className="overflow-x-auto">
//         <table className="min-w-full divide-y divide-gray-200">
//           <thead className="bg-gray-50">
//             <tr>
//               <th className="px-4 py-2 text-left text-xs font-extrabold text-gray-600 uppercase">Name</th>
//               <th className="px-4 py-2 text-left text-xs font-extrabold text-gray-600 uppercase">Employee Code</th>
//               <th className="px-4 py-2 text-left text-xs font-extrabold text-gray-600 uppercase">Experience</th>
//               <th className="px-4 py-2 text-left text-xs font-extrabold text-gray-600 uppercase">Qualification</th>
//               <th className="px-4 py-2 text-left text-xs font-extrabold text-gray-600 uppercase">Bio</th>
//               <th className="px-4 py-2 text-right text-xs font-extrabold text-gray-600 uppercase">Actions</th>
//             </tr>
//           </thead>
//           <tbody className="bg-white divide-y divide-gray-100">
//             {managers.map((manager) => (
//               <tr key={manager.id}>
//                 <td className="px-4 py-2 whitespace-nowrap text-sm font-bold text-gray-800">{manager.user?.name}</td>
//                 <td className="px-4 py-2 whitespace-nowrap text-sm font-semibold text-gray-700">{manager.employeeCode}</td>
//                 <td className="px-4 py-2 whitespace-nowrap text-sm font-semibold text-gray-700">{manager.experienceYears} yrs</td>
//                 <td className="px-4 py-2 whitespace-nowrap text-sm font-semibold text-gray-700">{manager.qualification}</td>
//                 <td className="px-4 py-2 whitespace-nowrap text-sm font-semibold text-gray-700 max-w-xs truncate">{manager.bio}</td>
//                 <td className="px-4 py-2 whitespace-nowrap text-right text-sm space-x-2">
//                   <button
//                     onClick={() => handleDelete(manager.id)}
//                     className="bg-red-100 text-red-600 px-3 py-1 rounded-full text-xs font-semibold hover:bg-red-200 transition duration-150"
//                   >
//                     🗑 Delete
//                   </button>
//                 </td>
//               </tr>
//             ))}
//             {managers.length === 0 && (
//               <tr>
//                 <td colSpan="6" className="text-center text-gray-500 py-4">
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

// export default AllFundManagers;

import React, { useEffect, useState } from "react";
import axios from "axios";

const AllFundManagers = ({ onDelete = (id) => console.log("Delete", id) }) => {
  const [managers, setManagers] = useState([]);

  const fetchFundManagers = async () => {
    try {
      const response = await axios.get("http://localhost:8080/api/fundManagers");
      setManagers(response.data);
    } catch (error) {
      console.error("Error fetching fund managers:", error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:8080/api/fundManagers/${id}`);
      setManagers((prev) => prev.filter((manager) => manager.id !== id));
      onDelete(id);
    } catch (error) {
      console.error("Error deleting fund manager:", error);
    }
  };

  useEffect(() => {
    fetchFundManagers();
  }, []);

  return (
    <div className="bg-white border border-gray-200 rounded-xl shadow-md p-6">
      <h2 className="text-xl font-bold text-gray-800 mb-4">📋 All Fund Managers</h2>
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-4 py-2 text-left text-xs font-extrabold text-gray-600 uppercase">Name</th>
              <th className="px-4 py-2 text-left text-xs font-extrabold text-gray-600 uppercase">Employee Code</th>
              <th className="px-4 py-2 text-left text-xs font-extrabold text-gray-600 uppercase">Experience</th>
              <th className="px-4 py-2 text-left text-xs font-extrabold text-gray-600 uppercase">Qualification</th>
              <th className="px-4 py-2 text-left text-xs font-extrabold text-gray-600 uppercase">Bio</th>
              <th className="px-4 py-2 text-right text-xs font-extrabold text-gray-600 uppercase">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-100">
            {managers.length > 0 ? (
              managers.map((manager) => (
                <tr key={manager.id}>
                  <td className="px-4 py-2 text-sm font-bold text-gray-800 whitespace-nowrap">
                    {manager.name}
                  </td>
                  <td className="px-4 py-2 text-sm font-semibold text-gray-700 whitespace-nowrap">
                    {manager.employeeCode}
                  </td>
                  <td className="px-4 py-2 text-sm font-semibold text-gray-700 whitespace-nowrap">
                    {manager.experienceYears} yrs
                  </td>
                  <td className="px-4 py-2 text-sm font-semibold text-gray-700 whitespace-nowrap">
                    {manager.qualification}
                  </td>
                  <td className="px-4 py-2 text-sm font-semibold text-gray-700 max-w-xs truncate whitespace-nowrap">
                    {manager.bio}
                  </td>
                  <td className="px-4 py-2 text-right text-sm space-x-2 whitespace-nowrap">
                    <button
                      onClick={() => handleDelete(manager.id)}
                      className="bg-red-100 text-red-600 px-3 py-1 rounded-full text-xs font-semibold hover:bg-red-200 transition duration-150"
                    >
                      🗑 Delete
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6" className="text-center text-gray-500 py-4">
                  No fund managers found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AllFundManagers;
