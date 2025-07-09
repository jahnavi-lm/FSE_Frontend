// ✅ App router setup
import {
  createBrowserRouter,
  RouterProvider,
  Navigate,
} from "react-router-dom";

import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import ForgotPassword from "./pages/auth/ForgotPassword";

import FundManagerDashboard from "./pages/fundManager/FundManagerDashboard";
import InvestorHome from "./pages/investor/InvestorHome";
import MyAccount from "./pages/investor/InvestorAccount";

import PrivateRoute from "./utils/PrivateRoute";
import PublicRoute from "./utils/PublicRoute";
import HeaderFooterLayout from "./components/layouts/HeaderFooterLayout";
import AmcDashboard from "./pages/amc/AmcDashboard";

import FundDetails from "./pages/fundDetail/FundDetails";
import CompleteProfile from "./pages/investor/InvestorProfile";
import CompleteAmcProfile from "./pages/register/AmcProfile";
import CompleteManagerProfile from "./pages/register/ManagerProfile";
import UserRedirect from "./pages/auth/UserRedirect";

const router = createBrowserRouter([
  { path: "/", element: <Navigate to="/login" replace /> },

  // Public routes with guard
  {
    path: "/login",
    element: (
      <PublicRoute>
        <Login />
      </PublicRoute>
    ),
  },
    { path: "/dashboard/fund-manager", element: <FundManagerDashboard /> },
  {
    path: "/register",
    element: (
      <PublicRoute>
        <Register />
      </PublicRoute>
    ),
  },
  {
    path: "/forgot-password",
    element: (
      <PublicRoute>
        <ForgotPassword />
      </PublicRoute>
    ),
  },

  { path: "/user/redirect", element: <UserRedirect /> },

  // Protected Routes
  {
    element: <PrivateRoute />,
    children: [
      {
        element: <HeaderFooterLayout />,
        children: [
        
          { path: "/dashboard/investor", element: <InvestorHome /> },
          { path: "/dashboard/investor/my-account", element: <MyAccount /> },
          { path: "/dashboard/amc", element: <AmcDashboard /> },
          { path: "/view/fund/:id", element: <FundDetails /> },
          { path: "/investor/register", element: <CompleteProfile /> },
          { path: "/amc/register", element: <CompleteAmcProfile /> },
          { path: "/manager/register", element: <CompleteManagerProfile /> },
        ],
      },
    ],
  },

  { path: "*", element: <Navigate to="/login" replace /> },
]);

export default function App() {
  return <RouterProvider router={router} />;
}
