import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { dashboardData } from './data/dashboardData';

import NotificationDropdown from './NotificationDropdown';
import ProfileDropdown from './ProfileDropdown';

import Overview from './Overview';
import Strategies from './Strategies';
import Backtest from './Backtest';
import Portfolio from './Portfolio';
import Results from './Results';

export default function Dashboard() {
  const [activeTab, setActiveTab] = useState('Overview');
  const [showNotifications, setShowNotifications] = useState(false);
  const [showProfileMenu, setShowProfileMenu] = useState(false);

  const navigate = useNavigate();
  const { userName, capital, pnl } = dashboardData;

  // Refs for outside click detection
  const notificationsRef = useRef(null);
  const profileRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(event) {
      if (
        notificationsRef.current &&
        !notificationsRef.current.contains(event.target)
      ) {
        setShowNotifications(false);
      }
      if (
        profileRef.current &&
        !profileRef.current.contains(event.target)
      ) {
        setShowProfileMenu(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('loggedIn');
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Top Bar */}
      <div className="flex justify-between items-center px-6 py-4 bg-white shadow relative">
        <h1 className="text-2xl font-bold text-indigo-700">Dashboard</h1>

        <div className="flex items-center space-x-4">
          {/* Notifications */}
          <div className="relative" ref={notificationsRef}>
            <button
              onClick={() => setShowNotifications(!showNotifications)}
              className="text-gray-600 hover:text-indigo-600 focus:outline-none"
            >
              <span className="material-icons">notifications</span>
            </button>
            {showNotifications && <NotificationDropdown />}
          </div>

          {/* Profile */}
          <div className="relative" ref={profileRef}>
            <button
              onClick={() => setShowProfileMenu(!showProfileMenu)}
              className="w-10 h-10 rounded-full bg-indigo-300 flex items-center justify-center text-white font-bold focus:outline-none"
            >
              {userName.charAt(0)}
            </button>
            {showProfileMenu && <ProfileDropdown onLogout={handleLogout} />}
          </div>
        </div>
      </div>

      {/* Welcome Section */}
      <div className="px-6 py-4 bg-white shadow mt-4 mx-4 rounded-xl">
        <h2 className="text-xl font-semibold text-indigo-700">Welcome, {userName}</h2>
        <div className="flex space-x-8 mt-2">
          <div>
            <p className="text-gray-500 text-sm">Capital</p>
            <p className="text-lg font-bold">{capital}</p>
          </div>
          <div>
            <p className="text-gray-500 text-sm">Total P&L</p>
            <p className="text-lg font-bold text-green-600">{pnl}</p>
          </div>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="flex justify-center mt-6 space-x-4">
        {['Overview', 'Strategies', 'Backtest', 'Portfolio', 'Results'].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-4 py-2 rounded-full ${
              activeTab === tab
                ? 'bg-indigo-600 text-white'
                : 'bg-white border border-indigo-600 text-indigo-600'
            } transition duration-200`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Content Area */}
      <div className="p-6">
        {activeTab === 'Overview' && <Overview />}
        {activeTab === 'Strategies' && <Strategies />}
        {activeTab === 'Backtest' && <Backtest />}
        {activeTab === 'Portfolio' && <Portfolio />}
        {activeTab === 'Results' && <Results />}
      </div>
    </div>
  );
}
