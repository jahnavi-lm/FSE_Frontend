import React, { useEffect, useState } from "react";
import { getFundById, getWalletBalanceByInvestorId } from "../../api/viewfundApi";
import { FaEye, FaEyeSlash } from "react-icons/fa";

function FundOverviewCard({ fundId  }) {
  const [fund, setFund] = useState(null);
  const [walletBalance, setWalletBalance] = useState(null);
  const [showWallet, setShowWallet] = useState(true);

  const myHoldings = {
    units: 810.5,
    value: 12493.34,
  };
 const user = JSON.parse(localStorage.getItem("user")); // assuming localStorage key is "user"
 const investorId = user?.id;


  useEffect(() => {
    if (!fundId) return;
    getFundById(fundId).then((res) => {
      setFund(res.data);
    });
  }, [fundId]);

  useEffect(() => {
    if (!investorId) return;
    getWalletBalanceByInvestorId(investorId)
     .then((res) => setWalletBalance(res.data.walletValue))

      .catch((err) => {
        console.error("Error fetching wallet balance", err);
        setWalletBalance(0); // fallback
      });
  }, [investorId]);

  if (!fund) return <div>Loading...</div>;

  const { name, currentNav, riskLevel, category, benchmarkIndex } = fund;

  return (
    <div className="bg-white shadow-md rounded-xl p-4 space-y-4">
      <h2 className="text-lg font-semibold text-indigo-700">{name}</h2>

      <div className="grid grid-cols-2 gap-2 text-sm">
        <p className="text-gray-800">📈 <strong>Cur NAV:</strong> ₹{currentNav}</p>
        <p className="text-gray-700">📊 <strong>Risk:</strong> {riskLevel}</p>
        <p className="text-gray-700">📁 <strong>Category:</strong> {category}</p>
        <p className="text-gray-700">📍 <strong>Benchmark:</strong> {benchmarkIndex}</p>
      </div>

      <hr />

      <div className="flex items-center justify-between text-sm">
        <span className="text-gray-700">
          💼 <strong>Wallet Balance:</strong>{" "}
          {walletBalance === null
            ? "Loading..."
            : showWallet ?  "•••••": `₹${walletBalance.toLocaleString()}`}
        </span>
        <button onClick={() => setShowWallet(!showWallet)} className="focus:outline-none">
          {showWallet ? (
            <FaEyeSlash className="w-5 h-5 text-gray-500" />
          ) : (
            <FaEye className="w-5 h-5 text-gray-500" />
          )}
        </button>
      </div>

      <div className="text-sm text-gray-700">
        📊 <strong>My Holdings:</strong> {myHoldings.units} units (₹{myHoldings.value.toLocaleString()})
      </div>
    </div>
  );
}

export default FundOverviewCard;
