// import React from "react";
// import { FaEdit, FaShieldAlt } from "react-icons/fa";

// const MyAccount = () => {
//   const user = {
//     name: "Anshu",
//     userId: "USR123456",
//     email: "anshu.raj@bounteous.com",
//     contact: "8229085892",
//     kycStatus: "Verified",
//     kycValidTill: "2025-12-31",
//     bank: {
//       accountHolder: "Manish Patel",
//       accountNumber: "XXXX-XXXX-1234",
//       ifsc: "ICIC0001234",
//     },
//   };

//   return (
//     <div className="max-w-7xl mx-auto px-6 py-6 min-h-screen">
//       <h2 className="text-2xl font-bold text-gray-800 mb-6">
//         Hi, {user.name} 👋
//       </h2>

//       {/* Profile Section */}
//       <section className="bg-white rounded-xl border border-gray-200 p-6 mb-6 shadow-sm">
//         <div className="flex justify-between items-center mb-4">
//           <h3 className="text-lg font-semibold text-gray-700">Your Profile</h3>
//           <FaEdit className="text-blue-600 hover:text-blue-800 cursor-pointer" title="Edit Profile" />
//         </div>
//         <div className="grid sm:grid-cols-2 gap-4 text-sm text-gray-700 mb-4">
//           <p><strong>Name:</strong> {user.name}</p>
//           <p><strong>User ID:</strong> {user.userId}</p>
//           <p><strong>Email:</strong> {user.email}</p>
//           <p><strong>Contact:</strong> {user.contact}</p>
//         </div>
//         <button className="text-sm bg-teal-600 text-white px-4 py-2 rounded hover:bg-teal-700 transition">
//           Change Password
//         </button>
//       </section>

//       {/* KYC Section */}
//       <section className="bg-white rounded-xl border border-gray-200 p-6 mb-6 shadow-sm">
//         <div className="flex justify-between items-center mb-4">
//           <h3 className="text-lg font-semibold text-gray-700">KYC Status</h3>
//         </div>
//         <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center text-sm text-gray-700 gap-2">
//           <div className="flex items-center gap-2">
//             <FaShieldAlt className="text-green-600" />
//             <span>Verified until: {user.kycValidTill}</span>
//           </div>
//           <button className="text-sm bg-gray-300 text-gray-700 px-4 py-2 rounded cursor-not-allowed" disabled>
//             Request Update
//           </button>
//         </div>
//       </section>

//       {/* Bank Details */}
//       <section className="bg-white rounded-xl border border-gray-200 p-6 mb-6 shadow-sm">
//         <div className="flex justify-between items-center mb-4">
//           <h3 className="text-lg font-semibold text-gray-700">Bank Account Details</h3>
//           <FaEdit className="text-blue-600 hover:text-blue-800 cursor-pointer" title="Edit Bank Details" />
//         </div>
//         <div className="grid sm:grid-cols-2 gap-4 text-sm text-gray-700">
//           <p><strong>Account Holder:</strong> {user.bank.accountHolder}</p>
//           <p><strong>Account Number:</strong> {user.bank.accountNumber}</p>
//           <p><strong>IFSC:</strong> {user.bank.ifsc}</p>
//         </div>
//       </section>

//       {/* Login History */}
//       <section className="bg-white rounded-xl border border-gray-200 p-6 mb-6 shadow-sm">
//         <h3 className="text-lg font-semibold text-gray-700 mb-3">Your Login History</h3>
//         <div className="text-sm text-gray-500 italic">
//           ✨ Feature will be updated soon ✨
//         </div>
//       </section>
//     </div>
//   );
// };

// export default MyAccount;

import React, { useEffect, useState } from "react";
import axios from "axios";
import { FaUserCircle, FaEdit } from "react-icons/fa";
import {
  MdBadge,
  MdSchool,
  MdWork,
  MdInfo,
  MdCalendarToday,
  MdLocationOn,
  MdAccountBalance,
  MdAttachMoney,
  MdPerson,
} from "react-icons/md";

const MyAccount = () => {
  const [profile, setProfile] = useState(null);
  const [role, setRole] = useState(""); // FUND_MANAGER or INVESTOR
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    const userId = user?.id;
    const userRole = user?.role;

    if (!userId || !userRole) {
      alert("⚠️ User not logged in. Please log in again.");
      setLoading(false);
      return;
    }

    setRole(userRole);

    const fetchProfile = async () => {
      try {
        const endpoint =
          userRole === "MANAGER"
            ? `http://localhost:8080/api/fundManagers/${userId}`
            : `http://localhost:8080/api/investors/profile/${userId}`;

        const response = await axios.get(endpoint);
        setProfile(response.data);
      } catch (error) {
        console.error("❌ Error fetching profile:", error);
        alert("Failed to load profile. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-[60vh]">
        <p className="text-blue-600 text-lg font-semibold animate-pulse">
          Loading profile...
        </p>
      </div>
    );
  }

  if (!profile) {
    return (
      <div className="flex justify-center items-center h-[60vh]">
        <p className="text-red-600 text-lg font-semibold">Profile not found</p>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-6 py-6 min-h-screen">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">
        Welcome back, {profile.name || profile.fullName || "User"} 👋
      </h2>

      <section className="bg-white rounded-xl border border-gray-200 p-6 mb-6 shadow-sm">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold text-gray-700">
            {role === "MANAGER" ? "Fund Manager Profile" : "Investor Profile"}
          </h3>
          <FaEdit
            className="text-blue-600 hover:text-blue-800 cursor-pointer"
            title="Edit Profile"
          />
        </div>

        <div className="grid sm:grid-cols-2 gap-4 text-sm text-gray-700 mb-4">
          {role === "MANAGER" ? (
            <>
              <p>
                <strong>
                  <MdBadge className="inline-block mr-1 text-blue-500" />
                  Employee Code:
                </strong>{" "}
                {profile.employeeCode}
              </p>
              <p>
                <strong>
                  <MdSchool className="inline-block mr-1 text-blue-500" />
                  Qualification:
                </strong>{" "}
                {profile.qualification}
              </p>
              <p>
                <strong>
                  <MdWork className="inline-block mr-1 text-blue-500" />
                  Experience:
                </strong>{" "}
                {profile.experienceYears} years
              </p>
              <p className="sm:col-span-2">
                <strong>
                  <MdInfo className="inline-block mr-1 text-blue-500" />
                  Bio:
                </strong>{" "}
                {profile.bio}
              </p>
            </>
          ) : (
            <>
              <p>
                <strong>
                  <MdCalendarToday className="inline-block mr-1 text-green-500" />
                  DOB:
                </strong>{" "}
                {profile.dob}
              </p>
              <p>
                <strong>
                  <MdPerson className="inline-block mr-1 text-green-500" />
                  Guardian:
                </strong>{" "}
                {profile.guardianName || "N/A"}
              </p>
              <p>
                <strong>
                  <MdPerson className="inline-block mr-1 text-green-500" />
                  Nominee:
                </strong>{" "}
                {profile.nomineeName}
              </p>
              <p>
                <strong>
                  <MdWork className="inline-block mr-1 text-green-500" />
                  Occupation:
                </strong>{" "}
                {profile.occupation}
              </p>
              <p>
                <strong>
                  <MdAttachMoney className="inline-block mr-1 text-green-500" />
                  Annual Income:
                </strong>{" "}
                ₹{profile.annualIncome}
              </p>
              <p>
                <strong>
                  <MdBadge className="inline-block mr-1 text-green-500" />
                  PAN:
                </strong>{" "}
                {profile.panNumber}
              </p>
              <p>
                <strong>
                  <MdAccountBalance className="inline-block mr-1 text-green-500" />
                  Bank A/C:
                </strong>{" "}
                {profile.bankAccountNo}
              </p>
              <p>
                <strong>
                  <MdAccountBalance className="inline-block mr-1 text-green-500" />
                  IFSC Code:
                </strong>{" "}
                {profile.ifscCode}
              </p>
              <p className="sm:col-span-2">
                <strong>
                  <MdLocationOn className="inline-block mr-1 text-green-500" />
                  Address:
                </strong>{" "}
                {profile.address}
              </p>
            </>
          )}
        </div>
      </section>

      <section className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
        <h3 className="text-lg font-semibold text-gray-700 mb-3">Additional Info</h3>
        <p className="text-sm text-gray-500 italic">✨ More features coming soon ✨</p>
      </section>
    </div>
  );
};

export default MyAccount;
