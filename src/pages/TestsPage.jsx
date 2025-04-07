import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getTests } from '../api/tests';

const TestsPage = () => {
  const navigate = useNavigate();
  const [tests, setTests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filter, setFilter] = useState('all');

  useEffect(() => {
    const loadTests = async () => {
      try {
        setLoading(true);
        const testsData = await getTests();
        setTests(testsData);
      } catch (err) {
        console.error('Error loading tests:', err);
        setError('Не удалось загрузить тесты');
      } finally {
        setLoading(false);
      }
    };

    loadTests();
  }, []);

  const filteredTests = filter === 'all' 
    ? tests 
    : filter === 'completed' 
      ? tests.filter(test => test.is_completed)
      : tests.filter(test => !test.is_completed);

  if (loading) {
    return <div className="loading">Загрузка тестов...</div>;
  }

  if (error) {
    return <div className="error">{error}</div>;
  }

  return (
    <div className="tests-page">
      <div className="tests-container">
        <div className="tests-header">
          <h1>Тесты</h1>
          
          <div className="filter-buttons">
            <button 
              className={`filter-button ${filter === 'all' ? 'active' : ''}`}
              onClick={() => setFilter('all')}
            >
              Все
            </button>
            <button 
              className={`filter-button ${filter === 'completed' ? 'active' : ''}`}
              onClick={() => setFilter('completed')}
            >
              Пройденные
            </button>
            <button 
              className={`filter-button ${filter === 'incomplete' ? 'active' : ''}`}
              onClick={() => setFilter('incomplete')}
            >
              Не пройденные
            </button>
          </div>
        </div>

        <div className="tests-grid">
          {filteredTests.map(test => (
            <div 
              key={test.id}
              className={`test-card ${test.is_completed ? 'completed' : ''}`}
              onClick={() => navigate(`/tests/${test.id}`)}
            >
              <h2>{test.title}</h2>
              <p>{test.description}</p>
              
              <div className="test-info">
                <div className="info-item">
                  <span className="label">Вопросов:</span>
                  <span className="value">{test.questions_count}</span>
                </div>
                <div className="info-item">
                  <span className="label">Время:</span>
                  <span className="value">{test.time_limit} мин</span>
                </div>
                <div className="info-item">
                  <span className="label">Очки:</span>
                  <span className="value">{test.points}</span>
                </div>
              </div>

              {test.is_completed && (
                <div className="test-result">
                  <div className="score">
                    Результат: {test.score}/{test.max_score}
                  </div>
                  <div className="completion-date">
                    Пройден: {new Date(test.completed_at).toLocaleDateString()}
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TestsPage; 