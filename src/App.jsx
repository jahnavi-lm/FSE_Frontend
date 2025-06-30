// import {
//   createBrowserRouter,
//   RouterProvider,
//   Navigate,
// } from "react-router-dom";

// import Login from "./pages/auth/Login";
// import Register from "./pages/auth/Register";
// import ForgotPassword from "./pages/auth/ForgotPassword";

// import FundManagerDashboard from "./pages/fundManager/FundManagerDashboard";
// import InvestorHome from "./pages/investor/InvestorHome";
// import MyAccount from "./pages/investor/InvestorAccount";

// import PrivateRoute from "./utils/PrivateRoute";
// import HeaderFooterLayout from "./components/layouts/HeaderFooterLayout";

// const router = createBrowserRouter([
//   { path: "/", element: <Navigate to="/login" replace /> },

//   // Public Routes
//   { path: "/login", element: <Login /> },
//   { path: "/register", element: <Register /> },
//   { path: "/forgot-password", element: <ForgotPassword /> },

//   // Protected Routes (wrapped with auth + layout)
//   {
//     element: <PrivateRoute />,
//     children: [
//       {
//         element: <HeaderFooterLayout />,
//         children: [
//           { path: "/dashboard/fund-manager", element: <FundManagerDashboard /> },
//           { path: "/dashboard/investor", element: <InvestorHome /> },
//           { path: "/dashboard/investor/my-account", element: <MyAccount /> },
//         ],
//       },
//     ],
//   },
// ]);

// export default function App() {
//   return <RouterProvider router={router} />;
// }

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
import HeaderFooterLayout from "./components/layouts/HeaderFooterLayout";
import AmcDashboard from "./pages/amc/AmcDashboard";

import FundDetails from "./pages/fundDetail/FundDetails";

const router = createBrowserRouter([
  { path: "/", element: <Navigate to="/login" replace /> },

  // Public Routes
  { path: "/login", element: <Login /> },
  { path: "/register", element: <Register /> },
  { path: "/forgot-password", element: <ForgotPassword /> },
  {
    element: <HeaderFooterLayout />,
    children: [
      { path: "/dashboard/fund-manager", element: <FundManagerDashboard /> },
      { path: "/dashboard/investor", element: <InvestorHome /> },
      { path: "/dashboard/investor/my-account", element: <MyAccount /> },
      {path: "/dashboard/amc", element: <AmcDashboard />},
      {path: "/view/fund/:id", element: <FundDetails />} ,

    ],
  },

  // Protected Routes (wrapped with auth + layout)
  {
    element: <PrivateRoute />,
    children: [
      // {
      //   element: <HeaderFooterLayout />,
      //   children: [
      //     { path: "/dashboard/fund-manager", element: <FundManagerDashboard /> },
      //     { path: "/dashboard/investor", element: <InvestorHome /> },
      //     { path: "/dashboard/investor/my-account", element: <MyAccount /> },
      //   ],
      // },
    ],
  },
]);

export default function App() {
  return <RouterProvider router={router} />;
}
