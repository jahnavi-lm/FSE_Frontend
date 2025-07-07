import React, { useState } from "react";
import FundActionModal from "./FundActionModal";

const dummyFund = {
  name: "Bluechip Equity Fund",
  invested: 50000,
  avgNav: 125.5,
  currentNav: 130.75,
};

function FundActionBar() {
  const [showModal, setShowModal] = useState(false);
  const [actionType, setActionType] = useState(null);

  const wallet = 200000;

  const openModal = (type) => {
    setActionType(type);
    setShowModal(true);
  };

  return (
    <div className="bg-white shadow-xl rounded-2xl p-6 flex justify-center space-x-4 mt-10">
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

      {showModal && (
        <FundActionModal
          isOpen={showModal}
          onClose={() => setShowModal(false)}
          actionType={actionType}
          fundData={dummyFund}
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
