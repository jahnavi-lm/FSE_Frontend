import React, { useEffect, useState } from "react";
import { FaUserEdit, FaFileUpload, FaLock } from "react-icons/fa";
import { createInvestorProfile } from "../../api/authApi";
import { useNavigate } from "react-router-dom";

const CompleteProfile = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    dob: "",
    guardian_name: "",
    nominee_name: "",
    occupation: "",
    annual_income: "",
    pan_number: "",
    bank_account_no: "",
    ifsc_code: "",
    address: "",
    password_confirm: "",
    kyc_doc: null,
  });

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: files ? files[0] : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.password_confirm) {
      alert("Please confirm your password.");
      return;
    }

    const user = JSON.parse(localStorage.getItem("user"));
    const userId = user?.id;

    if (!userId) {
      alert("User not logged in. Please login again.");
      return;
    }

    try {
      const payload = {
        userId,
        dob: form.dob,
        guardianName: form.guardian_name,
        nomineeName: form.nominee_name,
        occupation: form.occupation,
        annualIncome: parseFloat(form.annual_income),
        panNumber: form.pan_number,
        bankAccountNo: form.bank_account_no,
        ifscCode: form.ifsc_code,
        address: form.address,
        kycDocUrl: "", // Optional: integrate file upload if needed
      };

      await createInvestorProfile(payload);
      alert("✅ Profile submitted successfully!");
      navigate("/dashboard/investor");
    } catch (error) {
      if (error.response?.status === 409) {
          alert("PAN number already exists. Please check and try again.");
       }
       else if (error.response) {
        console.error("❌ Backend responded with error:", error.response.data);
        alert(`Error: ${error.response.data.message || "Unknown server error"}`);
      } else if (error.request) {
        console.error("❌ No response received:", error.request);
        alert("No response from server. Check your network or backend.");
      } else {
        console.error("❌ Error setting up request:", error.message);
        alert("Error submitting form. Try again.");
      }
    }
  };

  useEffect(() => {
    document.title = "Complete Profile";
  }, []);

  return (
    <div className="w-full bg-gradient-to-br from-[#dbeafe] via-[#e0e7ff] to-[#f1f5f9]">
      <div className="max-w-3xl mx-auto px-4 py-3">
        <div className="bg-blue-50 border border-blue-200 px-4 py-2 rounded-xl shadow-lg">
          <h2 className="text-2xl font-semibold text-blue-800 mb-2 flex items-center gap-2">
            <FaUserEdit className="text-blue-500" /> Complete Your Profile
          </h2>

          <form className="grid grid-cols-1 sm:grid-cols-2 gap-4" onSubmit={handleSubmit}>
  <div>
    <label htmlFor="dob" className="block text-sm text-gray-600 mb-0.5">
      Your DOB (dd-mm-yyyy)
    </label>
    <input
      type="date"
      name="dob"
      required
      className="p-2 border border-gray-300 rounded-md bg-white text-sm text-gray-800 w-full"
      value={form.dob}
      onChange={handleChange}
    />
  </div>

  <div>
    <label htmlFor="guardian_name" className="block text-sm text-gray-600 mb-0.5">
      Guardian Name <span className="text-gray-400">(Optional)</span>
    </label>
    <input
      type="text"
      name="guardian_name"
      className="p-2 border border-gray-300 rounded-md bg-white text-sm text-gray-800 w-full"
      value={form.guardian_name}
      onChange={handleChange}
    />
  </div>

  <div>
    <label htmlFor="nominee_name" className="block text-sm text-gray-600 mb-0.5">
      Nominee Name
    </label>
    <input
      type="text"
      name="nominee_name"
      required
      className="p-2 border border-gray-300 rounded-md bg-white text-sm text-gray-800 w-full"
      value={form.nominee_name}
      onChange={handleChange}
    />
  </div>

  <div>
    <label htmlFor="occupation" className="block text-sm text-gray-600 mb-0.5">
      Occupation
    </label>
    <input
      type="text"
      name="occupation"
      required
      className="p-2 border border-gray-300 rounded-md bg-white text-sm text-gray-800 w-full"
      value={form.occupation}
      onChange={handleChange}
    />
  </div>

  <div>
    <label htmlFor="annual_income" className="block text-sm text-gray-600 mb-0.5">
      Annual Income (₹)
    </label>
    <input
      type="number"
      name="annual_income"
      required
      className="p-2 border border-gray-300 rounded-md bg-white text-sm text-gray-800 w-full"
      value={form.annual_income}
      onChange={handleChange}
    />
  </div>

  <div>
    <label htmlFor="pan_number" className="block text-sm text-gray-600 mb-0.5">
      PAN Number (e.g. ABCDE1234F)
    </label>
    <input
      type="text"
      name="pan_number"
      required
      className="p-2 border border-gray-300 rounded-md bg-white text-sm text-gray-800 w-full"
      value={form.pan_number}
      onChange={handleChange}
    />
  </div>

  <div>
    <label htmlFor="bank_account_no" className="block text-sm text-gray-600 mb-0.5">
      Bank Account Number
    </label>
    <input
      type="number"
      name="bank_account_no"
      required
      className="p-2 border border-gray-300 rounded-md bg-white text-sm text-gray-800 w-full"
      value={form.bank_account_no}
      onChange={handleChange}
    />
  </div>

  <div>
    <label htmlFor="ifsc_code" className="block text-sm text-gray-600 mb-0.5">
      IFSC Code
    </label>
    <input
      type="text"
      name="ifsc_code"
      required
      className="p-2 border border-gray-300 rounded-md bg-white text-sm text-gray-800 w-full"
      value={form.ifsc_code}
      onChange={handleChange}
    />
  </div>

  <div className="col-span-1 sm:col-span-2">
    <label htmlFor="address" className="block text-sm text-gray-600 mb-0.5">
      Residential Address
    </label>
    <textarea
      name="address"
      required
      rows="2"
      className="p-2 border border-gray-300 rounded-md bg-white text-sm text-gray-800 w-full"
      value={form.address}
      onChange={handleChange}
    />
  </div>

  <div className="col-span-1 sm:col-span-2 flex flex-col gap-1">
    <label className="text-gray-700 text-sm flex items-center gap-2">
      <FaFileUpload className="text-blue-500" />
      Upload KYC (PDF) <span className="text-gray-500">(optional)</span>
    </label>
    <input
      type="file"
      name="kyc_doc"
      accept=".pdf"
      onChange={handleChange}
      className="bg-white p-2 border border-gray-300 rounded-md"
    />
  </div>

  <div className="col-span-1 sm:col-span-2">
    <label className="flex items-center gap-2 text-sm mb-1 text-gray-700">
      <FaLock />
      Confirm Password
    </label>
    <input
      type="password"
      name="password_confirm"
      placeholder="Enter your password to confirm changes"
      required
      className="p-2 border border-gray-300 rounded-md bg-white text-sm text-gray-800 w-full"
      value={form.password_confirm}
      onChange={handleChange}
    />
  </div>

  <div className="col-span-1 sm:col-span-2 mt-1">
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

export default CompleteProfile;
