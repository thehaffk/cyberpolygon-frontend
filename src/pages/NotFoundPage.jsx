import React from 'react';
import { Link } from 'react-router-dom';

const NotFoundPage = () => {
  return (
    <div className="container" style={{ 
      paddingTop: '150px', 
      paddingBottom: '80px',
      textAlign: 'center',
      minHeight: '70vh',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center'
    }}>
      <h1 style={{
        fontSize: '8rem',
        fontWeight: 'bold',
        marginBottom: '20px',
        background: 'linear-gradient(90deg, #6a00ff, #00f0ff)',
        WebkitBackgroundClip: 'text',
        WebkitTextFillColor: 'transparent',
        fontFamily: 'JetBrains Mono, monospace'
      }}>
        404
      </h1>
      
      <h2 style={{
        fontSize: '2rem',
        marginBottom: '30px',
        color: 'var(--text-light)'
      }}>
        Страница не найдена
      </h2>
      
      <p style={{
        fontSize: '1.1rem',
        color: 'var(--text-gray)',
        maxWidth: '600px',
        marginBottom: '40px',
        lineHeight: '1.6'
      }}>
        Возможно, страница была перемещена, удалена, или просто никогда не существовала.
        Вы можете вернуться на главную страницу или проверить адрес.
      </p>
      
      <div style={{
        display: 'flex',
        gap: '20px',
        flexWrap: 'wrap',
        justifyContent: 'center'
      }}>
        <Link 
          to="/"
          style={{
            padding: '12px 25px',
            backgroundColor: 'var(--accent-purple)',
            color: 'white',
            borderRadius: '8px',
            textDecoration: 'none',
            fontFamily: 'JetBrains Mono, monospace',
            fontSize: '0.95rem',
            display: 'flex',
            alignItems: 'center',
            gap: '10px'
          }}
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M10 20V14H14V20H19V12H22L12 3L2 12H5V20H10Z" fill="white"/>
          </svg>
          На главную
        </Link>
        
        <Link 
          to="/courses"
          style={{
            padding: '12px 25px',
            backgroundColor: 'transparent',
            color: 'var(--text-light)',
            borderRadius: '8px',
            textDecoration: 'none',
            fontFamily: 'JetBrains Mono, monospace',
            fontSize: '0.95rem',
            border: '1px solid var(--accent-purple)',
            display: 'flex',
            alignItems: 'center',
            gap: '10px'
          }}
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M12 11.55C9.64 9.35 6.48 8 3 8V19C6.48 19 9.64 20.35 12 22.55C14.36 20.36 17.52 19 21 19V8C17.52 8 14.36 9.35 12 11.55ZM12 8C13.66 8 15 6.66 15 5C15 3.34 13.66 2 12 2C10.34 2 9 3.34 9 5C9 6.66 10.34 8 12 8Z" fill="var(--text-light)"/>
          </svg>
          К курсам
        </Link>
      </div>
      
      <div style={{
        marginTop: '60px',
        padding: '20px',
        borderRadius: '10px',
        backgroundColor: 'rgba(0, 0, 0, 0.2)',
        maxWidth: '600px'
      }}>
        <p style={{
          color: 'var(--accent-blue)',
          fontFamily: 'JetBrains Mono, monospace',
          marginBottom: '10px'
        }}>
          /* Есть вопросы или нужна помощь? */
        </p>
        <p style={{ color: 'var(--text-gray)' }}>
          Свяжитесь с нами по адресу{' '}
          <a 
            href="mailto:support@cyberpolygon.ru"
            style={{
              color: 'var(--accent-blue)',
              textDecoration: 'none'
            }}
          >
            support@cyberpolygon.ru
          </a>
        </p>
      </div>
    </div>
  );
};

export default NotFoundPage; 