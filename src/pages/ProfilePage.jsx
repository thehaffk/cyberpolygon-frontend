import React, { useState } from 'react';

const ProfilePage = () => {
  // Моковые данные пользователя
  const [user, setUser] = useState({
    id: 1,
    username: 'test_username',
    email: 'user@example.com',
    avatar: 'https://i.pravatar.cc/300',
    role: 'Пользователь',
    registrationDate: '10.01.2024',
    completedTasks: 15,
    totalScore: 2350,
    level: 'Прогрессирующий',
    badges: [
      { id: 1, name: 'Новичок', description: 'Зарегистрировался на платформе', icon: '🔰' },
      { id: 2, name: 'Хакер', description: 'Решил 10 заданий', icon: '🔓' },
      { id: 3, name: 'Криптограф', description: 'Выполнил все задания по криптографии', icon: '🔐' },
    ],
    achievements: [
      { id: 1, name: 'Первая кровь', description: 'Выполнил первое задание', date: '11.01.2024', category: 'общее' },
      { id: 2, name: 'Мастер SQL', description: 'Решил все задания по SQL инъекциям', date: '15.01.2024', category: 'базы данных' },
      { id: 3, name: 'Король XSS', description: 'Выполнил сложное задание по XSS', date: '20.01.2024', category: 'веб' },
    ],
    recentActivities: [
      { id: 1, type: 'task_completed', description: 'Выполнил задание "Обход аутентификации"', date: '02.02.2024', points: 300 },
      { id: 2, type: 'course_started', description: 'Начал курс "Криптография и шифрование"', date: '01.02.2024', points: 0 },
      { id: 3, type: 'badge_earned', description: 'Получил значок "Криптограф"', date: '28.01.2024', points: 150 },
      { id: 4, type: 'task_completed', description: 'Выполнил задание "SQL-инъекция: слепая"', date: '25.01.2024', points: 250 },
    ]
  });

  // Состояние для выбора текущей вкладки
  const [activeTab, setActiveTab] = useState('overview');

  return (
    <div className="container" style={{ paddingTop: '120px', paddingBottom: '50px' }}>
      <div style={{ 
        display: 'flex',
        flexDirection: 'column',
        gap: '30px',
      }}>
        {/* Верхняя секция профиля */}
        <div style={{
          backgroundColor: 'var(--bg-card)',
          borderRadius: '10px',
          padding: '30px',
          boxShadow: 'var(--card-shadow)',
          border: '1px solid rgba(106, 0, 255, 0.2)',
          display: 'flex',
          flexDirection: 'column',
          gap: '20px',
        }}>
          <div style={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: '20px',
            alignItems: 'center',
          }}>
            {/* Аватар пользователя */}
            <div style={{
              width: '120px',
              height: '120px',
              borderRadius: '50%',
              overflow: 'hidden',
              border: '3px solid var(--accent-purple)',
            }}>
              <img 
                src={user.avatar} 
                alt={user.username}
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                }}
              />
            </div>
            
            {/* Информация о пользователе */}
            <div style={{
              flex: '1',
              minWidth: '250px',
            }}>
              <h1 style={{
                fontSize: '1.8rem',
                marginBottom: '10px',
                color: 'var(--text-light)',
                display: 'flex',
                alignItems: 'center',
                gap: '10px',
              }}>
                {user.username}
                <span style={{
                  backgroundColor: 'var(--accent-purple)', 
                  color: 'white',
                  fontSize: '0.9rem',
                  padding: '4px 8px',
                  borderRadius: '5px',
                }}>
                  {user.level}
                </span>
              </h1>
              <div style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '5px',
                color: 'var(--text-gray)',
                fontSize: '0.9rem',
              }}>
                <p>Email: {user.email}</p>
                <p>Роль: {user.role}</p>
                <p>Дата регистрации: {user.registrationDate}</p>
              </div>
            </div>
            
            {/* Статистика пользователя */}
            <div style={{
              display: 'flex',
              gap: '20px',
              flexWrap: 'wrap',
              marginLeft: 'auto',
            }}>
              <div style={{
                backgroundColor: 'rgba(0, 0, 0, 0.3)',
                padding: '15px',
                borderRadius: '8px',
                minWidth: '120px',
                textAlign: 'center',
              }}>
                <div style={{
                  fontSize: '2rem',
                  fontWeight: 'bold',
                  color: 'var(--accent-blue)',
                  marginBottom: '5px',
                }}>
                  {user.completedTasks}
                </div>
                <div style={{
                  fontSize: '0.8rem',
                  color: 'var(--text-gray)',
                }}>
                  Решено задач
                </div>
              </div>
              
              <div style={{
                backgroundColor: 'rgba(0, 0, 0, 0.3)',
                padding: '15px',
                borderRadius: '8px',
                minWidth: '120px',
                textAlign: 'center',
              }}>
                <div style={{
                  fontSize: '2rem',
                  fontWeight: 'bold',
                  color: 'var(--accent-purple)',
                  marginBottom: '5px',
                }}>
                  {user.totalScore}
                </div>
                <div style={{
                  fontSize: '0.8rem',
                  color: 'var(--text-gray)',
                }}>
                  Общий счет
                </div>
              </div>
            </div>
          </div>
          
          {/* Навигация по вкладкам */}
          <div style={{
            display: 'flex',
            borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
            gap: '10px',
            paddingBottom: '5px',
            marginTop: '20px',
            overflowX: 'auto',
          }}>
            <TabButton 
              active={activeTab === 'overview'} 
              onClick={() => setActiveTab('overview')}
            >
              Обзор
            </TabButton>
            <TabButton 
              active={activeTab === 'achievements'} 
              onClick={() => setActiveTab('achievements')}
            >
              Достижения
            </TabButton>
            <TabButton 
              active={activeTab === 'badges'} 
              onClick={() => setActiveTab('badges')}
            >
              Значки
            </TabButton>
            <TabButton 
              active={activeTab === 'settings'} 
              onClick={() => setActiveTab('settings')}
            >
              Настройки
            </TabButton>
          </div>
        </div>
        
        {/* Содержимое вкладок */}
        {activeTab === 'overview' && (
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: '20px',
          }}>
            {/* Недавняя активность */}
            <div style={{
              backgroundColor: 'var(--bg-card)',
              borderRadius: '10px',
              padding: '20px',
              boxShadow: 'var(--card-shadow)',
              border: '1px solid rgba(106, 0, 255, 0.2)',
            }}>
              <h2 style={{
                fontSize: '1.3rem',
                marginBottom: '20px',
                color: 'var(--text-light)',
              }}>
                Недавняя активность
              </h2>
              
              <div style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '15px',
              }}>
                {user.recentActivities.map(activity => (
                  <div key={activity.id} style={{
                    display: 'flex',
                    padding: '10px',
                    backgroundColor: 'rgba(0, 0, 0, 0.2)',
                    borderRadius: '8px',
                    alignItems: 'center',
                    gap: '10px',
                  }}>
                    <div style={{
                      width: '40px',
                      height: '40px',
                      borderRadius: '50%',
                      backgroundColor: getActivityIconBg(activity.type),
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: '1.2rem',
                    }}>
                      {getActivityIcon(activity.type)}
                    </div>
                    <div style={{ flex: 1 }}>
                      <div style={{
                        fontSize: '0.9rem',
                        color: 'var(--text-light)',
                      }}>
                        {activity.description}
                      </div>
                      <div style={{
                        fontSize: '0.8rem',
                        color: 'var(--text-gray)',
                      }}>
                        {activity.date}
                      </div>
                    </div>
                    {activity.points > 0 && (
                      <div style={{
                        backgroundColor: 'rgba(106, 0, 255, 0.2)',
                        color: 'var(--accent-purple)',
                        padding: '5px 10px',
                        borderRadius: '5px',
                        fontSize: '0.8rem',
                        fontWeight: 'bold',
                      }}>
                        +{activity.points}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
            
            {/* Прогресс и рекомендации */}
            <div style={{
              backgroundColor: 'var(--bg-card)',
              borderRadius: '10px',
              padding: '20px',
              boxShadow: 'var(--card-shadow)',
              border: '1px solid rgba(106, 0, 255, 0.2)',
            }}>
              <h2 style={{
                fontSize: '1.3rem',
                marginBottom: '20px',
                color: 'var(--text-light)',
              }}>
                Прогресс обучения
              </h2>
              
              <div style={{
                marginBottom: '20px',
              }}>
                <div style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  marginBottom: '5px',
                }}>
                  <span style={{ fontSize: '0.9rem', color: 'var(--text-gray)' }}>Уровень</span>
                  <span style={{ fontSize: '0.9rem', color: 'var(--text-light)' }}>65%</span>
                </div>
                <div style={{
                  height: '8px',
                  backgroundColor: 'rgba(0, 0, 0, 0.3)',
                  borderRadius: '4px',
                  overflow: 'hidden',
                }}>
                  <div style={{
                    height: '100%',
                    width: '65%',
                    background: 'linear-gradient(90deg, var(--accent-purple), var(--accent-blue))',
                    borderRadius: '4px',
                  }}></div>
                </div>
              </div>
              
              <h3 style={{
                fontSize: '1rem',
                marginBottom: '15px',
                color: 'var(--text-light)',
              }}>
                Рекомендуемые курсы
              </h3>
              
              <div style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '10px',
              }}>
                <RecommendedItem
                  title="Веб-уязвимости"
                  progress={30}
                  color="var(--accent-blue)"
                />
                <RecommendedItem
                  title="Криптография и шифрование"
                  progress={10}
                  color="var(--accent-purple)"
                />
              </div>
            </div>
          </div>
        )}
        
        {activeTab === 'achievements' && (
          <div style={{
            backgroundColor: 'var(--bg-card)',
            borderRadius: '10px',
            padding: '20px',
            boxShadow: 'var(--card-shadow)',
            border: '1px solid rgba(106, 0, 255, 0.2)',
          }}>
            <h2 style={{
              fontSize: '1.3rem',
              marginBottom: '20px',
              color: 'var(--text-light)',
            }}>
              Достижения
            </h2>
            
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
              gap: '15px',
            }}>
              {user.achievements.map(achievement => (
                <div key={achievement.id} style={{
                  padding: '15px',
                  backgroundColor: 'rgba(0, 0, 0, 0.2)',
                  borderRadius: '8px',
                  border: '1px solid rgba(255, 255, 255, 0.05)',
                }}>
                  <div style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    marginBottom: '10px',
                  }}>
                    <h3 style={{
                      fontSize: '1.1rem',
                      color: 'var(--text-light)',
                    }}>
                      {achievement.name}
                    </h3>
                    <span style={{
                      backgroundColor: 'rgba(0, 0, 0, 0.3)',
                      color: 'var(--text-gray)',
                      padding: '2px 8px',
                      borderRadius: '5px',
                      fontSize: '0.8rem',
                    }}>
                      {achievement.category}
                    </span>
                  </div>
                  <p style={{
                    color: 'var(--text-gray)',
                    fontSize: '0.9rem',
                    marginBottom: '10px',
                  }}>
                    {achievement.description}
                  </p>
                  <div style={{
                    fontSize: '0.8rem',
                    color: 'var(--accent-blue)',
                  }}>
                    {achievement.date}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
        
        {activeTab === 'badges' && (
          <div style={{
            backgroundColor: 'var(--bg-card)',
            borderRadius: '10px',
            padding: '20px',
            boxShadow: 'var(--card-shadow)',
            border: '1px solid rgba(106, 0, 255, 0.2)',
          }}>
            <h2 style={{
              fontSize: '1.3rem',
              marginBottom: '20px',
              color: 'var(--text-light)',
            }}>
              Значки
            </h2>
            
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))',
              gap: '20px',
            }}>
              {user.badges.map(badge => (
                <div key={badge.id} style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '15px',
                  padding: '15px',
                  backgroundColor: 'rgba(0, 0, 0, 0.2)',
                  borderRadius: '8px',
                  border: '1px solid rgba(255, 255, 255, 0.05)',
                }}>
                  <div style={{
                    width: '50px',
                    height: '50px',
                    borderRadius: '50%',
                    backgroundColor: 'var(--accent-purple)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '2rem',
                  }}>
                    {badge.icon}
                  </div>
                  <div>
                    <h3 style={{
                      fontSize: '1.1rem',
                      color: 'var(--text-light)',
                      marginBottom: '5px',
                    }}>
                      {badge.name}
                    </h3>
                    <p style={{
                      color: 'var(--text-gray)',
                      fontSize: '0.9rem',
                    }}>
                      {badge.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
        
        {activeTab === 'settings' && (
          <div style={{
            backgroundColor: 'var(--bg-card)',
            borderRadius: '10px',
            padding: '20px',
            boxShadow: 'var(--card-shadow)',
            border: '1px solid rgba(106, 0, 255, 0.2)',
          }}>
            <h2 style={{
              fontSize: '1.3rem',
              marginBottom: '20px',
              color: 'var(--text-light)',
            }}>
              Настройки профиля
            </h2>
            
            <div style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '20px',
            }}>
              <div>
                <label style={{
                  display: 'block',
                  marginBottom: '5px',
                  color: 'var(--text-gray)',
                  fontSize: '0.9rem',
                }}>
                  Имя пользователя
                </label>
                <input
                  type="text"
                  value={user.username}
                  onChange={(e) => setUser({...user, username: e.target.value})}
                  style={{
                    width: '100%',
                    padding: '10px 15px',
                    borderRadius: '5px',
                    border: '1px solid rgba(106, 0, 255, 0.3)',
                    backgroundColor: 'rgba(0, 0, 0, 0.2)',
                    color: 'var(--text-light)',
                    fontFamily: 'JetBrains Mono, monospace',
                  }}
                />
              </div>
              
              <div>
                <label style={{
                  display: 'block',
                  marginBottom: '5px',
                  color: 'var(--text-gray)',
                  fontSize: '0.9rem',
                }}>
                  Email
                </label>
                <input
                  type="email"
                  value={user.email}
                  onChange={(e) => setUser({...user, email: e.target.value})}
                  style={{
                    width: '100%',
                    padding: '10px 15px',
                    borderRadius: '5px',
                    border: '1px solid rgba(106, 0, 255, 0.3)',
                    backgroundColor: 'rgba(0, 0, 0, 0.2)',
                    color: 'var(--text-light)',
                    fontFamily: 'JetBrains Mono, monospace',
                  }}
                />
              </div>
              
              <div>
                <label style={{
                  display: 'block',
                  marginBottom: '5px',
                  color: 'var(--text-gray)',
                  fontSize: '0.9rem',
                }}>
                  Пароль
                </label>
                <input
                  type="password"
                  value="********"
                  style={{
                    width: '100%',
                    padding: '10px 15px',
                    borderRadius: '5px',
                    border: '1px solid rgba(106, 0, 255, 0.3)',
                    backgroundColor: 'rgba(0, 0, 0, 0.2)',
                    color: 'var(--text-light)',
                    fontFamily: 'JetBrains Mono, monospace',
                  }}
                />
              </div>
              
              <button style={{
                backgroundColor: 'var(--accent-purple)',
                color: 'white',
                padding: '10px 20px',
                borderRadius: '5px',
                border: 'none',
                cursor: 'pointer',
                fontFamily: 'JetBrains Mono, monospace',
                fontSize: '0.9rem',
                marginTop: '10px',
                alignSelf: 'flex-start',
              }}>
                Сохранить изменения
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

// Компонент кнопки вкладки
const TabButton = ({ active, onClick, children }) => (
  <button
    onClick={onClick}
    style={{
      backgroundColor: 'transparent',
      color: active ? 'var(--accent-purple)' : 'var(--text-gray)',
      border: 'none',
      borderBottom: active ? '2px solid var(--accent-purple)' : 'none',
      padding: '10px 15px',
      fontSize: '0.9rem',
      cursor: 'pointer',
      fontFamily: 'JetBrains Mono, monospace',
      whiteSpace: 'nowrap',
    }}
  >
    {children}
  </button>
);

// Компонент рекомендуемого курса
const RecommendedItem = ({ title, progress, color }) => (
  <div style={{
    backgroundColor: 'rgba(0, 0, 0, 0.2)',
    padding: '15px',
    borderRadius: '8px',
  }}>
    <div style={{
      display: 'flex',
      justifyContent: 'space-between',
      marginBottom: '5px',
    }}>
      <span style={{ fontSize: '0.9rem', color: 'var(--text-light)' }}>{title}</span>
      <span style={{ fontSize: '0.9rem', color }}>{progress}%</span>
    </div>
    <div style={{
      height: '6px',
      backgroundColor: 'rgba(0, 0, 0, 0.3)',
      borderRadius: '3px',
      overflow: 'hidden',
    }}>
      <div style={{
        height: '100%',
        width: `${progress}%`,
        backgroundColor: color,
        borderRadius: '3px',
      }}></div>
    </div>
  </div>
);

// Утилиты для определения иконок активности
function getActivityIcon(type) {
  switch (type) {
    case 'task_completed':
      return '✅';
    case 'course_started':
      return '🚀';
    case 'badge_earned':
      return '🏆';
    default:
      return '📝';
  }
}

function getActivityIconBg(type) {
  switch (type) {
    case 'task_completed':
      return 'rgba(40, 167, 69, 0.3)';
    case 'course_started':
      return 'rgba(0, 123, 255, 0.3)';
    case 'badge_earned':
      return 'rgba(255, 193, 7, 0.3)';
    default:
      return 'rgba(106, 0, 255, 0.3)';
  }
}

export default ProfilePage; 