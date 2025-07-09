// ✅ utils/PrivateRoute.jsx
import { Navigate, Outlet, useLocation } from 'react-router-dom';

export default function PrivateRoute() {
  const authToken = localStorage.getItem('authToken');
  const user = JSON.parse(localStorage.getItem('user'));
  const location = useLocation();

  if (!authToken || !user?.role) {
    return <Navigate to="/login" replace />;
  }

  // role-based access checks
  const path = location.pathname.toLowerCase();
  const role = user.role;

  const roleAccessMap = {
    investor: ['investor'],
    'fund-manager': ['manager'],
    amc: ['amc'],
  };

  const restrictedSection = Object.keys(roleAccessMap).find((section) =>
    path.includes(section)
  );

  if (restrictedSection && !roleAccessMap[restrictedSection].includes(role.toLowerCase())) {
    return <Navigate to="/unauthorized" replace />;
  }

  return <Outlet />;
}
