import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();
  
  // Проверяем текущий путь для активного элемента меню
  const isActive = (path) => location.pathname === path;

  return (
    <nav style={{
      position: 'fixed',
      top: 0,
      left: 0,
      width: '100%',
      background: 'rgba(15, 18, 34, 0.95)',
      backdropFilter: 'blur(10px)',
      borderBottom: '1px solid rgba(106, 0, 255, 0.2)',
      zIndex: 1000,
      padding: '15px 0',
    }}>
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '0 30px',
        maxWidth: '1200px',
        margin: '0 auto',
      }}>
        {/* Логотип */}
        <Link to="/" style={{
          textDecoration: 'none',
          display: 'flex',
          alignItems: 'center',
          gap: '10px',
        }}>
          <span style={{
            fontFamily: 'JetBrains Mono, monospace',
            fontWeight: 'bold',
            fontSize: '1.5rem',
            background: 'linear-gradient(90deg, #6a00ff, #00f0ff)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            letterSpacing: '1px',
          }}>
            КИБЕРПОЛИГОН
          </span>
        </Link>
        
        {/* Кнопка меню для мобильных устройств */}
        <div 
          style={{
            display: 'none',
            flexDirection: 'column',
            gap: '5px',
            cursor: 'pointer',
            zIndex: 1001,
            '@media (max-width: 768px)': {
              display: 'flex',
            }
          }}
          onClick={() => setMenuOpen(!menuOpen)}
          className="mobile-menu-toggle"
        >
          <span style={{
            width: '25px',
            height: '2px',
            backgroundColor: menuOpen ? 'transparent' : 'white',
            transform: menuOpen ? 'rotate(45deg) translate(5px, 5px)' : 'none',
            transition: 'all 0.3s ease',
          }}></span>
          <span style={{
            width: '25px',
            height: '2px',
            backgroundColor: 'white',
            opacity: menuOpen ? 0 : 1,
            transition: 'all 0.3s ease',
          }}></span>
          <span style={{
            width: '25px',
            height: '2px',
            backgroundColor: menuOpen ? 'transparent' : 'white',
            transform: menuOpen ? 'rotate(-45deg) translate(5px, -5px)' : 'none',
            transition: 'all 0.3s ease',
          }}></span>
        </div>
        
        {/* Десктопное меню */}
        <div 
          style={{
            display: 'flex',
            gap: '30px',
            alignItems: 'center',
            '@media (max-width: 768px)': {
              display: menuOpen ? 'flex' : 'none',
              position: 'fixed',
              top: 0,
              left: 0,
              width: '100%',
              height: '100vh',
              backgroundColor: 'rgba(15, 18, 34, 0.98)',
              flexDirection: 'column',
              justifyContent: 'center',
              padding: '50px 0',
              zIndex: 1000,
            }
          }}
          className="menu-items"
        >
          <NavLink to="/" active={isActive('/')}>Главная</NavLink>
          <NavLink to="/tasks" active={isActive('/tasks')}>Задания</NavLink>
          <NavLink to="/courses" active={isActive('/courses')}>Курсы</NavLink>
          <NavLink to="/profile" active={isActive('/profile')}>Профиль</NavLink>
          
          <Link to="/profile" style={{
            background: 'linear-gradient(90deg, #6a00ff, #00f0ff)',
            padding: '10px 25px',
            borderRadius: '5px',
            color: 'white',
            textDecoration: 'none',
            fontFamily: 'JetBrains Mono, monospace',
            transition: 'all 0.3s ease',
            fontWeight: 'bold',
            boxShadow: '0 2px 10px rgba(106, 0, 255, 0.3)',
            marginLeft: '10px',
            '@media (max-width: 768px)': {
              marginLeft: 0,
              marginTop: '20px',
            }
          }}>
            test_username
          </Link>
        </div>
      </div>
    </nav>
  );
};

// Компонент для пунктов меню
const NavLink = ({ to, active, children }) => (
  <Link
    to={to}
    style={{
      color: active ? 'var(--accent-purple)' : 'var(--text-light)',
      textDecoration: 'none',
      fontFamily: 'JetBrains Mono, monospace',
      fontSize: '0.95rem',
      padding: '5px 0',
      borderBottom: active ? '2px solid var(--accent-purple)' : '2px solid transparent',
      transition: 'all 0.3s ease',
    }}
  >
    {children}
  </Link>
);

export default Navbar; 