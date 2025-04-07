import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import axiosInstance from '../api/axiosInstance';

const CoursePage = () => {
  const { slug } = useParams();
  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeTab, setActiveTab] = useState('overview');

  // Демо-курс для отображения
  const demoCourse = {
    id: 1,
    slug: slug,
    title: 'Основы кибербезопасности',
    description: 'Вводный курс по основам кибербезопасности. Изучение базовых концепций, терминологии и принципов защиты информации.',
    image_url: 'https://source.unsplash.com/random?cybersecurity',
    difficulty: 'Начинающий',
    duration: '12 часов',
    lessons_count: 12,
    progress: 25, // в процентах
    content: `
# Основы кибербезопасности

Этот курс предназначен для тех, кто хочет познакомиться с миром кибербезопасности и получить базовые знания для защиты себя и своих данных в цифровом пространстве.

## Чему вы научитесь

- Основным принципам кибербезопасности
- Распознаванию фишинговых атак
- Правильному созданию и хранению паролей
- Защите личных данных в интернете
- Настройке базовой защиты вашего компьютера и смартфона

## Для кого этот курс

Курс подходит для начинающих пользователей, которые хотят повысить свою цифровую грамотность и безопасность. Специальные технические знания не требуются.

## Программа курса

Курс состоит из 12 уроков, каждый из которых содержит теоретические материалы и практические задания. По завершении курса вы сможете применять полученные знания в повседневной жизни.
    `,
    instructor: {
      name: 'Алексей Иванов',
      position: 'Специалист по кибербезопасности',
      bio: 'Более 10 лет опыта в сфере информационной безопасности. Сертифицированный специалист CISSP, CEH.',
      avatar: 'https://i.pravatar.cc/150?img=3'
    },
    lessons: [
      {
        id: 1,
        title: 'Введение в кибербезопасность',
        duration: '45 минут',
        is_completed: true
      },
      {
        id: 2,
        title: 'Основные угрозы в интернете',
        duration: '60 минут',
        is_completed: true
      },
      {
        id: 3,
        title: 'Практики безопасного поведения',
        duration: '55 минут',
        is_completed: true
      },
      {
        id: 4,
        title: 'Фишинг и социальная инженерия',
        duration: '50 минут',
        is_completed: false
      },
      {
        id: 5,
        title: 'Безопасное хранение паролей',
        duration: '45 минут',
        is_completed: false
      },
      {
        id: 6,
        title: 'Двухфакторная аутентификация',
        duration: '40 минут',
        is_completed: false
      },
      {
        id: 7,
        title: 'Шифрование данных',
        duration: '65 минут',
        is_completed: false
      },
      {
        id: 8,
        title: 'Безопасность мобильных устройств',
        duration: '50 минут',
        is_completed: false
      },
      {
        id: 9,
        title: 'Безопасность Wi-Fi сетей',
        duration: '55 минут',
        is_completed: false
      },
      {
        id: 10,
        title: 'Вирусы и вредоносное ПО',
        duration: '60 минут',
        is_completed: false
      },
      {
        id: 11,
        title: 'Резервное копирование данных',
        duration: '45 минут',
        is_completed: false
      },
      {
        id: 12,
        title: 'Итоговый проект',
        duration: '90 минут',
        is_completed: false
      }
    ]
  };

  useEffect(() => {
    // В реальном приложении здесь был бы запрос к API
    const fetchCourse = async () => {
      try {
        setLoading(true);
        // Имитация запроса
        // const response = await axiosInstance.get(`/api/courses/${slug}`);
        // setCourse(response.data);
        
        // Используем демо-данные
        setTimeout(() => {
          setCourse(demoCourse);
          setLoading(false);
        }, 500);
      } catch (err) {
        console.error('Ошибка при загрузке курса:', err);
        setError('Не удалось загрузить курс. Пожалуйста, попробуйте позже.');
        setLoading(false);
      }
    };

    fetchCourse();
  }, [slug]);

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
        <div style={{ color: 'var(--text-gray)' }}>Загрузка курса...</div>
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

  if (!course) {
    return (
      <div className="container" style={{ paddingTop: '120px', paddingBottom: '50px', textAlign: 'center' }}>
        <div style={{ color: 'var(--text-gray)' }}>Курс не найден</div>
      </div>
    );
  }

  const renderTabContent = () => {
    switch (activeTab) {
      case 'overview':
        return (
          <div>
            <div style={{
              color: 'var(--text-light)',
              fontSize: '0.95rem',
              lineHeight: '1.6',
            }}>
              {renderMarkdown(course.content)}
            </div>
            
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '20px',
              marginTop: '40px',
              padding: '20px',
              backgroundColor: 'rgba(0, 0, 0, 0.2)',
              borderRadius: '10px',
              border: '1px solid rgba(255, 255, 255, 0.05)'
            }}>
              <img 
                src={course.instructor.avatar} 
                alt={course.instructor.name}
                style={{
                  width: '80px',
                  height: '80px',
                  borderRadius: '50%',
                  objectFit: 'cover'
                }}
              />
              <div>
                <h3 style={{
                  fontSize: '1.1rem',
                  marginBottom: '5px',
                  color: 'var(--text-light)'
                }}>
                  {course.instructor.name}
                </h3>
                <p style={{
                  fontSize: '0.9rem',
                  color: 'var(--accent-blue)',
                  marginBottom: '10px'
                }}>
                  {course.instructor.position}
                </p>
                <p style={{
                  fontSize: '0.9rem',
                  color: 'var(--text-gray)'
                }}>
                  {course.instructor.bio}
                </p>
              </div>
            </div>
          </div>
        );
      
      case 'lessons':
        return (
          <div>
            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginBottom: '20px'
            }}>
              <h2 style={{
                fontSize: '1.3rem',
                color: 'var(--text-light)'
              }}>
                Уроки курса
              </h2>
              
              <div style={{
                backgroundColor: 'rgba(0, 0, 0, 0.3)',
                padding: '8px 15px',
                borderRadius: '20px',
                display: 'flex',
                alignItems: 'center',
                gap: '10px',
                border: '1px solid var(--accent-purple)'
              }}>
                <div style={{
                  width: '100px',
                  height: '5px',
                  backgroundColor: 'rgba(255, 255, 255, 0.1)',
                  borderRadius: '10px',
                  overflow: 'hidden',
                  position: 'relative'
                }}>
                  <div style={{
                    position: 'absolute',
                    left: 0,
                    top: 0,
                    height: '100%',
                    width: `${course.progress}%`,
                    backgroundColor: 'var(--accent-purple)',
                    borderRadius: '10px'
                  }} />
                </div>
                <span style={{
                  fontSize: '0.9rem',
                  color: 'var(--text-light)',
                  fontWeight: 'bold'
                }}>
                  {course.progress}%
                </span>
              </div>
            </div>
            
            <div>
              {course.lessons.map((lesson, index) => (
                <div 
                  key={lesson.id}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    padding: '15px',
                    backgroundColor: 'rgba(0, 0, 0, 0.2)',
                    marginBottom: '10px',
                    borderRadius: '8px',
                    border: lesson.is_completed
                      ? '1px solid rgba(76, 175, 80, 0.3)'
                      : '1px solid rgba(255, 255, 255, 0.05)'
                  }}
                >
                  <div style={{
                    width: '30px',
                    height: '30px',
                    borderRadius: '50%',
                    backgroundColor: lesson.is_completed
                      ? 'rgba(76, 175, 80, 0.2)'
                      : 'rgba(255, 255, 255, 0.05)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginRight: '15px',
                    color: lesson.is_completed
                      ? '#4CAF50'
                      : 'var(--text-gray)',
                    border: lesson.is_completed
                      ? '1px solid rgba(76, 175, 80, 0.3)'
                      : '1px solid rgba(255, 255, 255, 0.1)'
                  }}>
                    {lesson.is_completed ? (
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M9 16.17L4.83 12L3.41 13.41L9 19L21 7L19.59 5.59L9 16.17Z" fill="#4CAF50"/>
                      </svg>
                    ) : (
                      <span>{index + 1}</span>
                    )}
                  </div>
                  
                  <div style={{ flexGrow: 1 }}>
                    <div style={{
                      fontSize: '1rem',
                      marginBottom: '5px',
                      color: lesson.is_completed
                        ? '#4CAF50'
                        : 'var(--text-light)'
                    }}>
                      {lesson.title}
                    </div>
                    
                    <div style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '10px',
                      fontSize: '0.8rem',
                      color: 'var(--text-gray)'
                    }}>
                      <span>
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ verticalAlign: 'middle', marginRight: '5px' }}>
                          <path d="M11.99 2C6.47 2 2 6.48 2 12C2 17.52 6.47 22 11.99 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 11.99 2ZM12 20C7.58 20 4 16.42 4 12C4 7.58 7.58 4 12 4C16.42 4 20 7.58 20 12C20 16.42 16.42 20 12 20ZM12.5 7H11V13L16.25 16.15L17 14.92L12.5 12.25V7Z" fill="var(--text-gray)"/>
                        </svg>
                        {lesson.duration}
                      </span>
                      
                      {lesson.is_completed && (
                        <span style={{ color: '#4CAF50' }}>
                          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ verticalAlign: 'middle', marginRight: '5px' }}>
                            <path d="M9 16.17L4.83 12L3.41 13.41L9 19L21 7L19.59 5.59L9 16.17Z" fill="#4CAF50"/>
                          </svg>
                          Пройден
                        </span>
                      )}
                    </div>
                  </div>
                  
                  <button
                    style={{
                      padding: '8px 15px',
                      backgroundColor: 'var(--accent-purple)',
                      color: 'white',
                      border: 'none',
                      borderRadius: '5px',
                      fontSize: '0.85rem',
                      cursor: 'pointer',
                      fontFamily: 'JetBrains Mono, monospace'
                    }}
                  >
                    {lesson.is_completed ? 'Повторить' : 'Начать'}
                  </button>
                </div>
              ))}
            </div>
          </div>
        );
      
      default:
        return null;
    }
  };

  return (
    <div className="container" style={{ paddingTop: '120px', paddingBottom: '50px' }}>
      {/* Баннер курса */}
      <div style={{
        position: 'relative',
        height: '250px',
        marginBottom: '30px',
        borderRadius: '10px',
        overflow: 'hidden'
      }}>
        <img 
          src={course.image_url} 
          alt={course.title}
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            filter: 'brightness(0.6)'
          }}
        />
        
        <div style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          padding: '30px',
          background: 'linear-gradient(to top, rgba(0,0,0,0.9), transparent)'
        }}>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '10px',
            marginBottom: '10px'
          }}>
            <span style={{
              backgroundColor: 'rgba(0, 0, 0, 0.5)',
              color: course.difficulty === 'Начинающий' ? 'var(--accent-blue)' : 
                course.difficulty === 'Средний' ? '#ffc107' : '#ff4444',
              padding: '5px 10px',
              borderRadius: '5px',
              fontSize: '0.8rem',
              fontWeight: 'bold',
              border: `1px solid ${course.difficulty === 'Начинающий' ? 'rgba(0, 240, 255, 0.3)' : 
                course.difficulty === 'Средний' ? 'rgba(255, 193, 7, 0.3)' : 'rgba(255, 68, 68, 0.3)'}`
            }}>
              {course.difficulty}
            </span>
            
            <span style={{
              backgroundColor: 'rgba(0, 0, 0, 0.5)',
              color: 'var(--text-gray)',
              padding: '5px 10px',
              borderRadius: '5px',
              fontSize: '0.8rem',
              border: '1px solid rgba(255, 255, 255, 0.1)'
            }}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ verticalAlign: 'middle', marginRight: '5px' }}>
                <path d="M11.99 2C6.47 2 2 6.48 2 12C2 17.52 6.47 22 11.99 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 11.99 2ZM12 20C7.58 20 4 16.42 4 12C4 7.58 7.58 4 12 4C16.42 4 20 7.58 20 12C20 16.42 16.42 20 12 20ZM12.5 7H11V13L16.25 16.15L17 14.92L12.5 12.25V7Z" fill="var(--text-gray)"/>
              </svg>
              {course.duration}
            </span>
            
            <span style={{
              backgroundColor: 'rgba(0, 0, 0, 0.5)',
              color: 'var(--accent-purple)',
              padding: '5px 10px',
              borderRadius: '5px',
              fontSize: '0.8rem',
              fontWeight: 'bold',
              border: '1px solid rgba(106, 0, 255, 0.3)'
            }}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ verticalAlign: 'middle', marginRight: '5px' }}>
                <path d="M19 3H5C3.9 3 3 3.9 3 5V19C3 20.1 3.9 21 5 21H19C20.1 21 21 20.1 21 19V5C21 3.9 20.1 3 19 3ZM9 17H7V10H9V17ZM13 17H11V7H13V17ZM17 17H15V13H17V17Z" fill="var(--accent-purple)"/>
              </svg>
              {course.lessons_count} уроков
            </span>
          </div>
          
          <h1 style={{
            fontSize: '2rem',
            color: 'var(--text-light)',
            marginBottom: '10px'
          }}>
            {course.title}
          </h1>
          
          <p style={{
            fontSize: '1rem',
            color: 'var(--text-gray)',
            maxWidth: '800px'
          }}>
            {course.description}
          </p>
        </div>
      </div>
      
      {/* Вкладки */}
      <div style={{
        display: 'flex',
        borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
        marginBottom: '30px'
      }}>
        <button
          onClick={() => setActiveTab('overview')}
          style={{
            padding: '15px 20px',
            backgroundColor: 'transparent',
            color: activeTab === 'overview' ? 'var(--accent-purple)' : 'var(--text-gray)',
            border: 'none',
            borderBottom: activeTab === 'overview' ? '2px solid var(--accent-purple)' : 'none',
            fontSize: '1rem',
            cursor: 'pointer',
            marginRight: '20px',
            fontFamily: 'JetBrains Mono, monospace'
          }}
        >
          Обзор
        </button>
        
        <button
          onClick={() => setActiveTab('lessons')}
          style={{
            padding: '15px 20px',
            backgroundColor: 'transparent',
            color: activeTab === 'lessons' ? 'var(--accent-purple)' : 'var(--text-gray)',
            border: 'none',
            borderBottom: activeTab === 'lessons' ? '2px solid var(--accent-purple)' : 'none',
            fontSize: '1rem',
            cursor: 'pointer',
            marginRight: '20px',
            fontFamily: 'JetBrains Mono, monospace'
          }}
        >
          Уроки
        </button>
      </div>
      
      {/* Содержимое вкладки */}
      <div>
        {renderTabContent()}
      </div>
      
      {/* Кнопки управления */}
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        marginTop: '40px'
      }}>
        <Link to="/courses" style={{
          display: 'inline-flex',
          alignItems: 'center',
          padding: '10px 20px',
          backgroundColor: 'var(--bg-dark)',
          color: 'var(--text-light)',
          border: '1px solid var(--accent-purple)',
          borderRadius: '5px',
          textDecoration: 'none',
          fontFamily: 'JetBrains Mono, monospace',
          fontSize: '0.9rem'
        }}>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ marginRight: '10px' }}>
            <path d="M20 11H7.83L13.42 5.41L12 4L4 12L12 20L13.41 18.59L7.83 13H20V11Z" fill="var(--text-light)"/>
          </svg>
          Назад к курсам
        </Link>
        
        {course.progress > 0 ? (
          <button style={{
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
          }}>
            Продолжить обучение
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ marginLeft: '10px' }}>
              <path d="M12 4L10.59 5.41L16.17 11H4V13H16.17L10.59 18.59L12 20L20 12L12 4Z" fill="white"/>
            </svg>
          </button>
        ) : (
          <button style={{
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
          }}>
            Начать обучение
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ marginLeft: '10px' }}>
              <path d="M8 5V19L19 12L8 5Z" fill="white"/>
            </svg>
          </button>
        )}
      </div>
    </div>
  );
};

export default CoursePage; 