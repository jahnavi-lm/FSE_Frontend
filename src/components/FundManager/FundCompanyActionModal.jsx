import React, { Fragment, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import axiosClient from "../../api/api";

export default function FundCompanyActionModal({
  isOpen,
  onClose,
  actionType,
  company,
  schemeId,
  managerId,
  onTransactionComplete ,
}) {
  const [units, setUnits] = useState("");
  const [result, setResult] = useState(null);

  const nav = company?.nav ?? 0;
  const unitsHeld = "Pending"; // Replace with actual holdings if needed
  const availableCapital = "Pending"; // Replace with real wallet value

  const isInvalid = !units || isNaN(units) || Number(units) <= 0;

  const expectedReturn = actionType === "SELL"
    ? (Number(units) * nav).toFixed(2)
    : null;

  const handleConfirm = async () => {
    try {
      const numberOfStocks = parseInt(units);

      const payload = {
        companyId: company.id,
        companyName: company.symbol,
        numberOfStocks,
        fundSchemeId: schemeId,
      };

      const res = await axiosClient.post(
        `/api/fundManagers/buy/${managerId}`,
        payload
      );

      const {
        investedAmount,
        numberOfStocks: totalStocks,
        investmentDate,
      } = res.data;

      const investedThisTime = (company.nav * numberOfStocks).toFixed(2);
      if (onTransactionComplete) onTransactionComplete();


      setResult({
        message: "Stocks purchased successfully!",
        investedThisTime,
        stocksBought: numberOfStocks,
        totalInvested: investedAmount,
        totalStocksHeld: totalStocks,
        time: investmentDate,
      });

      setUnits("");
    } catch (error) {
      setResult({ message: "Transaction failed." });
    }
  };

  const closeModal = () => {
    setResult(null);
    setUnits("");
    onClose();
  };

  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-30" onClose={closeModal}>
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
          <div className="flex min-h-full items-center justify-center p-4">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-90"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-90"
            >
              <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-xl bg-white p-6 shadow-xl">
                <Dialog.Title className="text-xl font-bold text-center text-teal-700">
                  {actionType === "BUY"
                    ? "Buy Company Shares"
                    : "Sell Company Shares"}
                </Dialog.Title>

                <div className="mt-4 space-y-2 text-sm text-gray-700">
                  <p>
                    🏢 <strong>Company:</strong> {company?.name} (
                    {company?.symbol})
                  </p>
                  <p>
                    📈 <strong>Index:</strong> {company?.indexName || "—"}
                  </p>
                  <p>
                    📊 <strong>Current NAV:</strong> ₹{nav}
                  </p>
                  <p>
                    ⚠️ <strong>Risk Factor:</strong>{" "}
                    {company?.riskFactor ?? "null"}
                  </p>
                  <p>
                    💼 <strong>Total Capital:</strong> ₹
                    {company?.totalCapital ?? "null"}
                  </p>

                  {/* {actionType === "BUY" && (
                    <p>
                      💰 <strong>Available Capital:</strong> ₹
                      {availableCapital.toLocaleString()}
                    </p>
                  )} */}

                  {actionType === "SELL" && (
                    <>
                      {/* <p>
                        📦 <strong>Units Held:</strong> {unitsHeld}
                      </p> */}
                      <p>
                        💸 <strong>Expected Return:</strong> ₹
                        {expectedReturn}
                      </p>
                    </>
                  )}
                </div>

                {!result ? (
                  <>
                    <div className="mt-4">
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        {actionType === "BUY"
                          ? "Units to Buy"
                          : "Units to Sell"}
                      </label>
                      <input
                        type="number"
                        value={units}
                        onChange={(e) => setUnits(e.target.value)}
                        className="w-full p-2 border border-gray-300 rounded-md"
                        placeholder="Enter units"
                      />
                      {isInvalid && units && (
                        <p className="text-red-600 text-xs mt-1">
                          Enter a valid number.
                        </p>
                      )}
                    </div>

                    <div className="mt-6 flex justify-end space-x-3">
                      <button
                        className="px-4 py-2 rounded-md bg-gray-200 text-gray-800 hover:bg-gray-300"
                        onClick={closeModal}
                      >
                        Cancel
                      </button>
                      <button
                        disabled={isInvalid}
                        className="px-4 py-2 rounded-md text-white bg-indigo-600 hover:bg-indigo-700 disabled:opacity-50"
                        onClick={handleConfirm}
                      >
                        {actionType === "BUY" ? "Buy Now" : "Sell Now"}
                      </button>
                    </div>
                  </>
                ) : (
                  <div className="mt-4 bg-green-50 border border-green-200 rounded-md p-3 text-sm text-green-800 space-y-1">
                    <p>✅ {result.message}</p>
                    <p>
                      💼 <strong>Invested This Time:</strong> ₹
                      {result.investedThisTime}
                    </p>
                    <p>
                      📦 <strong>Stocks Bought:</strong> {result.stocksBought}
                    </p>
                    <p>
                      📊 <strong>Total Invested So Far:</strong> ₹
                      {result.totalInvested}
                    </p>
                    <p>
                      📈 <strong>Total Stocks Held:</strong>{" "}
                      {result.totalStocksHeld}
                    </p>
                    <p className="text-xs text-gray-600">
                      🕒 {new Date(result.time).toLocaleString()}
                    </p>
                    <div className="mt-3 flex justify-end">
                      <button
                        className="px-3 py-1 bg-indigo-600 text-white rounded hover:bg-indigo-700"
                        onClick={closeModal}
                      >
                        Close
                      </button>
                    </div>
                  </div>
                )}
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
}
