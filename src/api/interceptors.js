import axios from 'axios';
import { API } from '../config/env';

/**
 * Настройка интерцепторов для Axios
 * @param {Function} notifyError - Функция для отображения уведомления об ошибке
 */
export const setupAxiosInterceptors = (notifyError) => {
  // Создаем базовый экземпляр axios
  const axiosInstance = axios.create({
    baseURL: API.URL,
    headers: {
      'Content-Type': 'application/json',
    },
  });

  // Добавляем интерцептор запросов
  axiosInstance.interceptors.request.use(
    (config) => {
      // Добавляем токен авторизации к запросу
      const token = localStorage.getItem('access_token');
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );

  // Добавляем интерцептор ответов
  axiosInstance.interceptors.response.use(
    // Успешный ответ
    (response) => response,
    
    // Обработка ошибок
    async (error) => {
      const originalRequest = error.config;
      
      // Если получили 401, пользователь должен заново авторизоваться
      if (error.response?.status === 401) {
        // Очищаем токен
        localStorage.removeItem('access_token');
        
        // Уведомляем пользователя о необходимости повторного входа
        notifyError('Необходима авторизация. Пожалуйста, войдите снова.');
        
        // Редирект на страницу авторизации
        setTimeout(() => {
          window.location.href = '/auth';
        }, 1500);
      }
      
      // Обработка других ошибок и отображение уведомлений
      handleAxiosError(error, notifyError);
      
      return Promise.reject(error);
    }
  );

  return axiosInstance;
};

/**
 * Обрабатывает ошибки Axios и отображает соответствующие уведомления
 * @param {Error} error - Объект ошибки
 * @param {Function} notifyError - Функция для отображения уведомлений об ошибках
 */
const handleAxiosError = (error, notifyError) => {
  // Проверяем тип ошибки и формируем сообщение
  if (error.response) {
    // Сервер вернул ответ со статусом ошибки
    const status = error.response.status;
    const data = error.response.data;
    
    switch (status) {
      case 400:
        notifyError(data.detail || 'Некорректный запрос');
        break;
      case 401:
        // Обработка 401 уже выполнена в интерцепторе выше
        break;
      case 403:
        notifyError('Доступ запрещен');
        break;
      case 404:
        notifyError('Запрашиваемый ресурс не найден');
        break;
      case 500:
        notifyError('Ошибка сервера. Попробуйте позже');
        break;
      default:
        notifyError(`Ошибка ${status}: ${data.detail || 'Что-то пошло не так'}`);
    }
  } else if (error.request) {
    // Запрос был сделан, но ответ не получен
    notifyError('Нет ответа от сервера. Проверьте подключение к интернету');
  } else {
    // Произошла ошибка при настройке запроса
    notifyError(`Ошибка: ${error.message}`);
  }
}; 