// src/pages/UserRedirect.jsx
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axiosClient from "../../api/api";

export default function UserRedirect() {
  const navigate = useNavigate();

 useEffect(() => {
    const redirectUser = async () => {
      const user = JSON.parse(localStorage.getItem("user"));

      if (!user || !user.role) {
        navigate("/login");
        return;
      }

      switch (user.role) {
        case "INVESTOR":
          try {
            const res = await axiosClient.get(`/api/investors/exists/${user.id}`);
            console.log("Investor exists:", res?.data); // For debugging
            if (res?.data === true) {
              navigate("/dashboard/investor");
            } else {
              navigate("/Investor/Register");
            }
          } catch (err) {
            console.error("Investor existence check failed:", err);
            navigate("/Investor/Register");
          }
          break;

        case "MANAGER":
         try {
            const res = await axiosClient.get(`/api/fundManagers/exists/${user.id}`);
            console.log("Fund Manager exists:", res?.data); // For debugging
            if (res?.data === true) {
              navigate("/dashboard/fund-manager");
            } else {
              navigate("/manager/Register");
            }
          } catch (err) {
            console.error("Fund Manager existence check failed:", err);
            navigate("/manager/register");
          }
          break;

        case "AMC":
         try {
            const res = await axiosClient.get(`/api/amcs/exists/${user.id}`);
            console.log("AMC exists:", res?.data); // For debugging
            if (res?.data === true) {
              navigate("/dashboard/amc");
            } else {
              navigate("/amc/Register");
            }
          } catch (err) {
            console.error("AMC existence check failed:", err);
            navigate("/amc/Register");
          }
          break;

        default:
          navigate("/unauthorized");
          break;
      }
    };

    redirectUser();
  }, [navigate]);

  return (
    <div className="min-h-screen flex justify-center items-center text-gray-600">
      Verifying your access...
    </div>
  );
}
