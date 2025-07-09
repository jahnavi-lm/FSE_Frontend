// ✅ pages/auth/UserRedirect.jsx
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axiosClient from "../../api/api";

export default function UserRedirect() {
  const navigate = useNavigate();

  useEffect(() => {
    const redirectUser = async () => {
      const user = JSON.parse(localStorage.getItem("user"));

      if (!user || !user.role || !user.id) {
        localStorage.clear();
        navigate("/login");
        return;
      }

      try {
        switch (user.role) {
          case "INVESTOR": {
            const res = await axiosClient.get(`/api/investors/exists/${user.id}`);
            if (res.data === true) {
              navigate("/dashboard/investor");
            } else {
              navigate("/investor/register");
            }
            break;
          }
          case "MANAGER": {
            const res = await axiosClient.get(`/api/fundManagers/exists/${user.id}`);
            if (res.data === true) {
              navigate("/dashboard/fund-manager");
            } else {
              navigate("/manager/register");
            }
            break;
          }
          case "AMC": {
            const res = await axiosClient.get(`/api/amcs/exists/${user.id}`);
            if (res.data === true) {
              navigate("/dashboard/amc");
            } else {
              navigate("/amc/register");
            }
            break;
          }
          default: {
            navigate("/unauthorized");
          }
        }
      } catch (error) {
        console.error("Error checking user existence:", error);
        alert("Something went wrong. Please try again.");
        navigate("/login");
      }
    };

    redirectUser();
  }, [navigate]);

  return (
    <div className="min-h-screen flex justify-center items-center text-gray-600">
      Verifying your role and access...
    </div>
  );
}