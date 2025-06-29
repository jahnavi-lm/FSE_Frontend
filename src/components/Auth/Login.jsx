import { Link, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import Logo from '../Header/logo';


export default function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  useEffect(() => {
    document.title="Login | Fund Simulator"
    const user = JSON.parse(localStorage.getItem('registeredUser'));
    if (user) {
      setEmail(user.email);
    }
  }, []);
 


  const handleSubmit = (e) => {
    e.preventDefault();

    const storedUser = JSON.parse(localStorage.getItem('registeredUser'));
    if (
      storedUser &&
      storedUser.email === email &&
      storedUser.password === password
    ) {
      alert('Login successful!');
      localStorage.setItem('loggedIn', 'true');
      navigate('/dashboard');
    } else {
      alert('Invalid email or password.');
    }
  };

  return (
    <div><Logo />
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center px-4">
      <div className="bg-white shadow-2xl rounded-2xl p-8 w-full max-w-lg">
        <h2 className="text-4xl font-bold text-center text-indigo-700 mb-2">Sign In</h2>
        <p className="text-center text-gray-600 mb-6">
          Welcome back! Sign in to continue exploring the{' '}<br></br>
          <span className="text-indigo-600 font-semibold">Fund Strategy Simulator</span>.
        </p>

        <form className="space-y-5" onSubmit={handleSubmit}>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
            className="w-full border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400"
            required
          />

          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            className="w-full border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400"
            required
          />

          <div className="flex justify-end">
            <Link to="/forgot-password" className="text-sm text-indigo-500 hover:underline">
              Forgot Password?
            </Link>
          </div>

          <button
            type="submit"
            className="w-full bg-indigo-600 text-white p-3 rounded-lg font-semibold hover:bg-indigo-700 transition duration-200"
          >
            Sign In
          </button>
        </form>

        <p className="mt-6 text-center text-sm">
          Don’t have an account?{' '}
          <Link to="/register" className="text-indigo-500 hover:underline">
            Register
          </Link>
        </p>
      </div>
    </div>
    </div>
  );
}
