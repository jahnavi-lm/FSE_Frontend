import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  getSchemes,
  getDashboardStats,
  setSelectedScheme,
} from "../../features/fundManager/fundManagerSlice";

import Strategies from "../../components/Dashboard/Strategies";
import Overview from "../../components/Dashboard/Overview";
import Compare from "../../components/Dashboard/Compare";
import Results from "../../components/Dashboard/Results";
import ImportCandleData from "../../components/dashboard/ImportCandleData";
import BacktestYourScript from "./BacktestYourScript";
import PortfolioSummary from "../../components/Dashboard/ManagerPoertfolioSum";
import ManagerInvest from "../../components/Dashboard/ManagerInvest";

const FundManagerDashboard = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const { schemes, selectedScheme, managerData, status } = useSelector(
    (state) => state.fundManager
  );

  const currentSchem = schemes.find(scheme => scheme.id === selectedScheme);
  const investedCompanyList = currentSchem?.companiesInvestedIn || [];

  // NEW: get transaction history and AUM to pass to Overview
  const transectionHistory = currentSchem?.transectionHistory || [];
  const aum = currentSchem?.aum || 0;

  const [showValues, setShowValues] = useState(true);
  const [selectedTab, setSelectedTab] = useState("Overview");

  const fundManagerId = user?.id;

  const handleTransactionComplete = () => {
    dispatch(getSchemes(fundManagerId));
  };

  useEffect(() => {
    if (fundManagerId) {
      dispatch(getSchemes(fundManagerId));
      dispatch(getDashboardStats());
    }
  }, [fundManagerId, dispatch]);

  const handleSchemeChange = (e) => {
    dispatch(setSelectedScheme(e.target.value));
  };

  const tabs = [
    "Overview",
    "Invest",
    "Strategies",
    "Compare",
    // "Results",
    "Candle Data",
    "Backtest Your Script",
    
  ];

  return (
    <div className="max-w-7xl mx-auto px-6 py-6 min-h-screen">
      {/* Fund Scheme Selector */}
      <div className="bg-white border border-gray-200 p-6 rounded-xl shadow-sm mb-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div className="w-full md:w-auto">
            <h2 className="text-lg font-semibold text-gray-700 mb-2 md:mb-1">
              🏦 Select Your Fund
            </h2>
            <select
              value={selectedScheme}
              onChange={handleSchemeChange}
              className="w-full md:w-72 px-4 py-2 border border-gray-300 rounded-lg shadow-sm text-sm focus:ring-2 focus:ring-teal-500 focus:outline-none"
            >
              {status === "loading" && !schemes.length ? (
                <option value="" disabled>
                  ⏳ Loading schemes...
                </option>
              ) : schemes.length === 0 ? (
                <option value="" disabled>
                  -- No Schemes Found --
                </option>
              ) : (
                <>
                  <option value="" disabled>
                    -- Choose a Scheme --
                  </option>
                  {schemes.map((scheme) => (
                    <option key={scheme.id} value={scheme.id}>
                      {scheme.name || `Scheme ${scheme.id}`}
                    </option>
                  ))}
                </>
              )}
            </select>
          </div>
        </div>
      </div>

      {/* Portfolio Summary */}
      {selectedScheme ? (
        <PortfolioSummary
          showValues={showValues}
          toggleShowValues={() => setShowValues(!showValues)}
          data={{
            capital: currentSchem?.totalCapital || 0,
            aum: currentSchem?.aum || 0,
            pnl: currentSchem?.pnl || 0,
            strategies: managerData?.strategies ?? 0,
            backtest: managerData?.backtest ?? 0,
          }}
        />
      ) : (
        <div className="bg-yellow-50 text-yellow-800 border border-yellow-200 rounded-xl p-4 mb-6 text-sm font-medium">
          ⚠️ Please select a scheme to view portfolio summary.
        </div>
      )}

      {/* Tab Section */}
      <div className="bg-white p-6 border border-gray-200 rounded-xl shadow-sm mb-6">
        <div className="flex space-x-6 overflow-x-auto mb-6">
          {tabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setSelectedTab(tab)}
              className={`pb-2 text-md font-medium transition-all duration-200 ${
                selectedTab === tab
                  ? "text-teal-600 border-b-2 border-teal-600"
                  : "text-gray-500 hover:text-blue-600"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        <div>
          {/* UPDATED Overview: pass company list, transaction history, AUM */}
          {selectedTab === "Overview" && (
            <Overview
              managerId={fundManagerId}
              schemeId={selectedScheme}
              onTransactionComplete={handleTransactionComplete}
              investedCompanyList={investedCompanyList}
              transectionHistory={transectionHistory}
              currentAum={aum}
            />
          )}

          {selectedTab === "Strategies" && <Strategies />}
          {selectedTab === "Compare" && <Compare />}
          {/* {selectedTab === "Results" && <Results />} */}
          {selectedTab === "Candle Data" && <ImportCandleData />}
          {selectedTab === "Backtest Your Script" && <BacktestYourScript />}
          {selectedTab === "Invest" && (
            <ManagerInvest
              managerId={fundManagerId}
              schemeId={selectedScheme}
              onTransactionComplete={handleTransactionComplete}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default FundManagerDashboard;
