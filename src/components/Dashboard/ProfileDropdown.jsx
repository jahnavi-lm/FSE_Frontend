export default function ProfileDropdown({ onLogout }) {
    return (
      <div className="absolute right-0 mt-2 w-48 bg-white border rounded shadow-lg z-20 transition-all duration-200 ease-out">
        <button
          className="w-full text-left px-4 py-2 hover:bg-indigo-50"
          onClick={() => alert('View Profile clicked!')}
        >
          View Profile
        </button>
        <button
          className="w-full text-left px-4 py-2 hover:bg-indigo-50"
          onClick={() => alert('Settings clicked!')}
        >
          Settings
        </button>
        <button
          className="w-full text-left px-4 py-2 hover:bg-red-50 text-red-600 border-t"
          onClick={onLogout}
        >
          Logout
        </button>
      </div>
    );
  }
  