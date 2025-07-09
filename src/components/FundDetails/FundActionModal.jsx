import React, { useEffect, useState, Fragment } from "react";
import { Dialog, Transition, Switch } from "@headlessui/react";
import { investInFund, getWalletBalanceByInvestorId } from "../../api/viewfundApi";

function FundActionModal({
  isOpen,
  onClose,
  actionType,
  fundData,
  onConfirm,
}) {
  const [amount, setAmount] = useState("");
  const [buyByAmount, setBuyByAmount] = useState(true); // true = amount, false = units
  const [txnResult, setTxnResult] = useState(null);
  const [wallet, setWallet] = useState(null);
  const user = JSON.parse(localStorage.getItem("user")); // assuming localStorage key is "user"

  const {
    name = "Unnamed Fund",
    currentNav = 0,
    avgNav = 0,
    invested = 0,
    id: schemeId,
    investorId = user?.id,
    
  } = fundData || {};
   
 

  const unitsOwned = invested / avgNav || 0;
  const amountToInvest = buyByAmount
    ? Number(amount)
    : Number(amount) * currentNav;

  const expectedReturn =
    actionType === "SELL"
      ? (parseFloat(amount || 0) * currentNav).toFixed(2)
      : null;

  const isBuyDisabled =
    actionType === "BUY" &&
    (amountToInvest > wallet || amountToInvest <= 0 || isNaN(amount));

  const isSellDisabled =
    actionType === "SELL" &&
    (Number(amount) > unitsOwned || isNaN(amount) || Number(amount) <= 0);

  useEffect(() => {
     if (!investorId) return;
        getWalletBalanceByInvestorId(investorId)
         .then((res) => setWallet(res.data.walletValue))
      .catch((err) => {
        console.error("Failed to fetch wallet", err);
        setWallet(0);
      });
  }, [investorId]);

  const handleConfirm = async () => {
    if (actionType === "BUY") {
      try {
        const res = await investInFund({
          investorId,
          schemeId,
          amount: amountToInvest,
        });
        setTxnResult(res.data);
        setAmount("");
      } catch (err) {
        console.error("Buy failed", err);
        setTxnResult({ message: "Investment failed" });
      }
    } else {
      onConfirm?.(amount); // placeholder
    }
    onClose();
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
               <Dialog.Title className="text-xl font-semibold text-indigo-700 mb-4 text-center">
                {actionType === "BUY" ? "Buy More Units" : "Sell Units"}
                <div className="text-sm font-medium text-gray-600 mt-1">{name}</div>
              </Dialog.Title>


                <div className="space-y-3 text-gray-700 text-sm">
                  <p>💼 <strong>Current NAV:</strong> ₹{currentNav.toFixed(2)}</p>

                  {actionType === "BUY" && (
                    <p>💰 <strong>Wallet Balance:</strong> ₹{wallet !== null ? wallet.toLocaleString() : "Loading..."}</p>
                  )}

                  {actionType === "SELL" && (
                    <>
                      <p>💸 <strong>Invested:</strong> ₹{invested.toLocaleString()}</p>
                      <p>📈 <strong>Avg NAV:</strong> ₹{avgNav.toFixed(2)}</p>
                      <p>📦 <strong>Units Owned:</strong> {unitsOwned.toFixed(2)} units</p>
                      <p>🔁 <strong>Expected Return:</strong> ₹{expectedReturn}</p>
                    </>
                  )}

                  {actionType === "BUY" && (
                    <>
                      <div className="flex items-center justify-between">
                        <span className="text-sm">
                          {buyByAmount ? "💰 Buy by Amount" : "📦 Buy by Units"}
                        </span>
                        <Switch
                          checked={buyByAmount}
                          onChange={setBuyByAmount}
                          className={`${
                            buyByAmount ? "bg-indigo-600" : "bg-gray-300"
                          } relative inline-flex h-6 w-11 items-center rounded-full`}
                        >
                          <span className="sr-only">Toggle Buy Mode</span>
                          <span
                            className={`${
                              buyByAmount ? "translate-x-6" : "translate-x-1"
                            } inline-block h-4 w-4 transform rounded-full bg-white transition`}
                          />
                        </Switch>
                      </div>

                      <div className="mt-2">
                        <label className="block text-sm font-medium mb-1">
                          {buyByAmount ? "Amount to Invest (₹)" : "Units to Buy"}
                        </label>
                        <input
                          type="number"
                          className="w-full border border-gray-300 rounded-md p-2"
                          value={amount}
                          onChange={(e) => setAmount(e.target.value)}
                          placeholder={buyByAmount ? "Enter amount" : "Enter units"}
                        />
                      </div>

                      {isBuyDisabled && (
                        <p className="text-red-600 text-sm">
                          Amount exceeds wallet or is invalid.
                        </p>
                      )}
                    </>
                  )}

                  {isSellDisabled && (
                    <p className="text-red-600 text-sm">
                      You cannot sell more units than owned.
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

                {txnResult && (
                  <div className="mt-4 bg-green-50 border border-green-200 p-3 rounded-md text-sm text-green-800">
                    <p><strong>{txnResult.message}</strong></p>
                    {txnResult.unitsAllocated && (
                      <>
                        <p>✅ Units Allocated: {txnResult.unitsAllocated.toFixed(4)}</p>
                        <p>📈 NAV at Purchase: ₹{txnResult.navAtPurchase}</p>
                        <p>🕒 Time: {new Date(txnResult.txnTime).toLocaleString()}</p>
                      </>
                    )}
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

export default FundActionModal;
