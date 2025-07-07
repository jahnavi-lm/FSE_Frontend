import React, { useEffect, useState } from "react";
import { FaUserEdit, FaFileUpload, FaLock } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { createFundManagerProfile } from "../../api/authApi";

const CompleteManagerProfile = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    employee_code: "",
    qualification: "",
    experience_years: "",
    bio: "",
    password_confirm: ""
  });

  useEffect(() => {
    document.title = "Complete Manager Profile";

    const user = JSON.parse(localStorage.getItem("user"));
    if (!user || user.role !== "MANAGER") {
      alert("⚠️ Access denied. Only MANAGERs can access this page.");
      navigate("/login");
    }
  }, [navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const user = JSON.parse(localStorage.getItem("user"));
    const userId = user?.id;
    const role = user?.role;

    if (!userId || !role) {
      alert("User not logged in. Please login again.");
      return;
    }

    if (role !== "MANAGER") {
      alert("⚠️ You are not authorized to submit this form.");
      return;
    }

    if (!form.password_confirm) {
      alert("Please confirm your password.");
      return;
    }

    try {
      const payload = {
        employeeCode: form.employee_code,
        qualification: form.qualification,
        experienceYears: parseInt(form.experience_years),
        bio: form.bio,
        userId,
      };

      await createFundManagerProfile(payload);
      alert("✅ Manager Profile Created Successfully!");
      navigate("/dashboard/fund-manager");
    } catch (error) {
      if (
        error.response?.status === 500 &&
        error.response?.data?.message?.includes("duplicate key") &&
        error.response?.data?.message?.includes("employee_code")
      ) {
        alert("⚠️ Employee Code already exists. Please choose a different one.");
      } else if (
        error.response?.status === 500 &&
        error.response?.data?.message?.includes("already exists")
      ) {
        alert("⚠️ Fund Manager already exists for this user.");
      } else if (error.response?.data?.message) {
        alert(`Error: ${error.response.data.message}`);
      } else {
        alert("❌ Something went wrong. Please try again.");
      }
    }
  };

  return (
    <div className="w-full bg-gradient-to-br from-[#dbeafe] via-[#e0e7ff] to-[#f1f5f9]">
      <div className="max-w-3xl mx-auto px-4 py-3">
        <div className="bg-blue-50 border border-blue-200 px-4 py-4 rounded-xl shadow-lg">
          <h2 className="text-2xl font-semibold text-blue-800 mb-4 flex items-center gap-2">
            <FaUserEdit className="text-blue-500" />
            Manager: Complete Your Profile
          </h2>

          <form className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-4" onSubmit={handleSubmit}>
            <div>
              <label htmlFor="employee_code" className="block text-sm text-gray-600 mb-1">
                Employee Code
              </label>
              <input
                type="text"
                name="employee_code"
                required
                className="p-2 border border-gray-300 rounded-md bg-white text-sm text-gray-800 w-full"
                value={form.employee_code}
                onChange={handleChange}
              />
            </div>

            <div>
              <label htmlFor="qualification" className="block text-sm text-gray-600 mb-1">
                Qualification
              </label>
              <input
                type="text"
                name="qualification"
                required
                className="p-2 border border-gray-300 rounded-md bg-white text-sm text-gray-800 w-full"
                value={form.qualification}
                onChange={handleChange}
              />
            </div>

            <div>
              <label htmlFor="experience_years" className="block text-sm text-gray-600 mb-1">
                Years of Experience
              </label>
              <input
                type="number"
                name="experience_years"
                required
                min={0}
                className="p-2 border border-gray-300 rounded-md bg-white text-sm text-gray-800 w-full"
                value={form.experience_years}
                onChange={handleChange}
              />
            </div>

            <div className="sm:col-span-2">
              <label htmlFor="bio" className="block text-sm text-gray-600 mb-1">
                Short Bio / About You
              </label>
              <textarea
                name="bio"
                required
                rows={3}
                className="p-2 border border-gray-300 rounded-md bg-white text-sm text-gray-800 w-full"
                value={form.bio}
                onChange={handleChange}
              />
            </div>

            <div className="sm:col-span-2">
              <label className="flex items-center gap-2 text-sm text-gray-700 mb-1">
                <FaLock />
                Confirm Password
              </label>
              <input
                type="password"
                name="password_confirm"
                placeholder="Confirm your password"
                required
                className="p-2 border border-gray-300 rounded-md bg-white text-sm text-gray-800 w-full"
                value={form.password_confirm}
                onChange={handleChange}
              />
            </div>

            <div className="sm:col-span-2">
              <button
                type="submit"
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded-lg transition"
              >
                Submit & Continue
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CompleteManagerProfile;
