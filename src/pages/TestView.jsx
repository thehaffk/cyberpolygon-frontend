import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const TestView = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [test, setTest] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState({});
  const [timeLeft, setTimeLeft] = useState(null);
  const [testComplete, setTestComplete] = useState(false);
  const [result, setResult] = useState(null);
  const [submitting, setSubmitting] = useState(false);

  // Демо-данные для отображения теста
  const demoTest = {
    id: id,
    title: 'Основы кибербезопасности',
    description: 'Проверьте свои знания основ кибербезопасности и базовых принципов защиты информации.',
    questions_count: 5,
    difficulty: 'Начинающий',
    time_limit: 10, // минут
    questions: [
      {
        id: 1,
        text: 'Какой из следующих методов аутентификации считается наиболее безопасным?',
        type: 'single', // один ответ
        options: [
          { id: 1, text: 'Простой пароль' },
          { id: 2, text: 'Двухфакторная аутентификация' },
          { id: 3, text: 'Запоминание имени пользователя в браузере' },
          { id: 4, text: 'Использование одного и того же пароля для всех сервисов' }
        ],
        correct_answer: [2] // Id правильного ответа
      },
      {
        id: 2,
        text: 'Какие из перечисленных являются признаками фишингового письма? (выберите все подходящие варианты)',
        type: 'multiple', // множественный выбор
        options: [
          { id: 1, text: 'Неизвестный или подозрительный отправитель' },
          { id: 2, text: 'Срочность или угрозы в тексте письма' },
          { id: 3, text: 'Запрос личной или финансовой информации' },
          { id: 4, text: 'Приветствие по имени' }
        ],
        correct_answer: [1, 2, 3] // Id правильных ответов
      },
      {
        id: 3,
        text: 'Что такое брутфорс-атака?',
        type: 'single',
        options: [
          { id: 1, text: 'Атака, при которой злоумышленник перебирает все возможные пароли' },
          { id: 2, text: 'Атака на физическую инфраструктуру компании' },
          { id: 3, text: 'Атака, нацеленная на кражу персональных данных через почту' },
          { id: 4, text: 'Атака на беспроводные сети' }
        ],
        correct_answer: [1]
      },
      {
        id: 4,
        text: 'Выберите все правила для создания надежного пароля:',
        type: 'multiple',
        options: [
          { id: 1, text: 'Использование специальных символов, цифр и букв разного регистра' },
          { id: 2, text: 'Использование словарных слов' },
          { id: 3, text: 'Использование имен или дат рождения' },
          { id: 4, text: 'Длина пароля не менее 12 символов' }
        ],
        correct_answer: [1, 4]
      },
      {
        id: 5,
        text: 'Какой тип вредоносного ПО шифрует файлы пользователя и требует выкуп за восстановление доступа?',
        type: 'single',
        options: [
          { id: 1, text: 'Вирус' },
          { id: 2, text: 'Троян' },
          { id: 3, text: 'Программа-шпион (Spyware)' },
          { id: 4, text: 'Программа-вымогатель (Ransomware)' }
        ],
        correct_answer: [4]
      }
    ]
  };

  useEffect(() => {
    // В реальном приложении здесь был бы запрос к API
    const fetchTest = async () => {
      try {
        setLoading(true);
        // const response = await axiosInstance.get(`/tests/${id}/`);
        // setTest(response.data);

        // Используем демо-данные
        setTimeout(() => {
          setTest(demoTest);
          setTimeLeft(demoTest.time_limit * 60); // Конвертируем минуты в секунды
          setLoading(false);
        }, 700);
      } catch (err) {
        console.error('Ошибка при загрузке теста:', err);
        setError('Не удалось загрузить тест. Пожалуйста, попробуйте позже.');
        setLoading(false);
      }
    };

    fetchTest();
  }, [id, demoTest]);

  // Эффект для таймера обратного отсчета
  useEffect(() => {
    if (!loading && timeLeft !== null && !testComplete) {
      if (timeLeft <= 0) {
        handleSubmitTest();
        return;
      }

      const timerId = setInterval(() => {
        setTimeLeft(prev => prev - 1);
      }, 1000);

      return () => clearInterval(timerId);
    }
  }, [loading, timeLeft, testComplete, handleSubmitTest]);

  // Обработка выбора ответа
  const handleAnswerSelect = (questionId, optionId, isMultiple) => {
    if (isMultiple) {
      // Для вопросов с множественным выбором
      setAnswers(prev => {
        const current = prev[questionId] || [];
        if (current.includes(optionId)) {
          return {
            ...prev,
            [questionId]: current.filter(id => id !== optionId)
          };
        } else {
          return {
            ...prev,
            [questionId]: [...current, optionId]
          };
        }
      });
    } else {
      // Для вопросов с одним ответом
      setAnswers(prev => ({
        ...prev,
        [questionId]: [optionId]
      }));
    }
  };

  // Переход к следующему вопросу
  const handleNextQuestion = () => {
    if (currentQuestionIndex < test.questions.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
    }
  };

  // Переход к предыдущему вопросу
  const handlePrevQuestion = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(prev => prev - 1);
    }
  };

  // Обработка завершения теста
  const handleSubmitTest = async () => {
    if (submitting) return;
    
    setSubmitting(true);
    
    try {
      // В реальном приложении здесь был бы запрос к API
      // const response = await axiosInstance.post(`/tests/${id}/submit/`, {
      //   answers: answers
      // });
      
      // Имитация проверки ответов
      setTimeout(() => {
        // Подсчет баллов
        let correctCount = 0;
        
        test.questions.forEach(question => {
          const userAnswers = answers[question.id] || [];
          const correctAnswers = question.correct_answer;
          
          // Проверка совпадения ответов
          if (
            userAnswers.length === correctAnswers.length &&
            userAnswers.every(answer => correctAnswers.includes(answer))
          ) {
            correctCount++;
          }
        });
        
        const score = Math.round((correctCount / test.questions.length) * 100);
        
        setResult({
          score,
          correct_count: correctCount,
          total_questions: test.questions.length,
          time_spent: (test.time_limit * 60) - timeLeft
        });
        
        setTestComplete(true);
        setSubmitting(false);
      }, 1000);
    } catch (err) {
      console.error('Ошибка при отправке ответов:', err);
      setError('Не удалось отправить ответы. Пожалуйста, попробуйте еще раз.');
      setSubmitting(false);
    }
  };

  // Форматирование времени
  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`;
  };

  if (loading) {
    return (
      <div className="container" style={{ paddingTop: '120px', paddingBottom: '50px', textAlign: 'center' }}>
        <div style={{ color: 'var(--text-gray)' }}>Загрузка теста...</div>
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

  if (!test) {
    return (
      <div className="container" style={{ paddingTop: '120px', paddingBottom: '50px', textAlign: 'center' }}>
        <div style={{ color: 'var(--text-gray)' }}>Тест не найден</div>
      </div>
    );
  }

  // Отображение результатов теста
  if (testComplete && result) {
    return (
      <div className="container" style={{ paddingTop: '120px', paddingBottom: '50px' }}>
        <div style={{
          backgroundColor: 'var(--bg-card)',
          borderRadius: '10px',
          padding: '30px',
          boxShadow: 'var(--card-shadow)',
          textAlign: 'center',
          maxWidth: '800px',
          margin: '0 auto'
        }}>
          <h1 style={{
            fontSize: '2rem',
            marginBottom: '30px',
            background: 'linear-gradient(90deg, #6a00ff, #00f0ff)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent'
          }}>
            Результаты теста
          </h1>
          
          <div style={{
            fontSize: '5rem',
            fontWeight: 'bold',
            marginBottom: '20px',
            color: result.score >= 70 ? '#4CAF50' : result.score >= 50 ? '#FFC107' : '#FF5252'
          }}>
            {result.score}%
          </div>
          
          <p style={{
            fontSize: '1.2rem',
            color: 'var(--text-light)',
            marginBottom: '30px'
          }}>
            Вы ответили правильно на {result.correct_count} из {result.total_questions} вопросов
          </p>
          
          <div style={{
            display: 'flex',
            justifyContent: 'center',
            gap: '40px',
            marginBottom: '40px'
          }}>
            <div style={{
              textAlign: 'center',
              color: 'var(--text-gray)'
            }}>
              <div style={{ fontSize: '1.5rem', color: 'var(--accent-blue)', marginBottom: '5px' }}>
                {formatTime(result.time_spent)}
              </div>
              <div>Затраченное время</div>
            </div>
            
            <div style={{
              textAlign: 'center',
              color: 'var(--text-gray)'
            }}>
              <div style={{ 
                fontSize: '1.5rem', 
                color: result.score >= 70 ? '#4CAF50' : result.score >= 50 ? '#FFC107' : '#FF5252',
                marginBottom: '5px'
              }}>
                {result.score >= 70 ? 'Отлично' : result.score >= 50 ? 'Хорошо' : 'Нужно улучшить'}
              </div>
              <div>Оценка</div>
            </div>
          </div>
          
          <div style={{
            display: 'flex',
            justifyContent: 'center',
            gap: '20px',
            flexWrap: 'wrap'
          }}>
            <button
              onClick={() => navigate('/tests')}
              style={{
                padding: '12px 25px',
                backgroundColor: 'transparent',
                color: 'var(--text-light)',
                border: '1px solid var(--accent-purple)',
                borderRadius: '8px',
                cursor: 'pointer',
                fontFamily: 'JetBrains Mono, monospace',
                fontSize: '0.95rem',
                display: 'flex',
                alignItems: 'center',
                gap: '10px'
              }}
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M20 11H7.83L13.42 5.41L12 4L4 12L12 20L13.41 18.59L7.83 13H20V11Z" fill="var(--text-light)"/>
              </svg>
              К списку тестов
            </button>
            
            <button
              onClick={() => {
                setAnswers({});
                setCurrentQuestionIndex(0);
                setTestComplete(false);
                setResult(null);
                setTimeLeft(test.time_limit * 60);
              }}
              style={{
                padding: '12px 25px',
                backgroundColor: 'var(--accent-purple)',
                color: 'white',
                border: 'none',
                borderRadius: '8px',
                cursor: 'pointer',
                fontFamily: 'JetBrains Mono, monospace',
                fontSize: '0.95rem',
                display: 'flex',
                alignItems: 'center',
                gap: '10px'
              }}
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M17.65 6.35C16.2 4.9 14.21 4 12 4C7.58 4 4.01 7.58 4.01 12C4.01 16.42 7.58 20 12 20C15.73 20 18.84 17.45 19.73 14H17.65C16.83 16.33 14.61 18 12 18C8.69 18 6 15.31 6 12C6 8.69 8.69 6 12 6C13.66 6 15.14 6.69 16.22 7.78L13 11H20V4L17.65 6.35Z" fill="white"/>
              </svg>
              Пройти тест заново
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Текущий вопрос
  const currentQuestion = test.questions[currentQuestionIndex];
  const isMultipleChoice = currentQuestion.type === 'multiple';
  const userAnswers = answers[currentQuestion.id] || [];

  return (
    <div className="container" style={{ paddingTop: '120px', paddingBottom: '50px' }}>
      <div style={{
        backgroundColor: 'var(--bg-card)',
        borderRadius: '10px',
        padding: '30px',
        boxShadow: 'var(--card-shadow)',
        maxWidth: '900px',
        margin: '0 auto'
      }}>
        {/* Заголовок теста и таймер */}
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: '30px'
        }}>
          <h1 style={{
            fontSize: '1.5rem',
            color: 'var(--text-light)'
          }}>
            {test.title}
          </h1>
          
          <div style={{
            backgroundColor: 'rgba(0, 0, 0, 0.3)',
            padding: '8px 15px',
            borderRadius: '8px',
            display: 'flex',
            alignItems: 'center',
            gap: '10px',
            border: timeLeft && timeLeft < 60 ? '1px solid rgba(255, 68, 68, 0.5)' : '1px solid rgba(106, 0, 255, 0.3)'
          }}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M11.99 2C6.47 2 2 6.48 2 12C2 17.52 6.47 22 11.99 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 11.99 2ZM12 20C7.58 20 4 16.42 4 12C4 7.58 7.58 4 12 4C16.42 4 20 7.58 20 12C20 16.42 16.42 20 12 20ZM12.5 7H11V13L16.25 16.15L17 14.92L12.5 12.25V7Z" fill={timeLeft && timeLeft < 60 ? '#FF5252' : 'var(--accent-purple)'}/>
            </svg>
            <span style={{
              fontFamily: 'JetBrains Mono, monospace',
              fontSize: '1rem',
              fontWeight: 'bold',
              color: timeLeft && timeLeft < 60 ? '#FF5252' : 'var(--text-light)'
            }}>
              {formatTime(timeLeft)}
            </span>
          </div>
        </div>
        
        {/* Прогресс */}
        <div style={{
          marginBottom: '25px'
        }}>
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            marginBottom: '10px'
          }}>
            <span style={{ color: 'var(--text-gray)', fontSize: '0.9rem' }}>
              Вопрос {currentQuestionIndex + 1} из {test.questions.length}
            </span>
            <span style={{ color: 'var(--text-light)', fontSize: '0.9rem' }}>
              {Math.round(((currentQuestionIndex + 1) / test.questions.length) * 100)}%
            </span>
          </div>
          
          <div style={{
            height: '5px',
            backgroundColor: 'rgba(255, 255, 255, 0.1)',
            borderRadius: '10px',
            overflow: 'hidden'
          }}>
            <div style={{
              height: '100%',
              width: `${((currentQuestionIndex + 1) / test.questions.length) * 100}%`,
              backgroundColor: 'var(--accent-purple)',
              borderRadius: '10px'
            }} />
          </div>
        </div>
        
        {/* Текст вопроса */}
        <div style={{
          marginBottom: '25px'
        }}>
          <h2 style={{
            fontSize: '1.2rem',
            color: 'var(--text-light)',
            marginBottom: '10px'
          }}>
            {currentQuestion.text}
          </h2>
          
          <p style={{ 
            color: 'var(--text-gray)',
            fontSize: '0.9rem'
          }}>
            {isMultipleChoice ? 'Выберите все подходящие варианты' : 'Выберите один вариант'}
          </p>
        </div>
        
        {/* Варианты ответов */}
        <div style={{
          marginBottom: '30px'
        }}>
          {currentQuestion.options.map(option => (
            <div
              key={option.id}
              onClick={() => handleAnswerSelect(currentQuestion.id, option.id, isMultipleChoice)}
              style={{
                backgroundColor: userAnswers.includes(option.id) ? 'rgba(106, 0, 255, 0.1)' : 'rgba(0, 0, 0, 0.2)',
                border: userAnswers.includes(option.id) ? '1px solid rgba(106, 0, 255, 0.5)' : '1px solid rgba(255, 255, 255, 0.05)',
                borderRadius: '8px',
                padding: '15px',
                marginBottom: '10px',
                cursor: 'pointer',
                transition: 'all 0.2s ease',
                display: 'flex',
                alignItems: 'center',
                gap: '15px'
              }}
            >
              <div style={{
                width: '24px',
                height: '24px',
                borderRadius: isMultipleChoice ? '4px' : '50%',
                border: userAnswers.includes(option.id) ? '2px solid var(--accent-purple)' : '2px solid rgba(255, 255, 255, 0.3)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexShrink: 0
              }}>
                {userAnswers.includes(option.id) && (
                  isMultipleChoice ? (
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M9 16.17L4.83 12L3.41 13.41L9 19L21 7L19.59 5.59L9 16.17Z" fill="var(--accent-purple)"/>
                    </svg>
                  ) : (
                    <div style={{
                      width: '12px',
                      height: '12px',
                      borderRadius: '50%',
                      backgroundColor: 'var(--accent-purple)'
                    }} />
                  )
                )}
              </div>
              
              <div style={{
                color: 'var(--text-light)',
                fontSize: '1rem'
              }}>
                {option.text}
              </div>
            </div>
          ))}
        </div>
        
        {/* Навигация */}
        <div style={{
          display: 'flex',
          justifyContent: 'space-between'
        }}>
          <button
            onClick={handlePrevQuestion}
            disabled={currentQuestionIndex === 0}
            style={{
              padding: '10px 20px',
              backgroundColor: 'transparent',
              color: 'var(--text-light)',
              border: '1px solid var(--accent-purple)',
              borderRadius: '5px',
              cursor: currentQuestionIndex === 0 ? 'not-allowed' : 'pointer',
              opacity: currentQuestionIndex === 0 ? 0.5 : 1,
              fontFamily: 'JetBrains Mono, monospace',
              fontSize: '0.9rem',
              display: 'flex',
              alignItems: 'center',
              gap: '5px'
            }}
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M20 11H7.83L13.42 5.41L12 4L4 12L12 20L13.41 18.59L7.83 13H20V11Z" fill="var(--text-light)"/>
            </svg>
            Предыдущий
          </button>
          
          {currentQuestionIndex === test.questions.length - 1 ? (
            <button
              onClick={handleSubmitTest}
              disabled={submitting}
              style={{
                padding: '10px 20px',
                backgroundColor: 'var(--accent-purple)',
                color: 'white',
                border: 'none',
                borderRadius: '5px',
                cursor: submitting ? 'not-allowed' : 'pointer',
                opacity: submitting ? 0.7 : 1,
                fontFamily: 'JetBrains Mono, monospace',
                fontSize: '0.9rem',
                display: 'flex',
                alignItems: 'center',
                gap: '5px'
              }}
            >
              {submitting ? 'Обработка...' : 'Завершить тест'}
              {!submitting && (
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M9 16.17L4.83 12L3.41 13.41L9 19L21 7L19.59 5.59L9 16.17Z" fill="white"/>
                </svg>
              )}
            </button>
          ) : (
            <button
              onClick={handleNextQuestion}
              style={{
                padding: '10px 20px',
                backgroundColor: 'var(--accent-purple)',
                color: 'white',
                border: 'none',
                borderRadius: '5px',
                cursor: 'pointer',
                fontFamily: 'JetBrains Mono, monospace',
                fontSize: '0.9rem',
                display: 'flex',
                alignItems: 'center',
                gap: '5px'
              }}
            >
              Следующий
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 4L10.59 5.41L16.17 11H4V13H16.17L10.59 18.59L12 20L20 12L12 4Z" fill="white"/>
              </svg>
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default TestView; 