// src/api/candleImportApi.js
import axios from "axios";

const BASE_URL = "http://localhost:8080/api";

export const getCompaniesByIndex = async (index) => {
  const response = await axios.get(`${BASE_URL}/import/companies`, {
    params: { index },
  });
  return response.data;
};

export const importCandleData = async (indexName) => {
  const response = await axios.post(`${BASE_URL}/import`, {
    indexName,
  });
  return response.data; // this will be a string
};
