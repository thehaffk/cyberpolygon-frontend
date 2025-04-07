import axiosInstance from './axiosInstance';

interface Test {
  id: number;
  title: string;
  description: string;
  questions_count: number;
}

interface Question {
  id: number;
  text: string;
  is_multiple_choice: boolean;
  answers: {
    id: number;
    text: string;
  }[];
}

interface TestDetail extends Test {
  questions: Question[];
}

interface TestSubmission {
  question_id: number;
  selected_answers: number[];
}

interface TestResult {
  score: number;
  max_score: number;
  percentage: number;
  correct_answers: number;
  partial_answers: number;
  total_questions: number;
}

const testsApi = {
  // Получение списка всех тестов
  list: async (): Promise<Test[]> => {
    const response = await axiosInstance.get('/cyberpolygon/v1/tests/');
    return response.data;
  },
  
  // Получение детальной информации о тесте по id
  get: async (id: number | string): Promise<TestDetail> => {
    const response = await axiosInstance.get(`/cyberpolygon/v1/tests/${id}/`);
    return response.data;
  },
  
  // Отправка ответов пользователя для проверки
  submit: async (id: number | string, answers: TestSubmission[]): Promise<TestResult> => {
    const response = await axiosInstance.post(`/cyberpolygon/v1/tests/${id}/submit/`, { answers });
    return response.data;
  }
};

export default testsApi; 