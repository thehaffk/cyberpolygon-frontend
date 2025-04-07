import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import axiosInstance from '../api/axiosInstance';

const AuthPage = ({ type = 'login' }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [formType, setFormType] = useState(type);
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const validate = () => {
    if (formType === 'register') {
      if (!formData.username.trim()) {
        setError('Имя пользователя обязательно');
        return false;
      }
      if (!/^[a-zA-Z0-9_]+$/.test(formData.username)) {
        setError('Имя пользователя может содержать только буквы, цифры и символ подчеркивания');
        return false;
      }
    }

    if (!formData.email.trim()) {
      setError('Email обязателен');
      return false;
    }
    if (!/\S+@\S+\.\S+/.test(formData.email)) {
      setError('Введите корректный email');
      return false;
    }

    if (!formData.password) {
      setError('Пароль обязателен');
      return false;
    }
    if (formData.password.length < 6) {
      setError('Пароль должен быть не менее 6 символов');
      return false;
    }

    if (formType === 'register' && formData.password !== formData.confirmPassword) {
      setError('Пароли не совпадают');
      return false;
    }

    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    setError(null);
    
    if (!validate()) return;
    
    try {
      setLoading(true);
      
      if (formType === 'login') {
        // В реальном приложении здесь был бы запрос к API
        // const response = await axiosInstance.post('/api/auth/login/', {
        //   email: formData.email,
        //   password: formData.password
        // });

        // Имитация успешного входа
        localStorage.setItem('token', 'demo_token_12345');
        setLoading(false);
        
        // Перенаправление на целевую страницу или на домашнюю страницу
        const from = location.state?.from?.pathname || '/';
        navigate(from, { replace: true });
      } else {
        // В реальном приложении здесь был бы запрос к API
        // const response = await axiosInstance.post('/api/auth/register/', {
        //   username: formData.username,
        //   email: formData.email,
        //   password: formData.password
        // });
        
        // Имитация успешной регистрации
        setTimeout(() => {
          localStorage.setItem('token', 'demo_token_12345');
          setLoading(false);
          navigate('/');
        }, 1000);
      }
    } catch (err) {
      console.error('Ошибка аутентификации:', err);
      setError(err.response?.data?.message || 'Произошла ошибка. Пожалуйста, попробуйте позже.');
      setLoading(false);
    }
  };

  return (
    <div className="container" style={{ paddingTop: '150px', paddingBottom: '80px' }}>
      <div style={{
        maxWidth: '450px',
        margin: '0 auto',
        backgroundColor: 'var(--bg-card)',
        borderRadius: '10px',
        padding: '30px',
        boxShadow: 'var(--card-shadow)',
        border: '1px solid rgba(106, 0, 255, 0.2)'
      }}>
        <h1 style={{
          textAlign: 'center',
          marginBottom: '30px',
          background: 'linear-gradient(90deg, #6a00ff, #00f0ff)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          fontSize: '2rem'
        }}>
          {formType === 'login' ? 'Вход' : 'Регистрация'}
        </h1>
        
        {error && (
          <div style={{
            backgroundColor: 'rgba(255, 68, 68, 0.1)',
            color: '#ff4444',
            padding: '15px',
            borderRadius: '8px',
            marginBottom: '20px',
            fontSize: '0.9rem',
            border: '1px solid rgba(255, 68, 68, 0.3)'
          }}>
            {error}
          </div>
        )}
        
        <form onSubmit={handleSubmit}>
          {formType === 'register' && (
            <div style={{ marginBottom: '20px' }}>
              <label 
                htmlFor="username"
                style={{
                  display: 'block',
                  marginBottom: '8px',
                  color: 'var(--text-light)',
                  fontSize: '0.9rem'
                }}
              >
                Имя пользователя
              </label>
              <input
                type="text"
                id="username"
                name="username"
                value={formData.username}
                onChange={handleChange}
                placeholder="Введите имя пользователя"
                style={{
                  padding: '12px 15px',
                  width: '100%',
                  fontSize: '0.9rem',
                  borderRadius: '8px',
                  border: '1px solid rgba(106, 0, 255, 0.3)',
                  background: 'rgba(26, 28, 41, 0.8)',
                  color: 'white',
                  fontFamily: 'JetBrains Mono, monospace'
                }}
              />
            </div>
          )}
          
          <div style={{ marginBottom: '20px' }}>
            <label 
              htmlFor="email"
              style={{
                display: 'block',
                marginBottom: '8px',
                color: 'var(--text-light)',
                fontSize: '0.9rem'
              }}
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Введите email"
              style={{
                padding: '12px 15px',
                width: '100%',
                fontSize: '0.9rem',
                borderRadius: '8px',
                border: '1px solid rgba(106, 0, 255, 0.3)',
                background: 'rgba(26, 28, 41, 0.8)',
                color: 'white',
                fontFamily: 'JetBrains Mono, monospace'
              }}
            />
          </div>
          
          <div style={{ marginBottom: formType === 'register' ? '20px' : '30px' }}>
            <label 
              htmlFor="password"
              style={{
                display: 'block',
                marginBottom: '8px',
                color: 'var(--text-light)',
                fontSize: '0.9rem'
              }}
            >
              Пароль
            </label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Введите пароль"
              style={{
                padding: '12px 15px',
                width: '100%',
                fontSize: '0.9rem',
                borderRadius: '8px',
                border: '1px solid rgba(106, 0, 255, 0.3)',
                background: 'rgba(26, 28, 41, 0.8)',
                color: 'white',
                fontFamily: 'JetBrains Mono, monospace'
              }}
            />
          </div>
          
          {formType === 'register' && (
            <div style={{ marginBottom: '30px' }}>
              <label 
                htmlFor="confirmPassword"
                style={{
                  display: 'block',
                  marginBottom: '8px',
                  color: 'var(--text-light)',
                  fontSize: '0.9rem'
                }}
              >
                Подтверждение пароля
              </label>
              <input
                type="password"
                id="confirmPassword"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                placeholder="Подтвердите пароль"
                style={{
                  padding: '12px 15px',
                  width: '100%',
                  fontSize: '0.9rem',
                  borderRadius: '8px',
                  border: '1px solid rgba(106, 0, 255, 0.3)',
                  background: 'rgba(26, 28, 41, 0.8)',
                  color: 'white',
                  fontFamily: 'JetBrains Mono, monospace'
                }}
              />
            </div>
          )}
          
          <button
            type="submit"
            disabled={loading}
            style={{
              width: '100%',
              padding: '14px',
              backgroundColor: 'var(--accent-purple)',
              color: 'white',
              border: 'none',
              borderRadius: '8px',
              fontSize: '1rem',
              cursor: loading ? 'not-allowed' : 'pointer',
              opacity: loading ? 0.8 : 1,
              fontFamily: 'JetBrains Mono, monospace',
              marginBottom: '20px'
            }}
          >
            {loading ? (
              'Обработка...'
            ) : (
              formType === 'login' ? 'Войти' : 'Зарегистрироваться'
            )}
          </button>
          
          <div style={{
            textAlign: 'center',
            color: 'var(--text-gray)',
            fontSize: '0.9rem'
          }}>
            {formType === 'login' ? (
              <>
                Нет аккаунта?{' '}
                <button
                  type="button"
                  onClick={() => setFormType('register')}
                  style={{
                    background: 'none',
                    border: 'none',
                    color: 'var(--accent-blue)',
                    cursor: 'pointer',
                    textDecoration: 'underline',
                    fontSize: '0.9rem',
                    fontFamily: 'inherit'
                  }}
                >
                  Зарегистрироваться
                </button>
              </>
            ) : (
              <>
                Уже есть аккаунт?{' '}
                <button
                  type="button"
                  onClick={() => setFormType('login')}
                  style={{
                    background: 'none',
                    border: 'none',
                    color: 'var(--accent-blue)',
                    cursor: 'pointer',
                    textDecoration: 'underline',
                    fontSize: '0.9rem',
                    fontFamily: 'inherit'
                  }}
                >
                  Войти
                </button>
              </>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};

export default AuthPage; 