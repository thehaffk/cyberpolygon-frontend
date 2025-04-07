import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axiosInstance from '../api/axiosInstance';

interface Test {
  id: number;
  title: string;
  description: string;
  difficulty: string;
  questions_count: number;
  duration_minutes: number;
  completed: boolean;
  score?: number;
  max_score?: number;
}

const TestsPage: React.FC = () => {
  const [tests, setTests] = useState<Test[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchTests = async () => {
      try {
        setLoading(true);
        const response = await axiosInstance.get('/api/tests/');
        setTests(response.data);
        setError(null);
      } catch (err) {
        console.error('Ошибка при загрузке тестов:', err);
        setError('Не удалось загрузить тесты. Пожалуйста, попробуйте позже.');
      } finally {
        setLoading(false);
      }
    };

    fetchTests();
  }, []);

  // Получение цвета для уровня сложности
  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty.toLowerCase()) {
      case 'легкий':
        return 'var(--accent-blue)';
      case 'средний':
        return '#ffc107';
      case 'сложный':
        return '#ff4444';
      default:
        return 'var(--accent-purple)';
    }
  };

  return (
    <div className="container" style={{ paddingTop: '120px', paddingBottom: '50px' }}>
      <h1 style={{
        textAlign: 'center',
        marginBottom: '40px',
        background: 'linear-gradient(90deg, #6a00ff, #00f0ff)',
        WebkitBackgroundClip: 'text',
        WebkitTextFillColor: 'transparent',
        fontSize: '2.5rem'
      }}>
        Тесты знаний
      </h1>
      
      <p style={{
        textAlign: 'center',
        maxWidth: '700px',
        margin: '0 auto 30px',
        color: 'var(--text-gray)',
        fontSize: '1.1rem'
      }}>
        Проверьте свои знания в области кибербезопасности и получите сертификаты за успешное прохождение тестов.
      </p>

      {loading ? (
        <div style={{ 
          textAlign: 'center', 
          padding: '50px 0',
          color: 'var(--text-gray)'
        }}>
          Загрузка тестов...
        </div>
      ) : error ? (
        <div style={{
          textAlign: 'center',
          padding: '20px',
          background: 'rgba(255, 68, 68, 0.1)',
          borderRadius: '8px',
          color: '#ff4444',
          margin: '30px 0'
        }}>
          {error}
        </div>
      ) : (
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
          gap: '25px',
          marginTop: '20px'
        }}>
          {tests.length === 0 ? (
            <div style={{
              gridColumn: '1 / -1',
              textAlign: 'center',
              padding: '50px 0',
              color: 'var(--text-gray)'
            }}>
              Тесты не найдены
            </div>
          ) : (
            tests.map(test => (
              <div key={test.id} style={{
                backgroundColor: 'var(--bg-card)',
                borderRadius: '10px',
                overflow: 'hidden',
                boxShadow: 'var(--card-shadow)',
                transition: 'all 0.3s ease',
                border: '1px solid rgba(106, 0, 255, 0.2)',
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
              }} className="card">
                {test.completed && (
                  <div style={{
                    position: 'absolute',
                    top: '10px',
                    right: '10px',
                    backgroundColor: 'rgba(76, 175, 80, 0.9)',
                    color: 'white',
                    padding: '5px 10px',
                    borderRadius: '5px',
                    fontSize: '0.8rem',
                    fontWeight: 'bold',
                    zIndex: 1
                  }}>
                    {test.score}/{test.max_score} баллов
                  </div>
                )}
                
                <div style={{ padding: '20px', flexGrow: 1 }}>
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
                      border: `1px solid ${getDifficultyColor(test.difficulty)}`
                    }}>
                      {test.difficulty}
                    </span>
                    <span style={{
                      backgroundColor: 'rgba(0, 0, 0, 0.3)',
                      color: 'var(--text-gray)',
                      padding: '5px 10px',
                      borderRadius: '5px',
                      fontSize: '0.8rem',
                      border: '1px solid rgba(255, 255, 255, 0.1)'
                    }}>
                      {test.duration_minutes} мин
                    </span>
                  </div>
                  
                  <h3 style={{
                    fontSize: '1.2rem',
                    marginBottom: '10px',
                    color: 'var(--text-light)'
                  }}>
                    {test.title}
                  </h3>
                  
                  <p style={{
                    fontSize: '0.9rem',
                    color: 'var(--text-gray)',
                    marginBottom: '15px',
                    lineHeight: '1.5'
                  }}>
                    {test.description.length > 100
                      ? `${test.description.substring(0, 100)}...`
                      : test.description}
                  </p>
                  
                  <span style={{
                    display: 'inline-block',
                    backgroundColor: 'rgba(0, 0, 0, 0.3)',
                    color: 'var(--accent-blue)',
                    padding: '5px 10px',
                    borderRadius: '5px',
                    fontSize: '0.8rem',
                    marginTop: '10px',
                    border: '1px solid rgba(0, 240, 255, 0.3)'
                  }}>
                    {test.questions_count} вопросов
                  </span>
                </div>
                
                <div style={{ padding: '0 20px 20px' }}>
                  <Link 
                    to={`/tests/${test.id}`}
                    style={{
                      display: 'block',
                      width: '100%',
                      padding: '10px',
                      backgroundColor: 'var(--accent-purple)',
                      color: 'white',
                      textAlign: 'center',
                      borderRadius: '5px',
                      textDecoration: 'none',
                      fontFamily: 'JetBrains Mono, monospace',
                      fontSize: '0.9rem',
                      transition: 'all 0.3s ease'
                    }}
                  >
                    {test.completed ? 'Пройти снова' : 'Начать тест'}
                  </Link>
                </div>
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
};

export default TestsPage; 