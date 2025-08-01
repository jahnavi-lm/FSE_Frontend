import React, { useEffect, useState } from "react";
import axios from "axios";
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
  MdBusiness,
  MdEmail,
  MdPhone,
} from "react-icons/md";

const MyAccount = () => {
  const [profile, setProfile] = useState(null);
  const [role, setRole] = useState(""); 
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
        let endpoint = "";
        if (userRole === "MANAGER") {
          endpoint = `http://localhost:8080/api/fundManagers/${userId}`;
        } else if (userRole === "INVESTOR") {
          endpoint = `http://localhost:8080/api/investors/profile/${userId}`;
        } else if (userRole === "AMC") {
          endpoint = `http://localhost:8080/api/amcs/${userId}`;
        }

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
            {role === "MANAGER"
              ? "Fund Manager Profile"
              : role === "AMC"
              ? "AMC Profile"
              : "Investor Profile"}
          </h3>
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
          ) : role === "AMC" ? (
            <>
              <p>
                <strong>
                  <MdBusiness className="inline-block mr-1 text-purple-500" />
                  AMC Name:
                </strong>{" "}
                {profile.name}
              </p>
              <p>
                <strong>
                  <MdBadge className="inline-block mr-1 text-purple-500" />
                  Registration No:
                </strong>{" "}
                {profile.registrationNo}
              </p>
              <p>
                <strong>
                  <MdEmail className="inline-block mr-1 text-purple-500" />
                  Email:
                </strong>{" "}
                {profile.contactEmail}
              </p>
              <p>
                <strong>
                  <MdPhone className="inline-block mr-1 text-purple-500" />
                  Phone:
                </strong>{" "}
                {profile.contactPhone}
              </p>
              <p className="sm:col-span-2">
                <strong>
                  <MdLocationOn className="inline-block mr-1 text-purple-500" />
                  Office Address:
                </strong>{" "}
                {profile.officeAddress}
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
        <h3 className="text-lg font-semibold text-gray-700 mb-3">
          Additional Info
        </h3>
        <p className="text-sm text-gray-500 italic">
          ✨ More features coming soon ✨
        </p>
      </section>
    </div>
  );
};

export default MyAccount;
