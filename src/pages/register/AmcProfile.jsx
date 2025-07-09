import React, { useEffect, useState } from "react";
import { FaUserEdit } from "react-icons/fa";
import { createAmcProfile } from "../../api/authApi"; 
import { useNavigate } from "react-router-dom";

const CompleteAmcProfile = () => {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));

  const [form, setForm] = useState({
    name: "",
    registrationNo: "",
    contactEmail: user.email,
    contactPhone: "",
    officeAddress: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!/^\d{10}$/.test(form.contactPhone)) {
      alert("Contact phone must be exactly 10 digits.");
      return;
    }

    if (form.officeAddress.length < 10 || form.officeAddress.length > 300) {
      alert("Office address must be between 10 and 300 characters.");
      return;
    }

    try {
      const user = JSON.parse(localStorage.getItem("user"));
      const userId = user?.id;

      if (!userId) {
        alert("User not logged in. Please login again.");
        return;
      }

      await createAmcProfile(userId, form);
      alert("✅ AMC Profile created successfully!");
      navigate("/dashboard/amc");
    } catch (error) {
      console.error("❌ Error creating AMC profile:", error);
      if (error.response?.data?.message) {
        alert(error.response.data.message);
      } else {
        alert("An error occurred. Please try again.");
      }
    }
  };

  useEffect(() => {
    document.title = "Complete AMC Profile";
  }, []);

  return (
    <div className="w-full bg-gradient-to-br from-[#dbeafe] via-[#e0e7ff] to-[#f1f5f9] min-h-screen py-6">
      <div className="max-w-3xl mx-auto px-4">
        <div className="bg-white shadow-md border border-blue-200 px-6 py-5 rounded-xl">
          <h2 className="text-2xl font-semibold text-blue-800 mb-4 flex items-center gap-2">
            <FaUserEdit className="text-blue-500" /> Complete AMC Profile
          </h2>

          <form
            className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm"
            onSubmit={handleSubmit}
          >
            <div>
              <label htmlFor="name" className="block text-gray-700 mb-1">
                AMC Name
              </label>
              <input
                type="text"
                name="name"
                required
                placeholder="e.g. SBI Mutual Fund"
                className="w-full p-2 border border-gray-300 rounded-md"
                value={form.name}
                onChange={handleChange}
              />
            </div>

            <div>
              <label htmlFor="registrationNo" className="block text-gray-700 mb-1">
                Registration Number <span className="text-gray-400">(As per your card.)</span>
              </label>
              <input
                type="text"
                name="registrationNo"
                minLength="5"
                required
                placeholder="e.g. 123456"
                className="w-full p-2 border border-gray-300 rounded-md"
                value={form.registrationNo}
                onChange={handleChange}
              />
            </div>

            <div>
              <label htmlFor="contactEmail" className="block text-gray-700 mb-1">
                Contact Email
              </label>
              <input
              readOnly
              type="email"
              placeholder="e.g. contact@amc.com"
              className="w-full p-2 border border-gray-300 rounded-md bg-gray-100 text-gray-500 cursor-not-allowed hover:border-red-500"
              value={form.contactEmail}
              onChange={handleChange}
              required
             />

            </div>

            <div>
              <label htmlFor="contactPhone" className="block text-gray-700 mb-1">
                Contact Phone <span className="text-gray-400">(10 digits)</span>
              </label>
              <input
                type="text"
                name="contactPhone"
                required
                pattern="\d{10}"
                maxLength="10"
                placeholder="e.g. 9876543210"
                className="w-full p-2 border border-gray-300 rounded-md"
                value={form.contactPhone}
                onChange={handleChange}
              />
            </div>

            <div className="sm:col-span-2">
              <label htmlFor="officeAddress" className="block text-gray-700 mb-1">
                Office Address <span className="text-gray-400">(10–300 characters)</span>
              </label>
              <textarea
                name="officeAddress"
                rows="3"
                required
                minLength="10"
                maxLength="300"
                placeholder="e.g. 123 MG Road, Bangalore, Karnataka"
                className="w-full p-2 border border-gray-300 rounded-md"
                value={form.officeAddress}
                onChange={handleChange}
              />
            </div>

            <div className="sm:col-span-2 mt-2">
              <button
                type="submit"
                className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-md font-semibold transition"
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

export default CompleteAmcProfile;
