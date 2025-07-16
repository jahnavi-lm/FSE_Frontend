import axiosClient from "./api";

// ✅ Get all schemes managed by a Fund Manager
export const fetchSchemesByManager = async (managerId) => {
  const response = await axiosClient.get(`/api/fundManagers/schemes/${managerId}`);
  return response.data;
};

// ✅ Get all companies available to invest
export const fetchCompanies = async () => {
  const response = await axiosClient.get("/api/companies");
  return response.data;
};

// ✅ BUY company shares (for fund manager)
export const buyCompanyShares = async (managerId, payload) => {
  // payload should include: companyId, companyName, numberOfStocks, fundSchemeId
  const response = await axiosClient.post(`/api/fundManagers/buy/${managerId}`, payload);
  return response.data;
};

// 🔁 TODO: SELL company shares (not implemented yet in backend)
export const sellCompanyShares = async (managerId, payload) => {
  // Placeholder logic — implement API when available
  // Example: return await axiosClient.post(`/api/fundManagers/sell/${managerId}`, payload);
  throw new Error("Sell API not implemented yet");
};

export const fetchStrategyCount = async () => {
  const res = await axiosClient.get("/api/statistics/strategies/count");
  return res.data; // Expecting a number
};

export const fetchBacktestCount = async () => {
  const res = await axiosClient.get("/api/statistics/backtest-results/count");
  return res.data; // Expecting a number
};



