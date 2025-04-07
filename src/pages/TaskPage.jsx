import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axiosInstance from '../api/axiosInstance';

const TaskPage = () => {
  const { id } = useParams();
  const [task, setTask] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [flagInput, setFlagInput] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [result, setResult] = useState(null);

  // Демо-задание для отображения
  const demoTask = {
    id: id,
    title: 'SQL Injection: Уязвимая авторизация',
    description: `
# SQL Injection в форме авторизации

В этом задании вам предстоит использовать уязвимость SQL Injection, чтобы обойти авторизацию на веб-сайте.

## Описание уязвимости

SQL Injection - это атака, направленная на внедрение SQL-кода в запросы, которые приложение отправляет в базу данных. 
Уязвимость возникает, когда пользовательский ввод не валидируется должным образом.

## Ваша задача

1. Исследуйте форму авторизации
2. Найдите способ обойти проверку пароля
3. Авторизуйтесь как пользователь admin
4. Получите флаг из личного кабинета администратора

## Подсказки

- Стандартный SQL-запрос для проверки авторизации может выглядеть так:
\`\`\`sql
SELECT * FROM users WHERE username = '$username' AND password = '$password'
\`\`\`
- Подумайте, как можно модифицировать этот запрос, чтобы условие всегда возвращало true
- Оператор OR может быть полезен
    `,
    difficulty: 'Средний',
    category: 'Web',
    points: 200,
    solved_by: 128,
    created_at: '2023-12-15',
    is_completed: false,
    vm_url: 'https://lab.cyberpolygon.ru/vm/task123'
  };

  useEffect(() => {
    // В реальном приложении здесь был бы запрос к API
    const fetchTask = async () => {
      try {
        setLoading(true);
        // Имитация запроса
        // const response = await axiosInstance.get(`/api/tasks/${id}`);
        // setTask(response.data);
        
        // Используем демо-данные
        setTimeout(() => {
          setTask(demoTask);
          setLoading(false);
        }, 500);
      } catch (err) {
        console.error('Ошибка при загрузке задания:', err);
        setError('Не удалось загрузить задание. Пожалуйста, попробуйте позже.');
        setLoading(false);
      }
    };

    fetchTask();
  }, [id]);

  const handleSubmitFlag = async (e) => {
    e.preventDefault();
    
    if (!flagInput.trim()) return;
    
    try {
      setSubmitting(true);
      
      // Имитация запроса для проверки флага
      // const response = await axiosInstance.post(`/api/tasks/${id}/check`, {
      //   flag: flagInput
      // });
      
      // Имитация ответа
      setTimeout(() => {
        // Проверка флага (для демо, в реальности это будет на сервере)
        const isCorrect = flagInput.toLowerCase() === 'flag{sql_injection_master}';
        
        setResult({
          success: isCorrect,
          message: isCorrect ? 'Поздравляем! Флаг верный.' : 'Неверный флаг. Попробуйте еще раз.'
        });
        
        if (isCorrect) {
          setTask(prev => ({ ...prev, is_completed: true }));
        }
        
        setSubmitting(false);
      }, 1000);
    } catch (err) {
      console.error('Ошибка при отправке флага:', err);
      setResult({
        success: false,
        message: 'Ошибка при проверке флага. Пожалуйста, попробуйте позже.'
      });
      setSubmitting(false);
    }
  };

  // Функция для рендеринга markdown
  const renderMarkdown = (content) => {
    // В реальном приложении здесь использовался бы react-markdown
    return (
      <div dangerouslySetInnerHTML={{ __html: content
        .replace(/#{1,6} (.+)/g, (match, p1, offset, string) => {
          const level = match.trim().indexOf(' ');
          return `<h${level} style="margin-top: 20px; margin-bottom: 10px; color: var(--text-light)">${p1}</h${level}>`;
        })
        .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
        .replace(/\*(.+?)\*/g, '<em>$1</em>')
        .replace(/```([^`]+)```/g, '<pre style="background-color: rgba(0,0,0,0.3); padding: 10px; border-radius: 8px; overflow-x: auto;"><code>$1</code></pre>')
        .replace(/`([^`]+)`/g, '<code style="background-color: rgba(0,0,0,0.3); padding: 2px 5px; border-radius: 4px;">$1</code>')
        .replace(/- (.+)/g, '<li style="margin-left: 20px;">$1</li>')
        .replace(/\n/g, '<br />')
      }} />
    );
  };

  if (loading) {
    return (
      <div className="container" style={{ paddingTop: '120px', paddingBottom: '50px', textAlign: 'center' }}>
        <div style={{ color: 'var(--text-gray)' }}>Загрузка задания...</div>
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

  if (!task) {
    return (
      <div className="container" style={{ paddingTop: '120px', paddingBottom: '50px', textAlign: 'center' }}>
        <div style={{ color: 'var(--text-gray)' }}>Задание не найдено</div>
      </div>
    );
  }

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
          {task.title}
        </h1>
        
        <div style={{
          display: 'flex',
          gap: '10px',
          alignItems: 'center'
        }}>
          <span style={{
            backgroundColor: 'rgba(0, 0, 0, 0.3)',
            color: task.difficulty === 'Легкий' ? 'var(--accent-blue)' : 
              task.difficulty === 'Средний' ? '#ffc107' : '#ff4444',
            padding: '5px 10px',
            borderRadius: '5px',
            fontSize: '0.8rem',
            fontWeight: 'bold',
            border: `1px solid ${task.difficulty === 'Легкий' ? 'rgba(0, 240, 255, 0.3)' : 
              task.difficulty === 'Средний' ? 'rgba(255, 193, 7, 0.3)' : 'rgba(255, 68, 68, 0.3)'}`
          }}>
            {task.difficulty}
          </span>
          <span style={{
            backgroundColor: 'rgba(0, 0, 0, 0.3)',
            color: 'var(--text-gray)',
            padding: '5px 10px',
            borderRadius: '5px',
            fontSize: '0.8rem',
            border: '1px solid rgba(255, 255, 255, 0.1)'
          }}>
            {task.category}
          </span>
          <span style={{
            backgroundColor: 'rgba(0, 0, 0, 0.3)',
            color: 'var(--accent-purple)',
            padding: '5px 10px',
            borderRadius: '5px',
            fontSize: '0.8rem',
            fontWeight: 'bold',
            border: '1px solid rgba(106, 0, 255, 0.3)'
          }}>
            {task.points} pts
          </span>
        </div>
      </div>
      
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '20px'
      }}>
        {/* Описание задания */}
        <div style={{
          backgroundColor: 'var(--bg-card)',
          borderRadius: '10px',
          padding: '30px',
          boxShadow: 'var(--card-shadow)',
        }}>
          <h2 style={{
            fontSize: '1.3rem',
            marginBottom: '20px',
            color: 'var(--text-light)'
          }}>
            Описание
          </h2>
          
          <div style={{
            color: 'var(--text-light)',
            fontSize: '0.95rem',
            lineHeight: '1.6',
          }}>
            {renderMarkdown(task.description)}
          </div>
        </div>
        
        {/* Форма отправки флага */}
        <div style={{
          backgroundColor: 'var(--bg-card)',
          borderRadius: '10px',
          padding: '30px',
          boxShadow: 'var(--card-shadow)',
        }}>
          <h2 style={{
            fontSize: '1.3rem',
            marginBottom: '20px',
            color: 'var(--text-light)'
          }}>
            Отправить флаг
          </h2>
          
          {task.is_completed ? (
            <div style={{
              backgroundColor: 'rgba(40, 167, 69, 0.1)',
              padding: '15px',
              borderRadius: '8px',
              display: 'flex',
              alignItems: 'center',
              border: '1px solid rgba(40, 167, 69, 0.3)',
              color: '#28a745'
            }}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ marginRight: '10px' }}>
                <path d="M9 16.17L4.83 12L3.41 13.41L9 19L21 7L19.59 5.59L9 16.17Z" fill="#28a745"/>
              </svg>
              Вы уже решили это задание!
            </div>
          ) : (
            <form onSubmit={handleSubmitFlag}>
              <div style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '15px'
              }}>
                <input
                  type="text"
                  placeholder="Введите флаг в формате flag{...}"
                  value={flagInput}
                  onChange={(e) => setFlagInput(e.target.value)}
                  style={{
                    padding: '12px 20px',
                    width: '100%',
                    fontSize: '0.9rem',
                    borderRadius: '8px',
                    border: '1px solid rgba(106, 0, 255, 0.3)',
                    background: 'rgba(26, 28, 41, 0.8)',
                    color: 'white',
                    fontFamily: 'JetBrains Mono, monospace'
                  }}
                />
                
                <button
                  type="submit"
                  disabled={submitting || !flagInput.trim()}
                  style={{
                    width: '100%',
                    padding: '12px',
                    backgroundColor: 'var(--accent-purple)',
                    color: 'white',
                    border: 'none',
                    borderRadius: '8px',
                    cursor: submitting || !flagInput.trim() ? 'not-allowed' : 'pointer',
                    opacity: submitting || !flagInput.trim() ? 0.7 : 1,
                    fontFamily: 'JetBrains Mono, monospace',
                    fontSize: '0.9rem',
                    transition: 'all 0.3s ease'
                  }}
                >
                  {submitting ? 'Проверка...' : 'Отправить флаг'}
                </button>
              </div>
            </form>
          )}
          
          {result && (
            <div style={{
              marginTop: '15px',
              backgroundColor: result.success ? 'rgba(40, 167, 69, 0.1)' : 'rgba(255, 68, 68, 0.1)',
              padding: '15px',
              borderRadius: '8px',
              display: 'flex',
              alignItems: 'center',
              border: result.success ? '1px solid rgba(40, 167, 69, 0.3)' : '1px solid rgba(255, 68, 68, 0.3)',
              color: result.success ? '#28a745' : '#ff4444'
            }}>
              {result.success ? (
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ marginRight: '10px' }}>
                  <path d="M9 16.17L4.83 12L3.41 13.41L9 19L21 7L19.59 5.59L9 16.17Z" fill="#28a745"/>
                </svg>
              ) : (
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ marginRight: '10px' }}>
                  <path d="M19 6.41L17.59 5L12 10.59L6.41 5L5 6.41L10.59 12L5 17.59L6.41 19L12 13.41L17.59 19L19 17.59L13.41 12L19 6.41Z" fill="#ff4444"/>
                </svg>
              )}
              {result.message}
            </div>
          )}
        </div>
        
        {/* Виртуальная машина */}
        <div style={{
          backgroundColor: 'var(--bg-card)',
          borderRadius: '10px',
          padding: '30px',
          boxShadow: 'var(--card-shadow)',
        }}>
          <h2 style={{
            fontSize: '1.3rem',
            marginBottom: '20px',
            color: 'var(--text-light)'
          }}>
            Доступ к лабораторному стенду
          </h2>
          
          <p style={{
            color: 'var(--text-gray)',
            marginBottom: '20px',
            fontSize: '0.95rem'
          }}>
            Для решения этого задания вам доступен лабораторный стенд.
            Нажмите на кнопку ниже, чтобы открыть его в новой вкладке.
          </p>
          
          <button
            onClick={() => window.open(task.vm_url, '_blank')}
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              padding: '12px 20px',
              backgroundColor: 'var(--bg-dark)',
              color: 'var(--text-light)',
              border: '1px solid var(--accent-purple)',
              borderRadius: '8px',
              cursor: 'pointer',
              fontFamily: 'JetBrains Mono, monospace',
              fontSize: '0.9rem',
              gap: '10px'
            }}
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M19 19H5V5H12V3H5C3.89 3 3 3.9 3 5V19C3 20.1 3.89 21 5 21H19C20.1 21 21 20.1 21 19V12H19V19ZM14 3V5H17.59L7.76 14.83L9.17 16.24L19 6.41V10H21V3H14Z" fill="var(--text-light)"/>
            </svg>
            Открыть лабораторный стенд
          </button>
        </div>
        
        {/* Статистика */}
        <div style={{
          backgroundColor: 'var(--bg-card)',
          borderRadius: '10px',
          padding: '30px',
          boxShadow: 'var(--card-shadow)',
        }}>
          <h2 style={{
            fontSize: '1.3rem',
            marginBottom: '20px',
            color: 'var(--text-light)'
          }}>
            Статистика
          </h2>
          
          <div style={{
            display: 'flex',
            gap: '20px',
            flexWrap: 'wrap'
          }}>
            <div style={{
              backgroundColor: 'rgba(0, 0, 0, 0.2)',
              padding: '15px',
              borderRadius: '8px',
              border: '1px solid rgba(255, 255, 255, 0.05)',
              minWidth: '150px',
              textAlign: 'center'
            }}>
              <div style={{ fontSize: '0.85rem', color: 'var(--text-gray)', marginBottom: '5px' }}>
                Решено
              </div>
              <div style={{ fontSize: '1.2rem', color: 'var(--accent-blue)', fontWeight: 'bold' }}>
                {task.solved_by} участниками
              </div>
            </div>
            
            <div style={{
              backgroundColor: 'rgba(0, 0, 0, 0.2)',
              padding: '15px',
              borderRadius: '8px',
              border: '1px solid rgba(255, 255, 255, 0.05)',
              minWidth: '150px',
              textAlign: 'center'
            }}>
              <div style={{ fontSize: '0.85rem', color: 'var(--text-gray)', marginBottom: '5px' }}>
                Сложность
              </div>
              <div style={{ 
                fontSize: '1.2rem', 
                fontWeight: 'bold',
                color: task.difficulty === 'Легкий' ? 'var(--accent-blue)' : 
                  task.difficulty === 'Средний' ? '#ffc107' : '#ff4444'
              }}>
                {task.difficulty}
              </div>
            </div>
            
            <div style={{
              backgroundColor: 'rgba(0, 0, 0, 0.2)',
              padding: '15px',
              borderRadius: '8px',
              border: '1px solid rgba(255, 255, 255, 0.05)',
              minWidth: '150px',
              textAlign: 'center'
            }}>
              <div style={{ fontSize: '0.85rem', color: 'var(--text-gray)', marginBottom: '5px' }}>
                Категория
              </div>
              <div style={{ fontSize: '1.2rem', color: 'var(--accent-purple)', fontWeight: 'bold' }}>
                {task.category}
              </div>
            </div>
            
            <div style={{
              backgroundColor: 'rgba(0, 0, 0, 0.2)',
              padding: '15px',
              borderRadius: '8px',
              border: '1px solid rgba(255, 255, 255, 0.05)',
              minWidth: '150px',
              textAlign: 'center'
            }}>
              <div style={{ fontSize: '0.85rem', color: 'var(--text-gray)', marginBottom: '5px' }}>
                Добавлено
              </div>
              <div style={{ fontSize: '1.2rem', color: 'var(--text-light)', fontWeight: 'bold' }}>
                {new Date(task.created_at).toLocaleDateString()}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TaskPage; 