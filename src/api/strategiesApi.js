import axios from 'axios';

const BASE_URL = `${import.meta.env.VITE_API_BASE_URL}/strategies`;

export const getAllStrategies = () => axios.get(BASE_URL);
export const getStrategyById = (id) => axios.get(`${BASE_URL}/${id}`);
export const createOrUpdateStrategy = (strategy) => axios.post(BASE_URL, strategy);
export const deleteStrategy = (id) => axios.delete(`${BASE_URL}/${id}`);
export const startSimulation = (id) => axios.post(`${BASE_URL}/${id}/start`);
export const stopSimulation = (id) => axios.post(`${BASE_URL}/${id}/stop`);
export const completeSimulation = (id, resultJson) => axios.post(`${BASE_URL}/${id}/complete`, resultJson);
