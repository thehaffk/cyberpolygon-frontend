import React from 'react';
import { Link } from 'react-router-dom';

const HomePage = () => {
  const features = [
    {
      id: 1,
      title: 'Курсы',
      description: 'Структурированные материалы для изучения теории кибербезопасности с интерактивными уроками и примерами кода',
      icon: '📚',
      link: '/courses'
    },
    {
      id: 2,
      title: 'Задания',
      description: 'Практические упражнения для закрепления полученных знаний и отработки навыков кибербезопасности',
      icon: '🎯',
      link: '/tasks'
    },
    {
      id: 3,
      title: 'Терминал',
      description: 'Встроенная консоль для выполнения практических заданий и экспериментов с инструментами безопасности',
      icon: '💻',
      link: '/terminal'
    },
    {
      id: 4,
      title: 'Тесты',
      description: 'Проверьте свои знания с помощью интерактивных тестов различного уровня сложности',
      icon: '✅',
      link: '/tests'
    }
  ];

  return (
    <div className="container">
      <div style={{ 
        paddingTop: '120px', 
        paddingBottom: '80px', 
        textAlign: 'center'
      }}>
        <h1 style={{
          fontSize: '3.5rem',
          marginBottom: '25px',
          background: 'linear-gradient(90deg, #6a00ff, #00f0ff)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          textShadow: '0 0 20px rgba(106, 0, 255, 0.2)'
        }}>
          Cyber Polygon
        </h1>
        
        <p style={{
          fontSize: '1.25rem',
          maxWidth: '800px',
          margin: '0 auto 50px',
          color: 'var(--text-gray)',
          lineHeight: '1.8'
        }}>
          Образовательная платформа, где теория встречается с практикой.<br/>
          Погрузитесь в мир кибербезопасности через интерактивные курсы,
          практические задания и реалистичные сценарии.
        </p>
        
        <div style={{
          marginTop: '30px',
          display: 'flex',
          gap: '20px',
          justifyContent: 'center',
          marginBottom: '50px'
        }}>
          <Link to="/courses">
            <button style={{
              padding: '14px 28px',
              fontSize: '1rem',
              fontWeight: 'bold',
              backgroundColor: 'var(--accent-purple)',
              boxShadow: '0 5px 15px rgba(106, 0, 255, 0.4)',
              border: 'none',
              borderRadius: '8px',
              transition: 'all 0.3s'
            }}>
              Начать обучение
            </button>
          </Link>
          <Link to="/register">
            <button style={{
              padding: '14px 28px',
              fontSize: '1rem',
              fontWeight: 'bold',
              backgroundColor: 'transparent',
              border: '2px solid var(--accent-blue)',
              color: 'var(--accent-blue)',
              borderRadius: '8px',
              transition: 'all 0.3s'
            }}>
              Регистрация
            </button>
          </Link>
        </div>
        
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
          gap: '30px',
          marginTop: '60px'
        }}>
          {features.map(feature => (
            <Link to={feature.link} key={feature.id} style={{ textDecoration: 'none' }}>
              <div className="feature-card">
                <div className="feature-icon">{feature.icon}</div>
                <h3>{feature.title}</h3>
                <p>{feature.description}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default HomePage; 