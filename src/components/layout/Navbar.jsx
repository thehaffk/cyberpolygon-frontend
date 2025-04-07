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
    <nav className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <RouterNavLink 
              to="/" 
              className="text-cyan-400 font-bold text-xl tracking-wider hover:text-cyan-300 transition-colors"
            >
              КИБЕРПОЛИГОН
            </RouterNavLink>
          </div>

          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-4">
              <RouterNavLink
                to="/courses"
                className={({ isActive }) =>
                  `px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                    isActive 
                      ? 'bg-gray-800 text-white' 
                      : 'text-gray-300 hover:bg-gray-700 hover:text-white'
                  }`
                }
              >
                Курсы
              </RouterNavLink>

              <RouterNavLink
                to="/tasks"
                className={({ isActive }) =>
                  `px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                    isActive 
                      ? 'bg-gray-800 text-white' 
                      : 'text-gray-300 hover:bg-gray-700 hover:text-white'
                  }`
                }
              >
                Задания
              </RouterNavLink>

              <RouterNavLink
                to="/tests"
                className={({ isActive }) =>
                  `px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                    isActive 
                      ? 'bg-gray-800 text-white' 
                      : 'text-gray-300 hover:bg-gray-700 hover:text-white'
                  }`
                }
              >
                Тесты
              </RouterNavLink>

              {user && (
                <RouterNavLink
                  to="/terminal"
                  className={({ isActive }) =>
                    `px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                      isActive 
                        ? 'bg-gray-800 text-white' 
                        : 'text-gray-300 hover:bg-gray-700 hover:text-white'
                    }`
                  }
                >
                  Терминал
                </RouterNavLink>
              )}
            </div>
          </div>

          <div className="flex items-center">
            {user ? (
              <div className="flex items-center space-x-4">
                <RouterNavLink
                  to="/profile"
                  className={({ isActive }) =>
                    `px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                      isActive 
                        ? 'bg-gray-800 text-white' 
                        : 'text-gray-300 hover:bg-gray-700 hover:text-white'
                    }`
                  }
                >
                  {user.username}
                </RouterNavLink>
                <button
                  onClick={handleLogout}
                  className="px-3 py-2 rounded-md text-sm font-medium text-gray-300 hover:bg-gray-700 hover:text-white transition-colors"
                >
                  Выйти
                </button>
              </div>
            ) : (
              <RouterNavLink
                to="/login"
                className="px-4 py-2 rounded-md text-sm font-medium bg-cyan-600 text-white hover:bg-cyan-500 transition-colors"
              >
                Войти
              </RouterNavLink>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar; 