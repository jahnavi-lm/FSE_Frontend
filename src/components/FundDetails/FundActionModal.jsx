import React, { useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { Fragment } from "react";

function FundActionModal({ isOpen, onClose, actionType, fundData, wallet = 200000, onConfirm }) {
  const [amount, setAmount] = useState("");

  const {
    name = "Unnamed Fund",
    currentNav = 0,
    avgNav = 0,
    invested = 0,
  } = fundData || {};

  const unitsOwned = invested / avgNav || 0;

  const expectedReturn =
    actionType === "SELL"
      ? (parseFloat(amount || 0) * currentNav).toFixed(2)
      : null;

  const isBuyDisabled = actionType === "BUY" && Number(amount) > wallet;
  const isSellDisabled =
    actionType === "SELL" &&
    (Number(amount) > unitsOwned || isNaN(amount) || Number(amount) <= 0);

  const handleConfirm = () => {
    onConfirm?.(amount);
    onClose();
    setAmount("");
  };

  return (
    <Transition appear show={Boolean(isOpen)} as={Fragment}>
      <Dialog as="div" className="relative z-20" onClose={onClose}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black/30 backdrop-blur-sm" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center px-4 py-6">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-90"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-90"
            >
              <Dialog.Panel className="w-full max-w-md rounded-xl bg-white p-6 shadow-xl">
                <Dialog.Title className="text-xl font-semibold text-indigo-700 mb-4">
                  {actionType === "BUY" ? "Buy More Units" : "Sell Units"} – {name}
                </Dialog.Title>

                <div className="space-y-3 text-gray-700 text-sm">
                  <p>💼 <strong>Current NAV:</strong> ₹{currentNav.toFixed(2)}</p>

                  {actionType === "BUY" && (
                    <p>💰 <strong>Wallet Balance:</strong> ₹{wallet.toLocaleString()}</p>
                  )}

                  {actionType === "SELL" && (
                    <>
                      <p>💸 <strong>Invested Amount:</strong> ₹{invested.toLocaleString()}</p>
                      <p>📈 <strong>Average NAV:</strong> ₹{avgNav.toFixed(2)}</p>
                      <p>📦 <strong>Units Owned:</strong> {unitsOwned.toFixed(2)} units</p>
                      <p>🔁 <strong>Expected Return:</strong> ₹{expectedReturn}</p>
                    </>
                  )}

                  <div>
                    <label className="block text-sm font-medium mb-1">
                      {actionType === "BUY" ? "Amount to Invest (₹)" : "Units to Sell"}
                    </label>
                    <input
                      type="number"
                      className="w-full border border-gray-300 rounded-md p-2"
                      value={amount}
                      onChange={(e) => setAmount(e.target.value)}
                      placeholder={actionType === "BUY" ? "Enter amount" : "Enter units"}
                    />
                  </div>

                  {isBuyDisabled && (
                    <p className="text-red-600 text-sm">
                      Amount exceeds wallet balance.
                    </p>
                  )}
                  {isSellDisabled && (
                    <p className="text-red-600 text-sm">
                      You cannot sell more units than you own.
                    </p>
                  )}
                </div>

                <div className="mt-6 flex justify-end space-x-3">
                  <button
                    onClick={onClose}
                    className="bg-gray-200 hover:bg-gray-300 text-gray-700 px-4 py-2 rounded-lg"
                  >
                    Cancel
                  </button>
                  <button
                    disabled={isBuyDisabled || isSellDisabled}
                    onClick={handleConfirm}
                    className={`px-4 py-2 rounded-lg text-white ${
                      actionType === "BUY"
                        ? "bg-green-600 hover:bg-green-700"
                        : "bg-red-600 hover:bg-red-700"
                    } disabled:opacity-50 disabled:cursor-not-allowed`}
                  >
                    {actionType === "BUY" ? "Buy Now" : "Sell Now"}
                  </button>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
}

export default FundActionModal;
