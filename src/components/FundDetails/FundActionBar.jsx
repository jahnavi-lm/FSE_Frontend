import React, { useState } from "react";
import { useParams } from "react-router-dom";
import FundActionModal from "./FundActionModal";
import {
  getFundById,
  getWalletBalanceByInvestorId,
} from "../../api/viewfundApi";

function FundActionBar() {
  
const { id: fundId } = useParams();

  const [showModal, setShowModal] = useState(false);
  const [actionType, setActionType] = useState(null);
  const [fundData, setFundData] = useState(null);
  const [wallet, setWallet] = useState(null);

  const storedUser = JSON.parse(localStorage.getItem("user"));
  const investorId = storedUser?.id;

  const openModal = async (type) => {
    setActionType(type);
    setShowModal(true);

    try {
      const fundRes = await getFundById(fundId);
      const walletRes = await getWalletBalanceByInvestorId(investorId);

      setFundData({
        ...fundRes.data,
        investorId,
      });
      setWallet(walletRes.data.walletValue);
    } catch (err) {
      console.error("Error fetching fund/wallet:", err);
    }
  };

  return (
    <div className="bg-white shadow-xl rounded-2xl p-6 flex justify-center space-x-4 mb-10">
      <button
        onClick={() => openModal("BUY")}
        className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg"
      >
        Buy More
      </button>

      <button
        onClick={() => openModal("SELL")}
        className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg"
      >
        Sell Units
      </button>

      {showModal && fundData && (
        <FundActionModal
          isOpen={showModal}
          onClose={() => setShowModal(false)}
          actionType={actionType}
          fundData={fundData}
          wallet={wallet}
          onConfirm={(amt) => {
            console.log(`${actionType} confirmed for ₹${amt}`);
            setShowModal(false);
          }}
        />
      )}
    </div>
  );
}

export default FundActionBar;
