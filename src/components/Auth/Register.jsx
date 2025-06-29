import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Logo from '../Header/logo';

export default function Register() {
  useEffect(() => {
  document.title = "Register | Fund Simulator";
}, []);  

  const navigate = useNavigate();

  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [retypePassword, setRetypePassword] = useState('');
  const [role, setRole] = useState('Investor');
  const [agree, setAgree] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (password !== retypePassword) {
      alert('Passwords do not match.');
      return;
    }

    if (!agree) {
      alert('You must agree to the terms and conditions.');
      return;
    }

    // ✅ Save to localStorage (simulate API)
    const user = {
      fullName,
      email,
      password,
      role,
    };
    localStorage.setItem('registeredUser', JSON.stringify(user));

    alert('Registration successful! Please sign in.');
    navigate('/login');
  };

  return (
   
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center px-4">
       <div> <Logo /> 
      <div className="bg-white shadow-2xl rounded-2xl px-4 py-3 w-full max-w-md">
        <h2 className="text-3xl font-bold text-center text-indigo-700 mt-0 mb-1">Register</h2>
        <p className="text-center text-gray-600 mb-3">
          Start your journey with the{' '}
          <span className="text-indigo-600 font-semibold">Fund Strategy Simulator</span><br />
          as an <span className="font-semibold">{role}</span>
        </p>

        {/* Role toggle */}
        <div className="flex justify-center mb-4">
          <button
            type="button"
            className={`px-4 py-2 rounded-l-lg border border-indigo-600 ${
              role === 'Investor' ? 'bg-indigo-600 text-white' : 'bg-white text-indigo-600'
            }`}
            onClick={() => setRole('Investor')}
          >
            Investor
          </button>
          <button
            type="button"
            className={`px-4 py-2 rounded-r-lg border border-indigo-600 ${
              role === 'Fund Manager' ? 'bg-indigo-600 text-white' : 'bg-white text-indigo-600'
            }`}
            onClick={() => setRole('Fund Manager')}
          >
            Fund Manager
          </button>
        </div>

        {/* Form */}
        <form className="space-y-2" onSubmit={handleSubmit}>
          <input
            type="text"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            placeholder="Full Name"
            className="w-full border border-gray-300 p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400"
            required
          />

          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
            className="w-full border border-gray-300 p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400"
            required
          />

          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            className="w-full border border-gray-300 p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400"
            required
          />

          <input
            type="password"
            value={retypePassword}
            onChange={(e) => setRetypePassword(e.target.value)}
            placeholder="Retype Password"
            className="w-full border border-gray-300 p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400"
            required
          />

          <div className="flex items-center text-sm">
            <input
              type="checkbox"
              checked={agree}
              onChange={(e) => setAgree(e.target.checked)}
              className="mr-2"
              required
            />
            <span>
              I agree to the{' '}
              <a href="#" className="text-indigo-500 hover:underline">
                terms and conditions
              </a>
            </span>
          </div>

          <button
            type="submit"
            className="w-full bg-indigo-600 text-white p-2 rounded-lg font-semibold hover:bg-indigo-700 transition duration-200"
          >
            Register
          </button>
        </form>

        <p className="mt-4 text-center text-sm">
          Already have an account?{' '}
          <Link to="/login" className="text-indigo-500 hover:underline">
            Sign In
          </Link>
        </p>
      </div>
    </div>
    </div>
  );
}
