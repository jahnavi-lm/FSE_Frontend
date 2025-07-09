// ✅ utils/PublicRoute.jsx
import { Navigate } from "react-router-dom";

export default function PublicRoute({ children }) {
  const isLoggedIn = !!localStorage.getItem("authToken");

  return isLoggedIn ? <Navigate to="/user/redirect" replace /> : children;
}