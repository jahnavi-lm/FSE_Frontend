import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  fetchCompanies,
  openModal,
  closeModal,
} from "../../features/investment/investmentSlice";
import FundCompanyActionModal from "../FundManager/FundCompanyActionModal";

export default function ManagerInvest({ managerId, schemeId }) {
  const dispatch = useDispatch();
  const {
    companies,
    isModalOpen,
    selectedCompany,
    actionType,
    status,
  } = useSelector((state) => state.investment);

  useEffect(() => {
    // Fetch companies only if they haven't been fetched yet
    if (status === 'idle') {
      dispatch(fetchCompanies());
    }
  }, [status, dispatch]);

  const handleAction = (type, company) => {
    if (!schemeId) {
      alert("⚠️ Please select a fund scheme before performing this action.");
      return;
    }
    dispatch(openModal({ actionType: type, company }));
  };

  return (
    <>
      <div className="bg-green-50 border border-green-200 p-6 rounded-xl shadow-inner mt-6">
        <h3 className="text-xl font-semibold text-green-700 mb-4">
          📊 Fund Manager: Invest in Stocks
        </h3>

        {status === 'loading' && (
            <p className="text-sm text-gray-600">Loading companies...</p>
        )}

        {status === 'succeeded' && companies.length === 0 && (
          <p className="text-sm text-gray-600">No companies available for investment.</p>
        )}

        {status === 'succeeded' && companies.length > 0 && (
          <div className="overflow-x-auto">
            <table className="min-w-full border text-sm bg-white">
              <thead className="bg-green-100">
                <tr>
                  <th className="px-4 py-2 border">Symbol</th>
                  <th className="px-4 py-2 border">Name</th>
                  <th className="px-4 py-2 border">Index</th>
                  <th className="px-4 py-2 border">NAV</th>
                  <th className="px-4 py-2 border">Risk Factor</th>
                  <th className="px-4 py-2 border">Total Capital</th>
                  <th className="px-4 py-2 border">Actions</th>
                </tr>
              </thead>
              <tbody>
                {companies.map((company) => (
                  <tr key={company.id} className="hover:bg-green-50">
                    <td className="px-4 py-2 border">{company.symbol}</td>
                    <td className="px-4 py-2 border">{company.name}</td>
                    <td className="px-4 py-2 border">{company.indexName || "—"}</td>
                    <td className="px-4 py-2 border">
                      {company.nav !== null ? `₹${company.nav}` : "null"}
                    </td>
                    <td className="px-4 py-2 border">{company.riskFactor || "null"}</td>
                    <td className="px-4 py-2 border">
                      {company.totalCapital !== null
                        ? `₹${Number(company.totalCapital).toLocaleString()}`
                        : "null"}
                    </td>
                    <td className="px-4 py-2 border text-center">
                      <div className="flex justify-center gap-2">
                        <button
                          className="bg-blue-600 text-white px-3 py-1 rounded-md text-xs hover:bg-blue-700"
                          onClick={() => handleAction("BUY", company)}
                        >
                          Buy
                        </button>
                        {/* <button
                          className="bg-red-500 text-white px-3 py-1 rounded-md text-xs hover:bg-red-600"
                          onClick={() => handleAction("SELL", company)}
                        >
                          Sell
                        </button> */}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      <FundCompanyActionModal
        isOpen={isModalOpen}
        onClose={() => dispatch(closeModal())}
        actionType={actionType}
        company={selectedCompany}
        schemeId={schemeId}
        managerId={managerId}
      />
    </>
  );
}