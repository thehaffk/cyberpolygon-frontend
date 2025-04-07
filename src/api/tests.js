import axiosInstance from './axiosInstance';

const TESTS_URL = '/cyberpolygon/v1/tests';

export const getTests = async (filters = {}) => {
  const response = await axiosInstance.get(TESTS_URL, { params: filters });
  return response.data;
};

export const getTestById = async (testId) => {
  const response = await axiosInstance.get(`${TESTS_URL}/${testId}/`);
  return response.data;
};

export const startTest = async (testId) => {
  const response = await axiosInstance.post(`${TESTS_URL}/${testId}/start/`);
  return response.data;
};

export const submitTest = async (testId, answers) => {
  const response = await axiosInstance.post(`${TESTS_URL}/${testId}/submit/`, { answers });
  return response.data;
};

export const getTestResults = async (testId) => {
  const response = await axiosInstance.get(`${TESTS_URL}/${testId}/results/`);
  return response.data;
}; 