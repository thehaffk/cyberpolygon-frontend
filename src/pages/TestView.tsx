import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axiosInstance from '../api/axiosInstance';

interface Question {
  id: number;
  text: string;
  type: 'single' | 'multiple';
  options: {
    id: number;
    text: string;
  }[];
}

interface Test {
  id: number;
  title: string;
  description: string;
  duration_minutes: number;
  questions_count: number;
  questions: Question[];
}

interface Answers {
  [questionId: number]: number | number[];
}

const TestView: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  
  const [test, setTest] = useState<Test | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<Answers>({});
  const [timeLeft, setTimeLeft] = useState<number>(0);
  const [submitting, setSubmitting] = useState(false);
  const [testCompleted, setTestCompleted] = useState(false);
  const [score, setScore] = useState<{ score: number, max_score: number } | null>(null);

  // Загрузка теста
  useEffect(() => {
    const fetchTest = async () => {
      try {
        setLoading(true);
        const response = await axiosInstance.get(`/api/tests/${id}/`);
        setTest(response.data);
        setTimeLeft(response.data.duration_minutes * 60);
        setError(null);
      } catch (err) {
        console.error('Ошибка при загрузке теста:', err);
        setError('Не удалось загрузить тест. Пожалуйста, попробуйте позже.');
      } finally {
        setLoading(false);
      }
    };

    fetchTest();
  }, [id]);

  // Таймер для теста
  useEffect(() => {
    if (!test || testCompleted || timeLeft <= 0) return;

    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          clearInterval(timer);
          handleSubmitTest();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [test, testCompleted, timeLeft]);

  // Форматирование времени
  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`;
  };

  // Обработка выбора ответа
  const handleSelectAnswer = (questionId: number, optionId: number, isMultiple: boolean) => {
    if (testCompleted) return;

    setAnswers(prev => {
      if (isMultiple) {
        // Для вопросов с несколькими ответами
        const currentAnswers = prev[questionId] as number[] || [];
        if (currentAnswers.includes(optionId)) {
          return {
            ...prev,
            [questionId]: currentAnswers.filter(id => id !== optionId)
          };
        } else {
          return {
            ...prev,
            [questionId]: [...currentAnswers, optionId]
          };
        }
      } else {
        // Для вопросов с одним ответом
        return {
          ...prev,
          [questionId]: optionId
        };
      }
    });
  };

  // Навигация между вопросами
  const goToPreviousQuestion = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(prev => prev - 1);
    }
  };

  const goToNextQuestion = () => {
    if (test && currentQuestion < test.questions.length - 1) {
      setCurrentQuestion(prev => prev + 1);
    }
  };

  // Отправка теста
  const handleSubmitTest = async () => {
    if (!test || submitting) return;

    try {
      setSubmitting(true);
      
      // Проверка наличия ответов на все вопросы
      const unansweredQuestions = test.questions.filter(
        q => !answers[q.id] || (Array.isArray(answers[q.id]) && (answers[q.id] as number[]).length === 0)
      );

      if (unansweredQuestions.length > 0 && timeLeft > 0) {
        if (!window.confirm(`У вас остались неотвеченные вопросы (${unansweredQuestions.length}). Вы уверены, что хотите завершить тест?`)) {
          setSubmitting(false);
          return;
        }
      }

      const response = await axiosInstance.post(`/api/tests/${id}/submit/`, { answers });
      setTestCompleted(true);
      setScore(response.data);
    } catch (err) {
      console.error('Ошибка при отправке ответов:', err);
      setError('Не удалось отправить ответы. Пожалуйста, попробуйте позже.');
    } finally {
      setSubmitting(false);
    }
  };

  // Проверка выбран ли вариант ответа
  const isOptionSelected = (questionId: number, optionId: number, isMultiple: boolean) => {
    const answer = answers[questionId];
    if (!answer) return false;
    
    if (isMultiple) {
      return (answer as number[]).includes(optionId);
    } else {
      return answer === optionId;
    }
  };

  // Рендер завершенного теста
  const renderTestCompleted = () => {
    return (
      <div style={{
        backgroundColor: 'var(--bg-card)',
        borderRadius: '10px',
        padding: '30px',
        boxShadow: 'var(--card-shadow)',
        textAlign: 'center',
        marginTop: '30px'
      }}>
        <h2 style={{
          marginBottom: '20px',
          color: 'var(--text-light)'
        }}>
          Тест завершен!
        </h2>
        
        {score && (
          <div style={{
            fontSize: '1.5rem',
            marginBottom: '20px',
            color: 'var(--text-light)'
          }}>
            Ваш результат: 
            <span style={{
              color: 'var(--accent-blue)',
              fontWeight: 'bold',
              marginLeft: '10px'
            }}>
              {score.score} из {score.max_score} баллов
              ({Math.round((score.score / score.max_score) * 100)}%)
            </span>
          </div>
        )}
        
        <p style={{
          color: 'var(--text-gray)',
          marginBottom: '30px'
        }}>
          Спасибо за прохождение теста. Вы можете просмотреть свои результаты в профиле.
        </p>
        
        <div style={{
          display: 'flex',
          justifyContent: 'center',
          gap: '15px'
        }}>
          <button
            onClick={() => navigate('/tests')}
            style={{
              padding: '10px 20px',
              backgroundColor: 'var(--bg-dark)',
              color: 'var(--text-light)',
              border: '1px solid var(--accent-purple)',
              borderRadius: '5px',
              cursor: 'pointer',
              fontFamily: 'JetBrains Mono, monospace',
              fontSize: '0.9rem'
            }}
          >
            К списку тестов
          </button>
          
          <button
            onClick={() => navigate('/profile')}
            style={{
              padding: '10px 20px',
              backgroundColor: 'var(--accent-purple)',
              color: 'white',
              border: 'none',
              borderRadius: '5px',
              cursor: 'pointer',
              fontFamily: 'JetBrains Mono, monospace',
              fontSize: '0.9rem'
            }}
          >
            В профиль
          </button>
        </div>
      </div>
    );
  };

  // Основной контент
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

  if (testCompleted) {
    return (
      <div className="container" style={{ paddingTop: '120px', paddingBottom: '50px' }}>
        {renderTestCompleted()}
      </div>
    );
  }

  const currentQ = test.questions[currentQuestion];

  return (
    <div className="container" style={{ paddingTop: '120px', paddingBottom: '50px' }}>
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: '20px'
      }}>
        <h1 style={{
          fontSize: '1.8rem',
          background: 'linear-gradient(90deg, #6a00ff, #00f0ff)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
        }}>
          {test.title}
        </h1>
        
        <div style={{
          backgroundColor: timeLeft < 60 ? 'rgba(255, 68, 68, 0.2)' : 'rgba(0, 0, 0, 0.3)',
          color: timeLeft < 60 ? '#ff4444' : 'var(--text-light)',
          padding: '8px 15px',
          borderRadius: '5px',
          fontFamily: 'JetBrains Mono, monospace',
          display: 'flex',
          alignItems: 'center',
          gap: '5px',
          border: timeLeft < 60 ? '1px solid rgba(255, 68, 68, 0.5)' : '1px solid rgba(255, 255, 255, 0.1)'
        }}>
          <span style={{ fontSize: '0.8rem' }}>Осталось:</span>
          <span style={{ fontWeight: 'bold' }}>{formatTime(timeLeft)}</span>
        </div>
      </div>
      
      <div style={{
        backgroundColor: 'var(--bg-card)',
        borderRadius: '10px',
        padding: '25px',
        boxShadow: 'var(--card-shadow)',
        marginBottom: '20px'
      }}>
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: '20px'
        }}>
          <span style={{ color: 'var(--text-gray)', fontSize: '0.9rem' }}>
            Вопрос {currentQuestion + 1} из {test.questions.length}
          </span>
          <span style={{
            backgroundColor: 'rgba(0, 0, 0, 0.3)',
            color: 'var(--accent-blue)',
            padding: '5px 10px',
            borderRadius: '5px',
            fontSize: '0.8rem',
            border: '1px solid rgba(0, 240, 255, 0.3)'
          }}>
            {currentQ.type === 'single' ? 'Один ответ' : 'Несколько ответов'}
          </span>
        </div>
        
        <h2 style={{
          fontSize: '1.2rem',
          marginBottom: '25px',
          color: 'var(--text-light)',
          lineHeight: '1.5'
        }}>
          {currentQ.text}
        </h2>
        
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '12px',
          marginBottom: '30px'
        }}>
          {currentQ.options.map(option => (
            <div 
              key={option.id}
              onClick={() => handleSelectAnswer(currentQ.id, option.id, currentQ.type === 'multiple')}
              style={{
                backgroundColor: isOptionSelected(currentQ.id, option.id, currentQ.type === 'multiple')
                  ? 'rgba(106, 0, 255, 0.2)'
                  : 'rgba(0, 0, 0, 0.2)',
                padding: '15px',
                borderRadius: '8px',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'flex-start',
                gap: '10px',
                border: isOptionSelected(currentQ.id, option.id, currentQ.type === 'multiple')
                  ? '1px solid var(--accent-purple)'
                  : '1px solid rgba(255, 255, 255, 0.1)',
                transition: 'all 0.2s ease'
              }}
            >
              <div style={{
                width: '22px',
                height: '22px',
                borderRadius: currentQ.type === 'single' ? '50%' : '4px',
                border: isOptionSelected(currentQ.id, option.id, currentQ.type === 'multiple')
                  ? '2px solid var(--accent-purple)'
                  : '2px solid rgba(255, 255, 255, 0.3)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginTop: '2px'
              }}>
                {isOptionSelected(currentQ.id, option.id, currentQ.type === 'multiple') && (
                  <div style={{
                    width: '12px',
                    height: '12px',
                    borderRadius: currentQ.type === 'single' ? '50%' : '2px',
                    backgroundColor: 'var(--accent-purple)',
                  }} />
                )}
              </div>
              
              <div style={{
                fontSize: '0.95rem',
                color: 'var(--text-light)',
                lineHeight: '1.5'
              }}>
                {option.text}
              </div>
            </div>
          ))}
        </div>
        
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          marginTop: '20px'
        }}>
          <button
            onClick={goToPreviousQuestion}
            disabled={currentQuestion === 0}
            style={{
              padding: '10px 20px',
              backgroundColor: 'var(--bg-dark)',
              color: currentQuestion === 0 ? 'var(--text-gray)' : 'var(--text-light)',
              border: '1px solid var(--accent-purple)',
              borderRadius: '5px',
              cursor: currentQuestion === 0 ? 'not-allowed' : 'pointer',
              opacity: currentQuestion === 0 ? 0.5 : 1,
              fontFamily: 'JetBrains Mono, monospace',
              fontSize: '0.9rem'
            }}
          >
            Назад
          </button>
          
          {currentQuestion < test.questions.length - 1 ? (
            <button
              onClick={goToNextQuestion}
              style={{
                padding: '10px 20px',
                backgroundColor: 'var(--accent-purple)',
                color: 'white',
                border: 'none',
                borderRadius: '5px',
                cursor: 'pointer',
                fontFamily: 'JetBrains Mono, monospace',
                fontSize: '0.9rem'
              }}
            >
              Далее
            </button>
          ) : (
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
                fontFamily: 'JetBrains Mono, monospace',
                fontSize: '0.9rem',
                opacity: submitting ? 0.7 : 1
              }}
            >
              {submitting ? 'Отправка...' : 'Завершить тест'}
            </button>
          )}
        </div>
      </div>
      
      {/* Навигация по вопросам */}
      <div style={{
        display: 'flex',
        flexWrap: 'wrap',
        gap: '10px',
        marginTop: '20px'
      }}>
        {test.questions.map((q, index) => (
          <button
            key={q.id}
            onClick={() => setCurrentQuestion(index)}
            style={{
              width: '35px',
              height: '35px',
              borderRadius: '50%',
              backgroundColor: currentQuestion === index
                ? 'var(--accent-purple)'
                : answers[q.id]
                  ? 'rgba(0, 240, 255, 0.2)'
                  : 'rgba(0, 0, 0, 0.3)',
              border: currentQuestion === index
                ? 'none'
                : answers[q.id]
                  ? '1px solid var(--accent-blue)'
                  : '1px solid rgba(255, 255, 255, 0.1)',
              color: currentQuestion === index
                ? 'white'
                : answers[q.id]
                  ? 'var(--accent-blue)'
                  : 'var(--text-gray)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              fontFamily: 'JetBrains Mono, monospace',
              fontSize: '0.9rem',
              fontWeight: 'bold'
            }}
          >
            {index + 1}
          </button>
        ))}
      </div>
    </div>
  );
};

export default TestView; 