import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
// import BackgroundImage from "../../../public/bgImage.png";
import BackgroundImage from "../../../public/assets/bgImage.jpg";

export default function ForgotPassword() {
  const [email, setEmail] = useState('');

  useEffect(() => {
    document.title = "Forgot Password | Fund Simulator";
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (email.trim()) {
      alert('Reset instructions sent to your email.');
    } else {
      alert('Please enter a valid email.');
    }
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center px-4 relative bg-cover bg-center"
      style={{
        backgroundImage: `url(${BackgroundImage})`,
      }}
    >
            {/* Dark overlay */}
      <div className="absolute inset-0 bg-black opacity-50 z-0" />
      <div className="w-full max-w-sm">
    
        <div className="bg-white/80 backdrop-blur-xl shadow-lg rounded-2xl p-6 border border-[#fa6b11]">
          <h2 className="text-2xl font-bold text-center text-[#fa6b11] mb-1 tracking-wide">
            Forgot Password
          </h2>
          <p className="text-center text-xs text-gray-600 mb-4">
            Enter your registered email to receive a reset link.
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

            <button
              type="submit"
              className="w-full bg-[#fa6b11] hover:bg-orange-300 text-white py-2 rounded-lg font-semibold transition duration-200 shadow-sm"
            >
              Send Reset Code
            </button>
          </form>

          <p className="mt-4 text-center text-xs text-gray-600">
            Remember your password?{' '}
            <Link to="/login" className="text-[#fa6b11] font-medium hover:underline">
              Sign In
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
