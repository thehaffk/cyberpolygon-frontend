import { setupAxiosInterceptors } from './interceptors';

// Создаем экземпляр axios без привязки к конкретному notifyError
// Будем использовать этот экземпляр до инициализации провайдера уведомлений
const axiosInstance = setupAxiosInterceptors(() => {
  console.error('Notification provider not initialized yet');
});

/**
 * Инициализирует экземпляр Axios с поддержкой уведомлений
 * @param {Function} notifyError - Функция для отображения уведомлений об ошибках
 */
export const initializeAxios = (notifyError) => {
  // Пересоздаем экземпляр axios с привязкой к notifyError
  const newInstance = setupAxiosInterceptors(notifyError);
  
  // Заменяем все методы в исходном экземпляре
  Object.keys(newInstance).forEach(key => {
    if (typeof newInstance[key] === 'function') {
      axiosInstance[key] = newInstance[key].bind(newInstance);
    } else {
      axiosInstance[key] = newInstance[key];
    }
  });
  
  // Заменяем headers и defaults
  axiosInstance.defaults = newInstance.defaults;
  axiosInstance.interceptors = newInstance.interceptors;
};

export default axiosInstance;