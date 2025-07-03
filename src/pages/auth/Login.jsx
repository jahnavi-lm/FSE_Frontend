import { Link, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
// import BackgroundImage from "../../../public/bgImage.png";
// import BackgroundImage from "../../../public/assets/bgImage.jpg";
import BackgroundImage from "../../../public/bgImage.jpg";
import { loginUser } from "../../api/authApi";



export default function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    document.title = "Login | Fund Simulator";
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const { accessToken, user } = await loginUser(email, password);

      localStorage.setItem("authToken", accessToken);
      localStorage.setItem("user", JSON.stringify(user));
      localStorage.setItem("loggedIn", "true");

      // Redirect based on role
      if (user.role === "INVESTOR") {
        navigate("/user/redirect");
      } else if (user.role === "MANAGER") {
        navigate("/user/redirect");
      } else if (user.role==="AMC"){
        navigate("/user/redirect");
      } else{
         alert("Unknown role. Contact support.");
      }
    } catch (error) {
      alert("Login failed: Invalid email or password.");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center px-4 relative bg-cover bg-center"
      style={{ backgroundImage: `url(${BackgroundImage})` }}
    >
      <div className="absolute inset-0 bg-black opacity-50 z-0" />
      <div className="w-full max-w-sm z-10">
        <div className="bg-white/80 backdrop-blur-xl shadow-lg rounded-2xl p-6 border border-[#fa6b11]">
          <h2 className="text-2xl font-bold text-center text-[#fa6b11] mb-1">Welcome Back!</h2>
          <p className="text-center text-xs text-gray-600 mb-4">
            Sign in to explore <br />
            <span className="text-[#fa6b11] font-semibold">Fund Strategy Simulator</span>
          </p>

          <form className="space-y-3 text-sm" onSubmit={handleSubmit}>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email Address"
              className="w-full px-3 py-2 rounded-lg border border-gray-300 focus:ring-1 focus:ring-[#fa6b11] focus:outline-none"
              required
            />
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              className="w-full px-3 py-2 rounded-lg border border-gray-300 focus:ring-1 focus:ring-[#fa6b11] focus:outline-none"
              required
            />
            <div className="flex justify-end text-xs">
              <Link to="/forgot-password" className="text-[#fa6b11] hover:underline">
                Forgot Password?
              </Link>
            </div>
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-[#fa6b11] hover:bg-orange-300 text-white py-2 rounded-lg font-semibold transition duration-200 shadow-sm"
            >
              {loading ? "Signing In..." : "Sign In"}
            </button>
          </form>

          <p className="mt-4 text-center text-xs text-gray-600">
            Don’t have an account?{" "}
            <Link to="/register" className="text-[#fa6b11] font-medium hover:underline">
              Register here
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}