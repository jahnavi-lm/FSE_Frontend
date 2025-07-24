import React, { Fragment, useEffect, useState, useMemo } from "react";
import { Dialog, Transition } from "@headlessui/react";
import axiosClient from "../../api/api";
import { useSelector, useDispatch } from "react-redux";
import { fetchCompanies } from "../../features/investment/investmentSlice";

export default function FundCompanyActionModal({
  isOverview,
  isOpen,
  onClose,
  actionType,
  company,
  schemeId,
  managerId,
  onTransactionComplete,
  investedCompanyList = [],
}) {
  const dispatch = useDispatch();
  const { companies, status } = useSelector((state) => state.investment);

  useEffect(() => {
    if (status === 'idle') dispatch(fetchCompanies());
  }, [status, dispatch]);

  const [units, setUnits] = useState("");
  const [result, setResult] = useState(null);

  const selectedCompany = companies.find((c) => c.id === company?.companyId);

  const nav = company?.nav ?? selectedCompany?.nav ?? 0;

  // Compute unitsHeld: check prop company, or find in investedCompanyList by id, or symbol as fallback
  const unitsHeld = useMemo(() => {
    if (company?.numberOfStocks !== undefined) return company.numberOfStocks;
    // Try matching by id, fallback to symbol or companyName if id missing
    if (investedCompanyList && company) {
      let holding = null;
      if (company.id) {
        holding = investedCompanyList.find((item) => item.id === company.id);
      }
      if (!holding && company.symbol) {
        holding = investedCompanyList.find((item) => item.symbol === company.symbol);
      }
      if (!holding && company.companyName) {
        holding = investedCompanyList.find((item) => item.companyName === company.companyName);
      }
      return holding ? holding.numberOfStocks : "N/A";
    }
    return "N/A";
  }, [company, investedCompanyList]);

  const isInvalid = !units || isNaN(units) || Number(units) <= 0;
  const expectedReturn = actionType === "SELL"
    ? (Number(units) * nav).toFixed(2)
    : null;

  const handleConfirm = async () => {
    try {
      const numberOfStocks = parseInt(units);
      const payload = {
        companyId: isOverview ? selectedCompany.id : company.id,
        companyName: isOverview ? selectedCompany.companyName : company.symbol,
        numberOfStocks,
        fundSchemeId: schemeId,
      };
      const res = await axiosClient.post(
        `/api/fundManagers/buy/${managerId}`,
        payload
      );
      const { investedAmount, numberOfStocks: totalStocks, investmentDate } = res.data;
      const investedThisTime = (nav * numberOfStocks).toFixed(2);
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
    } catch {
      setResult({ message: "Transaction failed." });
    }
  };

  const closeModal = () => {
    setResult(null);
    setUnits("");
    onClose();
  };

  const handleConfirmSell = async () => {
    try {
      const numberOfStocks = parseInt(units);
      const payload = {
        fundSchemeId: schemeId,
        companyId: isOverview ? selectedCompany.id : company.id,
        stocksToSell: numberOfStocks,
      };
      const res = await axiosClient.post(`/api/fundManagers/sell`, payload);
      const { investedAmount, numberOfStocks: totalStocks, investmentDate } = res.data;
      const investedThisTime = (nav * numberOfStocks).toFixed(2);
      if (onTransactionComplete) onTransactionComplete();
      setResult({
        message: "Stocks sold successfully!",
        investedThisTime,
        stocksBought: numberOfStocks,
        totalInvested: investedAmount,
        totalStocksHeld: totalStocks,
        time: investmentDate,
      });
      setUnits("");
    } catch (error) {
      const msg = error.response?.data?.message || "Transaction failed.";
      setResult({ message: msg });
    }
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
                  {actionType === "BUY" ? "Buy Company Shares" : "Sell Company Shares"}
                </Dialog.Title>
                <div className="mt-4 space-y-2 text-sm text-gray-700">
                  <p>
                    🏢 <strong>Company:</strong>{" "}
                    {company?.name || company?.companyName || selectedCompany?.name || "N/A"} (
                    {company?.symbol || selectedCompany?.symbol || "N/A"})
                  </p>
                  <p>
                    📈 <strong>Index:</strong>{" "}
                    {company?.indexName || selectedCompany?.indexName || "N/A"}
                  </p>
                  <p>
                    📊 <strong>Current NAV:</strong> ₹
                    {company?.nav ?? selectedCompany?.nav ?? "N/A"}
                  </p>
                  <p>
                    ⚠️ <strong>Risk Factor:</strong>{" "}
                    {company?.riskFactor ?? selectedCompany?.riskFactor ?? "N/A"}
                  </p>
                  <p>
                    💼 <strong>Total Capital:</strong> ₹
                    {company?.totalCapital ?? selectedCompany?.totalCapital ?? "N/A"}
                  </p>
                  {actionType === "SELL" && (
                    <>
                      <p>
                        📦 <strong>Units Held:</strong> {unitsHeld}
                      </p>
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
                        onClick={actionType === "BUY" ? handleConfirm : handleConfirmSell}
                      >
                        {actionType === "BUY" ? "Buy Now" : "Sell Now"}
                      </button>
                    </div>
                  </>
                ) : (
                  <div className="mt-4 bg-green-50 border border-green-200 rounded-md p-3 text-sm text-green-800 space-y-1">
                    <p>✅ {result.message}</p>
                    {actionType === "BUY" ? (
                      <>
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
                          📈 <strong>Total Stocks Held:</strong> {result.totalStocksHeld}
                        </p>
                      </>
                    ) : (
                      <>
                        <p>
                          💸 <strong>Amount Credited:</strong> ₹
                          {result.investedThisTime}
                        </p>
                        <p>
                          📦 <strong>Stocks Sold:</strong> {result.stocksBought}
                        </p>
                        <p>
                          📉 <strong>Remaining Stocks:</strong> {result.totalStocksHeld}
                        </p>
                      </>
                    )}
                    <p className="text-xs text-gray-600">
                      🕒 {result.time && new Date(result.time).toLocaleString()}
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
