import { Link } from 'react-router-dom';

export default function ForgotPassword() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center">Forgot Password</h2>
        <form className="space-y-4">
          <input
            type="email"
            placeholder="Enter your email"
            className="w-full border p-2 rounded"
          />
          <button
            type="submit"
            className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
          >
            Send Reset Code
          </button>
        </form>
        <p className="mt-4 text-center text-sm">
          Remember your password?{' '}
          <Link to="/" className="text-blue-500">
            Sign In
          </Link>
        </p>
      </div>
    </div>
  );
}
