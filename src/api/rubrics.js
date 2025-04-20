import axiosInstance from './axiosInstance';
import { mockService, shouldUseMocks } from '../services/mockService';

/**
 * API для работы с рубриками статей
 */
const rubricsApi = {
  /**
   * Получить список всех рубрик
   * @returns {Promise<Array>} Массив рубрик
   */
  getRubrics: async () => {
    if (shouldUseMocks()) {
      return mockService.rubrics ? mockService.rubrics.getAll() : [];
    }
    
    const response = await axiosInstance.get('/rubrics/');
    return response.data;
  },

  /**
   * Получить информацию о конкретной рубрике по slug
   * @param {string} slug - Уникальный идентификатор рубрики
   * @returns {Promise<Object>} Объект с информацией о рубрике
   */
  getRubricById: async (id) => {
    if (shouldUseMocks()) {
      return mockService.rubrics ? mockService.rubrics.getById(id) : null;
    }
    
    const response = await axiosInstance.get(`/rubrics/${id}/`);
    return response.data;
  },

  /**
   * Получить статьи из конкретной рубрики
   * @param {string} slug - Уникальный идентификатор рубрики
   * @returns {Promise<Array>} Массив статей в рубрике
   */
  getRubricByName: async (name) => {
    if (shouldUseMocks()) {
      return mockService.rubrics ? mockService.rubrics.getByName(name) : null;
    }
    
    const response = await axiosInstance.get(`/rubrics/${name}/`);
    return response.data;
  },

  /**
   * Получить статьи из конкретной рубрики
   * @param {string} slug - Уникальный идентификатор рубрики
   * @returns {Promise<Array>} Массив статей в рубрике
   */
  getArticles: async (slug) => {
    const response = await axiosInstance.get(`/api/rubrics/${slug}/articles/`);
    return response.data;
  }
};

export default rubricsApi; 