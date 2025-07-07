// investorApi.js
import axiosClient from "./api";

// Example: Fetch all schemes invested by a specific investor | tab : My portfolio
export async function getAllSchemInvestedByInvestor(id) {
  try {
    const response = await axiosClient.get(`/api/investors/fund-summary/${id}`);
    return response.data;
  } catch (error) {
    console.error("Failed to fetch investor portfolio", error);
    throw error;
  }
}
//for getting home pafe top 4 summary cards
export async function getInvestorSummary(investorId) {
  try {
    const response = await axiosClient.get(`/api/investors/summary/${investorId}`);
    return response.data;
  } catch (error) {
    console.error("Failed to fetch investor summary", error);
    throw error;
  }
}

export async function getAllSchemes() {
  try {
    const response = await axiosClient.get(`/api/investors/available-schemes`);
    return response.data;
  } catch (error) {
    console.error("Failed to fetch all schemes", error);
    throw error;
  }
}
