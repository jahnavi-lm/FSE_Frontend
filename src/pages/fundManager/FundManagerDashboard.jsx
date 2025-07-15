import React, { useState, useEffect } from "react";
import {
  FaMoneyBillWave,
  FaChartLine,
  FaLayerGroup,
} from "react-icons/fa";
import Strategies from "../../components/Dashboard/Strategies";
import Backtest from "../../components/Dashboard/Backtest";
import Overview from "../../components/Dashboard/OverView";
import Compare from "../../components/Dashboard/Compare";
import Results from "../../components/Dashboard/Results";
import ImportCandleData from "../../components/dashboard/ImportCandleData";
import { initialResults } from "../../../Data/ResultsData";
import BacktestYourScript from "./BacktestYourScript";
import { fetchSchemesByManager } from "../../api/fundManagerApi";
import PortfolioSummary from "../../components/Dashboard/ManagerPoertfolioSum";
import ManagerInvest from "../../components/Dashboard/ManagerInvest";

const FundManagerDashboard = () => {
  const [showValues, setShowValues] = useState(true);
  const [selectedTab, setSelectedTab] = useState("Overview");
  const [results, setResults] = useState(initialResults);

  const [schemes, setSchemes] = useState([]);
  const [selectedScheme, setSelectedScheme] = useState("");

  const user = JSON.parse(localStorage.getItem("user"));
  const fundManagerId = user?.id;

  useEffect(() => {
    const loadSchemes = async () => {
      try {
        const data = await fetchSchemesByManager(fundManagerId);
        setSchemes(data);
        if (data.length > 0) {
          setSelectedScheme(data[0].schemeId);
        }
      } catch (error) {
        console.error("Error fetching schemes:", error);
      }
    };

    if (fundManagerId) {
      loadSchemes();
    }
  }, [fundManagerId]);

  const managerData = {
    capital: 500000,
    pnl: "Loading..",
    strategies: 8,
    backtests: 15,
  };

  const tabs = [
    "Overview",
    "Strategies",
    "Compare",
    "Results",
    "Candle Data",
    "Backtest Your Script",
    "Invest",
  ];

  return (
    <div className="max-w-7xl mx-auto px-6 py-6 min-h-screen">
      {/* Fund Selector */}
      <div className="bg-white border border-gray-200 p-6 rounded-xl shadow-sm mb-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div className="w-full md:w-auto">
            <h2 className="text-lg font-semibold text-gray-700 mb-2 md:mb-1">
              🏦 Select Your Fund
            </h2>
           <select
              value={selectedScheme}
              onChange={(e) => setSelectedScheme(e.target.value)}
              className="w-full md:w-72 px-4 py-2 border border-gray-300 rounded-lg shadow-sm text-sm focus:ring-2 focus:ring-teal-500 focus:outline-none"
            >
              <option value="" disabled>
                -- Choose a Scheme --
              </option>
              {schemes.map((scheme, index) => (
                <option key={scheme.id || index} value={scheme.schemeId}>
                  {scheme.name || `Scheme ${index + 1}`}
                </option>
              ))}
            </select>

          </div>
        </div>
      </div>

      {/* Portfolio Summary */}
      {selectedScheme ? (
        <PortfolioSummary
          showValues={showValues}
          toggleShowValues={() => setShowValues(!showValues)}
          data={managerData} // Placeholder for API values in future
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

        {/* Tab Content */}
        <div>
          {selectedTab === "Overview" && <Overview />}
          {selectedTab === "Strategies" && <Strategies />}
          {selectedTab === "Compare" && <Compare />}
          {selectedTab === "Results" && <Results results={results} />}
          {selectedTab === "Candle Data" && <ImportCandleData />}
          {selectedTab === "Backtest Your Script" && <BacktestYourScript />}
          {selectedTab === "Invest" && <ManagerInvest managerId={fundManagerId} />}

        </div>
      </div>
    </div>
  );
};

export default FundManagerDashboard;
