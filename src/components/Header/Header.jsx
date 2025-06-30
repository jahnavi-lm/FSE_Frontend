import { useState, useEffect } from 'react';
import { useLocation, Link } from 'react-router-dom';
import { FiBell, FiLogOut, FiUser } from 'react-icons/fi';

export default function Header() {
  const [visible, setVisible] = useState(true);
  const location = useLocation();

  const darkRoutes = ['/Investor/Home', '/Investor/Account'];
  const isDark = darkRoutes.includes(location.pathname);

  const logoSrc = isDark ? '/logo-white.svg' : '/logo.png';

  useEffect(() => {
    const handleScroll = () => setVisible(window.scrollY <= 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        visible ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-6'
      } ${isDark ? 'bg-transparent' : 'bg-white/70 backdrop-blur-md shadow-md'}`}
    >
      <div className="max-w-7xl mx-auto px-6 py-3 flex items-center justify-between">
        {/* Logo */}
        <Link to="/dashboard/fund-manager" className="hover:text-[#fa6b11] transition-colors">
          <img
            src={logoSrc}
            alt="MutualFundPro Logo"
            className={`h-10 transition-transform duration-200 hover:scale-105 ${
              isDark ? 'invert' : ''
            }`}
          />
        </Link>

        {/* Navigation and Action Icons */}
        <div className="flex items-center gap-6">
          {/* Navigation */}
          <nav className="hidden md:flex gap-6 text-sm font-medium text-gray-700">
            <Link to="/dashboard/investor" className="hover:text-[#fa6b11] transition-colors">
              Investor
            </Link>
            <Link to="/dashboard/fund-manager" className="hover:text-[#fa6b11] transition-colors">
              Fund Manager
            </Link>
            <Link to="/dashboard/amc" className="hover:text-[#fa6b11] transition-colors">
              AMC
            </Link>
          </nav>

          {/* Icons */}
          <div className="flex items-center gap-3">
            <IconButton icon={<FiBell />} tooltip="Notifications" />
            <IconButton icon={<FiUser />} tooltip="Profile" to="/dashboard/investor/my-account" />
            <IconButton icon={<FiLogOut />} tooltip="Logout" to="/login" color="text-red-600" />
          </div>
        </div>
      </div>
    </header>
  );
}

/* Reusable Icon Button */
function IconButton({ icon, tooltip, to, color = 'text-gray-700' }) {
  const base =
    'group relative flex items-center justify-center w-10 h-10 rounded-full bg-gray-100 hover:bg-[#fa6b11]/20 transition-all duration-300 ease-in-out';
  const iconStyle =
    `text-lg ${color} group-hover:text-[#fa6b11] transition-transform duration-200 transform group-hover:scale-110`;

  const ButtonContent = (
    <div className={base}>
      <span className={iconStyle}>{icon}</span>
      <span className="absolute -bottom-7 text-xs text-gray-500 opacity-0 group-hover:opacity-100 transition-opacity">
        {tooltip}
      </span>
    </div>
  );

  return to ? <Link to={to}>{ButtonContent}</Link> : ButtonContent;
}
