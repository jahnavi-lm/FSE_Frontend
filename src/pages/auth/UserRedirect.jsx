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
            const res = await axiosClient.get(`/api/investors/${user.id}`);
            if (res?.data?.id) {
              navigate("/dashboard/investor");
            } else {
              navigate("/Investor/Register");
            }
          } catch (err) {
            navigate("/Investor/Register");
          }
          break;

        case "MANAGER":
          navigate("/Manager/Home");
          break;

        case "AMC":
          navigate("/Amc/Home");
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
