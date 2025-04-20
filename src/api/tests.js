import axiosInstance from './axiosInstance';
import { mockService, shouldUseMocks } from '../services/mockService';

export const getTests = async () => {
  if (shouldUseMocks()) {
    return mockService.tests.getAll();
  }
  const response = await axiosInstance.get('/v1/tests/');
  return response.data;
};

export const getTestById = async (id) => {
  if (shouldUseMocks()) {
    return mockService.tests.getById(Number(id));
  }
  const response = await axiosInstance.get(`/v1/tests/${id}/`);
  return response.data;
};

export const startTest = async (testId) => {
  if (shouldUseMocks()) {
    const test = await mockService.tests.getById(Number(testId));
    return { 
      ...test, 
      questions: [
        { id: 1, text: "Какой протокол используется для безопасной передачи веб-страниц?", options: ["HTTP", "HTTPS", "FTP", "SMTP"] },
        { id: 2, text: "Что такое XSS?", options: ["Cross-Site Scripting", "Cross-Server Scripting", "Cross-Site Security", "Cross-Server Security"] }
      ] 
    };
  }
  const response = await axiosInstance.post(`/v1/tests/${testId}/start/`);
  return response.data;
};

export const submitTest = async (id, answers) => {
  if (shouldUseMocks()) {
    return { 
      score: 85, 
      maxScore: 100, 
      correct: 17, 
      total: 20,
      message: "Тест успешно пройден!"
    };
  }
  const response = await axiosInstance.post(`/v1/tests/check/`, { 
    test_id: id,
    answers: answers 
  });
  return response.data;
};

export const getTestResults = async (testId) => {
  if (shouldUseMocks()) {
    return {
      score: 85,
      maxScore: 100,
      date: new Date().toISOString(),
      details: [
        { questionId: 1, correct: true },
        { questionId: 2, correct: true }
      ]
    };
  }
  const response = await axiosInstance.get(`/v1/tests/${testId}/results/`);
  return response.data;
}; 