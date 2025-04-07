import axiosInstance from './axiosInstance';

const TASKS_URL = '/cyberpolygon/v1/tasks';

export const getTasks = async (filters = {}) => {
  const response = await axiosInstance.get(TASKS_URL, { params: filters });
  return response.data;
};

export const getTaskById = async (taskId) => {
  const response = await axiosInstance.get(`${TASKS_URL}/${taskId}/`);
  return response.data;
};

export const submitFlag = async (taskId, flag) => {
  const response = await axiosInstance.post(`${TASKS_URL}/${taskId}/submit/`, { flag });
  return response.data;
};

export const getTaskHint = async (taskId) => {
  const response = await axiosInstance.get(`${TASKS_URL}/${taskId}/hint/`);
  return response.data;
};

export const getTaskProgress = async (taskId) => {
  const response = await axiosInstance.get(`${TASKS_URL}/${taskId}/progress/`);
  return response.data;
}; 