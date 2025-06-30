import { Link, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
// import BackgroundImage from "../../../public/bgImage.png";
// import BackgroundImage from "../../../public/assets/bgImage.jpg";
import BackgroundImage from "../../../public/bgImage.jpg";


export default function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  useEffect(() => {
    document.title = "Login | Fund Simulator";
    const user = JSON.parse(localStorage.getItem('registeredUser'));
    if (user) setEmail(user.email);
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    const storedUser = JSON.parse(localStorage.getItem('registeredUser'));
    if (storedUser && storedUser.email === email && storedUser.password === password) {
      alert('Login successful!');
      localStorage.setItem('loggedIn', 'true');
      navigate('/dashboard');
    } else {
      alert('Invalid email or password.');
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

      {/* Content */}
      <div className="w-full max-w-sm z-10">
        <div className="bg-white/80 backdrop-blur-xl shadow-lg rounded-2xl p-6 border border-[#fa6b11]">
          <h2 className="text-2xl font-bold text-center text-[#fa6b11] mb-1 tracking-wide">Welcome Back!</h2>
          <p className="text-center text-xs text-gray-600 mb-4">
            Sign in to explore the <br />
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
              className="w-full bg-[#fa6b11] hover:bg-orange-300 text-white py-2 rounded-lg font-semibold transition duration-200 shadow-sm"
            >
              Sign In
            </button>
          </form>

          <p className="mt-4 text-center text-xs text-gray-600">
            Don’t have an account?{' '}
            <Link to="/register" className="text-[#fa6b11] font-medium hover:underline">
              Register here
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
