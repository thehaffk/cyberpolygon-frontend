import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axiosInstance from '../api/axiosInstance';

const TestsPage = () => {
  const [tests, setTests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filter, setFilter] = useState('all');

  // Демо данные для отображения
  const demoTests = [
    {
      id: 1,
      title: 'Основы кибербезопасности',
      description: 'Проверьте свои знания основ кибербезопасности и базовых принципов защиты информации.',
      questions_count: 20,
      difficulty: 'Начинающий',
      time_limit: 30, // минут
      is_completed: true,
      score: 85, // процент правильных ответов
      completed_at: '2023-12-10'
    },
    {
      id: 2,
      title: 'Криптография и шифрование',
      description: 'Тест для проверки знаний в области криптографии, алгоритмов шифрования и защиты данных.',
      questions_count: 15,
      difficulty: 'Средний',
      time_limit: 25,
      is_completed: false,
      score: null,
      completed_at: null
    },
    {
      id: 3,
      title: 'Веб-безопасность',
      description: 'Проверьте свои знания в области безопасности веб-приложений, включая XSS, CSRF и SQL-инъекции.',
      questions_count: 25,
      difficulty: 'Продвинутый',
      time_limit: 40,
      is_completed: false,
      score: null,
      completed_at: null
    },
    {
      id: 4,
      title: 'Социальная инженерия',
      description: 'Тест на знание методов социальной инженерии и способов защиты от них.',
      questions_count: 18,
      difficulty: 'Начинающий',
      time_limit: 25,
      is_completed: true,
      score: 92,
      completed_at: '2023-12-15'
    }
  ];

  useEffect(() => {
    // В реальном приложении здесь был бы запрос к API
    const fetchTests = async () => {
      try {
        setLoading(true);
        // const response = await axiosInstance.get('/tests/');
        // setTests(response.data);
        
        // Используем демо-данные
        setTimeout(() => {
          setTests(demoTests);
          setLoading(false);
        }, 700);
      } catch (err) {
        console.error('Ошибка при загрузке тестов:', err);
        setError('Не удалось загрузить тесты. Пожалуйста, попробуйте позже.');
        setLoading(false);
      }
    };

    fetchTests();
  }, []);

  // Фильтрация тестов
  const filteredTests = tests.filter(test => {
    if (filter === 'completed') return test.is_completed;
    if (filter === 'not_completed') return !test.is_completed;
    return true; // 'all'
  });

  // Получение цвета индикатора сложности
  const getDifficultyColor = (difficulty) => {
    switch (difficulty) {
      case 'Начинающий':
        return 'var(--accent-blue)';
      case 'Средний':
        return '#ffc107';
      case 'Продвинутый':
        return '#ff4444';
      default:
        return 'var(--text-gray)';
    }
  };

  // Получение CSS стилей для бордера сложности
  const getDifficultyBorder = (difficulty) => {
    switch (difficulty) {
      case 'Начинающий':
        return '1px solid rgba(0, 240, 255, 0.3)';
      case 'Средний':
        return '1px solid rgba(255, 193, 7, 0.3)';
      case 'Продвинутый':
        return '1px solid rgba(255, 68, 68, 0.3)';
      default:
        return '1px solid rgba(255, 255, 255, 0.1)';
    }
  };

  if (loading) {
    return (
      <div className="container" style={{ paddingTop: '120px', paddingBottom: '50px', textAlign: 'center' }}>
        <div style={{ color: 'var(--text-gray)' }}>Загрузка тестов...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container" style={{ paddingTop: '120px', paddingBottom: '50px' }}>
        <div style={{
          textAlign: 'center',
          padding: '20px',
          background: 'rgba(255, 68, 68, 0.1)',
          borderRadius: '8px',
          color: '#ff4444'
        }}>
          {error}
        </div>
      </div>
    );
  }

  return (
    <div className="container" style={{ paddingTop: '120px', paddingBottom: '50px' }}>
      <h1 style={{
        textAlign: 'center',
        marginBottom: '50px',
        background: 'linear-gradient(90deg, #6a00ff, #00f0ff)',
        WebkitBackgroundClip: 'text',
        WebkitTextFillColor: 'transparent',
        fontSize: '2.5rem'
      }}>
        Тесты знаний
      </h1>
      
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: '30px'
      }}>
        <p style={{ color: 'var(--text-gray)', fontSize: '1.1rem' }}>
          Проверьте свои знания, пройдя наши тесты по кибербезопасности
        </p>
        
        <div style={{
          display: 'flex',
          alignItems: 'center'
        }}>
          <label htmlFor="filter" style={{ color: 'var(--text-light)', marginRight: '10px' }}>
            Фильтр:
          </label>
          <select
            id="filter"
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            style={{
              backgroundColor: 'rgba(0, 0, 0, 0.3)',
              color: 'var(--text-light)',
              padding: '8px 15px',
              borderRadius: '5px',
              border: '1px solid rgba(106, 0, 255, 0.3)',
              fontFamily: 'JetBrains Mono, monospace',
              cursor: 'pointer'
            }}
          >
            <option value="all">Все тесты</option>
            <option value="completed">Пройденные</option>
            <option value="not_completed">Не пройденные</option>
          </select>
        </div>
      </div>
      
      {filteredTests.length === 0 ? (
        <div style={{
          textAlign: 'center',
          padding: '40px',
          backgroundColor: 'var(--bg-card)',
          borderRadius: '10px',
          color: 'var(--text-gray)'
        }}>
          По выбранному фильтру тестов не найдено
        </div>
      ) : (
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(350px, 1fr))',
          gap: '25px',
          marginBottom: '30px'
        }}>
          {filteredTests.map(test => (
            <div
              key={test.id}
              style={{
                backgroundColor: 'var(--bg-card)',
                borderRadius: '10px',
                overflow: 'hidden',
                boxShadow: 'var(--card-shadow)',
                border: test.is_completed ? '1px solid rgba(76, 175, 80, 0.3)' : '1px solid rgba(106, 0, 255, 0.2)'
              }}
            >
              <div style={{
                padding: '20px',
                borderBottom: '1px solid rgba(255, 255, 255, 0.05)'
              }}>
                <div style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  marginBottom: '15px'
                }}>
                  <span style={{
                    backgroundColor: 'rgba(0, 0, 0, 0.3)',
                    color: getDifficultyColor(test.difficulty),
                    padding: '5px 10px',
                    borderRadius: '5px',
                    fontSize: '0.8rem',
                    fontWeight: 'bold',
                    border: getDifficultyBorder(test.difficulty)
                  }}>
                    {test.difficulty}
                  </span>
                  
                  <span style={{
                    backgroundColor: 'rgba(0, 0, 0, 0.3)',
                    color: 'var(--text-gray)',
                    padding: '5px 10px',
                    borderRadius: '5px',
                    fontSize: '0.8rem',
                    border: '1px solid rgba(255, 255, 255, 0.1)',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '5px'
                  }}>
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M11.99 2C6.47 2 2 6.48 2 12C2 17.52 6.47 22 11.99 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 11.99 2ZM12 20C7.58 20 4 16.42 4 12C4 7.58 7.58 4 12 4C16.42 4 20 7.58 20 12C20 16.42 16.42 20 12 20ZM12.5 7H11V13L16.25 16.15L17 14.92L12.5 12.25V7Z" fill="var(--text-gray)"/>
                    </svg>
                    {test.time_limit} мин
                  </span>
                </div>
                
                <h2 style={{
                  fontSize: '1.3rem',
                  marginBottom: '10px',
                  color: 'var(--text-light)'
                }}>
                  {test.title}
                </h2>
                
                <p style={{
                  color: 'var(--text-gray)',
                  fontSize: '0.95rem',
                  lineHeight: '1.5',
                  marginBottom: '20px',
                  minHeight: '60px'
                }}>
                  {test.description}
                </p>
                
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '20px',
                  marginBottom: '5px'
                }}>
                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '5px',
                    color: 'var(--text-gray)',
                    fontSize: '0.9rem'
                  }}>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M19 3H5C3.9 3 3 3.9 3 5V19C3 20.1 3.9 21 5 21H19C20.1 21 21 20.1 21 19V5C21 3.9 20.1 3 19 3ZM19 19H5V5H19V19ZM7 10H9V17H7V10ZM11 7H13V17H11V7ZM15 13H17V17H15V13Z" fill="var(--text-gray)"/>
                    </svg>
                    {test.questions_count} вопросов
                  </div>
                  
                  {test.is_completed && (
                    <div style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '5px',
                      color: '#4CAF50',
                      fontSize: '0.9rem'
                    }}>
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M9 16.17L4.83 12L3.41 13.41L9 19L21 7L19.59 5.59L9 16.17Z" fill="#4CAF50"/>
                      </svg>
                      Пройден
                    </div>
                  )}
                </div>
              </div>
              
              {test.is_completed ? (
                <div style={{
                  padding: '15px 20px',
                  backgroundColor: 'rgba(76, 175, 80, 0.1)',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center'
                }}>
                  <div>
                    <div style={{
                      color: '#4CAF50',
                      fontSize: '0.9rem',
                      fontWeight: 'bold'
                    }}>
                      Результат: {test.score}%
                    </div>
                    <div style={{
                      color: 'var(--text-gray)',
                      fontSize: '0.8rem'
                    }}>
                      Пройден: {new Date(test.completed_at).toLocaleDateString()}
                    </div>
                  </div>
                  
                  <Link
                    to={`/tests/${test.id}`}
                    style={{
                      padding: '8px 15px',
                      backgroundColor: '#4CAF50',
                      color: 'white',
                      borderRadius: '5px',
                      textDecoration: 'none',
                      fontSize: '0.85rem',
                      fontFamily: 'JetBrains Mono, monospace',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '5px'
                    }}
                  >
                    Пройти снова
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M17.65 6.35C16.2 4.9 14.21 4 12 4C7.58 4 4.01 7.58 4.01 12C4.01 16.42 7.58 20 12 20C15.73 20 18.84 17.45 19.73 14H17.65C16.83 16.33 14.61 18 12 18C8.69 18 6 15.31 6 12C6 8.69 8.69 6 12 6C13.66 6 15.14 6.69 16.22 7.78L13 11H20V4L17.65 6.35Z" fill="white"/>
                    </svg>
                  </Link>
                </div>
              ) : (
                <div style={{
                  padding: '15px 20px',
                  backgroundColor: 'rgba(106, 0, 255, 0.1)',
                  display: 'flex',
                  justifyContent: 'center'
                }}>
                  <Link
                    to={`/tests/${test.id}`}
                    style={{
                      padding: '8px 15px',
                      backgroundColor: 'var(--accent-purple)',
                      color: 'white',
                      borderRadius: '5px',
                      textDecoration: 'none',
                      fontSize: '0.85rem',
                      fontFamily: 'JetBrains Mono, monospace',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '5px',
                      width: '100%',
                      justifyContent: 'center'
                    }}
                  >
                    Начать тест
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M8 5V19L19 12L8 5Z" fill="white"/>
                    </svg>
                  </Link>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default TestsPage; 