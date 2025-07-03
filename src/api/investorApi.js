// investorApi.js
import axiosClient from "./api";

// Example: Fetch all schemes invested by a specific investor
export async function getAllSchemInvestedByInvestor(id) {
  try {
    const response = await axiosClient.get(`/investors/portfolio/${id}`);
    return response.data;
  } catch (error) {
    console.error("Failed to fetch investor portfolio", error);
    throw error;
  }
}
