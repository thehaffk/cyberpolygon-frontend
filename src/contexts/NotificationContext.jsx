import React, { createContext, useContext, useEffect, useCallback } from 'react';
import { useSnackbar } from 'notistack';
import { initializeAxios } from '../api/axiosInstance';

/**
 * Контекст для управления уведомлениями
 */
const NotificationContext = createContext(null);

/**
 * Провайдер для системы уведомлений
 */
export const NotificationProvider = ({ children }) => {
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();

  /**
   * Показать уведомление об успехе
   * @param {string} message - Текст уведомления
   * @param {Object} options - Дополнительные опции
   */
  const success = useCallback((message, options = {}) => {
    if (enqueueSnackbar) {
      enqueueSnackbar(message, {
        variant: 'success',
        autoHideDuration: 4000,
        anchorOrigin: { vertical: 'bottom', horizontal: 'right' },
        ...options
      });
    }
  }, [enqueueSnackbar]);

  /**
   * Показать уведомление об ошибке
   * @param {string} message - Текст уведомления
   * @param {Object} options - Дополнительные опции
   */
  const error = useCallback((message, options = {}) => {
    if (enqueueSnackbar) {
      enqueueSnackbar(message, {
        variant: 'error',
        autoHideDuration: 5000,
        anchorOrigin: { vertical: 'bottom', horizontal: 'right' },
        ...options
      });
    }
  }, [enqueueSnackbar]);

  /**
   * Показать информационное уведомление
   * @param {string} message - Текст уведомления
   * @param {Object} options - Дополнительные опции
   */
  const info = useCallback((message, options = {}) => {
    if (enqueueSnackbar) {
      enqueueSnackbar(message, {
        variant: 'info',
        autoHideDuration: 3000,
        anchorOrigin: { vertical: 'bottom', horizontal: 'right' },
        ...options
      });
    }
  }, [enqueueSnackbar]);

  /**
   * Показать предупреждение
   * @param {string} message - Текст уведомления
   * @param {Object} options - Дополнительные опции
   */
  const warning = useCallback((message, options = {}) => {
    if (enqueueSnackbar) {
      enqueueSnackbar(message, {
        variant: 'warning',
        autoHideDuration: 4000,
        anchorOrigin: { vertical: 'bottom', horizontal: 'right' },
        ...options
      });
    }
  }, [enqueueSnackbar]);

  /**
   * Закрыть уведомление
   * @param {string} key - Ключ уведомления
   */
  const close = useCallback((key) => {
    if (closeSnackbar) {
      closeSnackbar(key);
    }
  }, [closeSnackbar]);

  // Инициализация Axios с поддержкой уведомлений
  useEffect(() => {
    if (error) {
      initializeAxios(error);
    }
  }, [error]);

  // Значение контекста
  const contextValue = {
    success,
    error,
    info,
    warning,
    close
  };

  return (
    <NotificationContext.Provider value={contextValue}>
      {children}
    </NotificationContext.Provider>
  );
};

/**
 * Хук для использования системы уведомлений
 * @returns {Object} Методы для работы с уведомлениями
 */
export const useNotify = () => {
  const context = useContext(NotificationContext);
  
  if (!context) {
    // Возвращаем заглушки вместо ошибки
    return {
      success: () => {},
      error: () => {},
      info: () => {},
      warning: () => {},
      close: () => {}
    };
  }
  
  return context;
};

export default NotificationContext; 