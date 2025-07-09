// viewfundApi.js or investorApi.js
import axiosClient from "./api";

export const getFundById = async (fundId) => {
  const response = await axiosClient.get(`/api/fund-schemes/${fundId}`);
  return response;
};

export const getWalletBalanceByInvestorId = async (investorId) => {
  const response = await axiosClient.get(`/api/investors/wallet-value/${investorId}`);
  return response;
};


export const investInFund = async ({ investorId, schemeId, amount }) => {
  const response = await axiosClient.post("/api/investors/invest", {
    investorId,
    schemeId,
    amount,
  });
  return response;
};