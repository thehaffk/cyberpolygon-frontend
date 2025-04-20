import axiosInstance from './axiosInstance';
import { mockService, shouldUseMocks } from '../services/mockService';

/**
 * Получить список всех статей
 * @param {number} rubricId - ID рубрики для фильтрации (опционально)
 * @returns {Promise<Array>} Массив статей
 */
export const getArticles = async (rubricId = null) => {
  if (shouldUseMocks()) {
    return mockService.articles ? mockService.articles.getAll(rubricId) : [];
  }
  
  const url = rubricId ? `/articles/?rubric_id=${rubricId}` : '/articles/';
  const response = await axiosInstance.get(url);
  return response.data;
};

/**
 * Получить детальную информацию о статье по ID
 * @param {number} id - ID статьи
 * @returns {Promise<Object>} Объект с информацией о статье
 */
export const getArticleById = async (id) => {
  if (shouldUseMocks()) {
    return mockService.articles ? mockService.articles.getById(id) : null;
  }
  
  const response = await axiosInstance.get(`/articles/${id}/`);
  return response.data;
};

/**
 * Получить список статей по имени рубрики
 * @param {string} rubricName - Имя рубрики
 * @returns {Promise<Array>} Массив статей в рубрике
 */
export const getArticlesByRubric = async (rubricName) => {
  if (shouldUseMocks()) {
    return mockService.articles ? mockService.articles.getByRubric(rubricName) : [];
  }
  
  const response = await axiosInstance.get(`/articles/rubric/${rubricName}/`);
  return response.data;
};

/**
 * Получить список популярных статей
 * @param {number} limit - Ограничение количества
 * @returns {Promise<Array>} Массив популярных статей
 */
export const getPopularArticles = async (limit = 5) => {
  if (shouldUseMocks()) {
    return mockService.articles ? mockService.articles.getPopular(limit) : [];
  }
  
  const response = await axiosInstance.get('/articles/popular/', { 
    params: { limit } 
  });
  return response.data;
};

/**
 * Получить список тегов для статей
 * @returns {Promise<Array>} Массив тегов
 */
const getTags = async () => {
  const response = await axiosInstance.get('/api/articles/tags/');
  return response.data;
};

const articlesApi = {
  getArticles,
  getArticleById,
  getArticlesByRubric,
  getPopularArticles,
  getTags
};

export default articlesApi; 