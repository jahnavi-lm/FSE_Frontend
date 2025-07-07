import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { registerUser } from "../../api/authApi";
import BackgroundImage from "../../../public/bgImage.png";
import { FiLoader } from "react-icons/fi";

export default function Register() {
  const navigate = useNavigate();

  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [retypePassword, setRetypePassword] = useState("");
  const [role, setRole] = useState("Investor");
  const [agree, setAgree] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    document.title = "Register | Fund Simulator";
  }, []);

  // Role mapping to match backend ENUMs
  const roleMap = {
    "Investor": "INVESTOR",
    "Fund Manager": "MANAGER",
    "AMC": "AMC",
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password !== retypePassword) {
      alert("Passwords do not match.");
      return;
    }

    if (!agree) {
      alert("You must agree to the terms and conditions.");
      return;
    }

    const userPayload = {
      name: fullName,
      email,
      password,
      userRole: roleMap[role], // 🟢 correctly mapped role
    };

    try {
      setLoading(true);
      await registerUser(userPayload);
      alert("Registration successful! Please sign in.");
      navigate("/login");
    } catch (error) {
      console.error("Registration error:", error);
      alert(
        error?.response?.data?.message ||
          "Something went wrong. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center px-4 relative bg-cover bg-center"
      style={{
        backgroundImage: `url(${BackgroundImage})`,
      }}
    >
      <div className="absolute inset-0 bg-black opacity-50 z-0" />
      <div className="w-full max-w-sm z-10">
        <div className="bg-white/80 backdrop-blur-xl shadow-lg rounded-2xl p-6 border border-[#fa6b11]">
          <h2 className="text-2xl font-bold text-center text-[#fa6b11] mb-1">
            Create Account
          </h2>
          <p className="text-center text-xs text-gray-600 mb-3">
            Start your journey with{" "}
            <span className="text-[#fa6b11] font-medium">
              Fund Strategy Simulator
            </span>{" "}
            <br />
            as <span className="font-medium">{role}</span>
          </p>

          {/* Role Toggle */}
          <div className="flex justify-center gap-2 mb-4">
            {["Investor", "Fund Manager", "AMC"].map((option) => (
              <button
                key={option}
                type="button"
                onClick={() => setRole(option)}
                className={`px-3 py-1 text-xs rounded-full border ${
                  role === option
                    ? "bg-[#fa6b11] text-white border-[#fa6b11]"
                    : "bg-white text-[#fa6b11] border-[#fa6b11]"
                } transition`}
              >
                {option}
              </button>
            ))}
          </div>

          <form className="space-y-3 text-sm" onSubmit={handleSubmit}>
            <input
              type="text"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              placeholder="Full Name"
              className="w-full px-3 py-2 rounded-lg border border-gray-300 focus:ring-1 focus:ring-[#fa6b11] outline-none"
              required
            />

            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email"
              className="w-full px-3 py-2 rounded-lg border border-gray-300 focus:ring-1 focus:ring-[#fa6b11] outline-none"
              required
            />

            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              className="w-full px-3 py-2 rounded-lg border border-gray-300 focus:ring-1 focus:ring-[#fa6b11] outline-none"
              required
            />

            <input
              type="password"
              value={retypePassword}
              onChange={(e) => setRetypePassword(e.target.value)}
              placeholder="Retype Password"
              className="w-full px-3 py-2 rounded-lg border border-gray-300 focus:ring-1 focus:ring-[#fa6b11] outline-none"
              required
            />

            <div className="flex items-center text-xs">
              <input
                type="checkbox"
                checked={agree}
                onChange={(e) => setAgree(e.target.checked)}
                className="mr-2 accent-[#fa6b11]"
                required
              />
              <span>
                I agree to the{" "}
                <a href="#" className="text-[#fa6b11] hover:underline">
                  terms
                </a>
              </span>
            </div>

            <button
              type="submit"
              disabled={loading}
              className={`w-full ${
                loading ? "bg-orange-300" : "bg-[#fa6b11] hover:bg-orange-300"
              } text-white py-2 rounded-lg font-semibold text-sm transition flex justify-center items-center`}
            >
              {loading ? (
                <>
                  <FiLoader className="animate-spin mr-2" />
                  Registering...
                </>
              ) : (
                "Register"
              )}
            </button>
          </form>

          <p className="mt-4 text-center text-xs text-gray-600">
            Already have an account?{" "}
            <Link
              to="/login"
              className="text-[#fa6b11] font-medium hover:underline"
            >
              Sign In
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
