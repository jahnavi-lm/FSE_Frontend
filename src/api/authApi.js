//File authApi.js

// investorApi.js
import axiosClient from "./api";

//Login Passowrd Check
export const loginUser = async (email, password) => {
  const response = await axiosClient.post("/api/auth/login", {
    email,
    password
  });
  return response.data;
};

//register 
export const registerUser = async ({ name, email, password, userRole }) => {
  const response = await axiosClient.post("/api/auth/register", {
    name,
    email,
    password,
    userRole,
  });
  return response.data;
};

//Form Completed for Investor
// ✅ Save/Complete Investor Profile (POST)
export const createInvestorProfile = async (investorData) => {
  const response = await axiosClient.post("/api/investors/create", investorData);
  return response.data;
};


// ✅ Get Investor by User ID (to check if already exists)
export const fetchInvestorById = async (userId) => {
  const response = await axiosClient.get(`/api/investors/exists/${userId}`);
  return response.data;
};

export const createAmcProfile = async (userId, payload) => {
  const response = await axiosClient.post(`/api/amcs/create/${userId}`, payload);
  return response.data;
};

// ✅ Save/Complete Fund Manager Profile (POST)
export const createFundManagerProfile = async (payload) => {
  const response = await axiosClient.post("/api/fundManagers/create", payload);
  return response.data;
};
