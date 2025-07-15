import axiosClient from "./api";


export const fetchSchemesByManager = async (managerId) => {
  const response = await axiosClient.get(`/api/fundManagers/schemes/${managerId}`);
  return response.data;
};
