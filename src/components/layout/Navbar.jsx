import React, { useState, useEffect } from 'react';
import { Link, NavLink as RouterNavLink, useNavigate } from 'react-router-dom';
import { getCurrentUser, logout } from '../../api/auth';

const Navbar = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadUser = async () => {
      try {
        const userData = await getCurrentUser();
        setUser(userData);
      } catch (err) {
        console.error('Error loading user:', err);
      } finally {
        setLoading(false);
      }
    };

    if (localStorage.getItem('token')) {
      loadUser();
    } else {
      setLoading(false);
    }
  }, []);

  const handleLogout = () => {
    logout();
    setUser(null);
    navigate('/login');
  };

  if (loading) {
    return null;
  }

  return (
    <nav className="navbar">
      <div className="navbar-brand">
        <RouterNavLink to="/" className="logo">
          КИБЕРПОЛИГОН
        </RouterNavLink>
      </div>

      <div className="nav-links">
        <RouterNavLink to="/courses">Курсы</RouterNavLink>
        <RouterNavLink to="/tasks">Задания</RouterNavLink>
        <RouterNavLink to="/tests">Тесты</RouterNavLink>
        {user && (
          <RouterNavLink to="/terminal">Терминал</RouterNavLink>
        )}
      </div>

      <div className="nav-auth">
        {user ? (
          <>
            <RouterNavLink to="/profile" className="profile-link">
              {user.username}
            </RouterNavLink>
            <button onClick={handleLogout} className="logout-button">
              Выйти
            </button>
          </>
        ) : (
          <RouterNavLink to="/login" className="login-button">
            Войти
          </RouterNavLink>
        )}
      </div>
    </nav>
  );
};

export default Navbar; 