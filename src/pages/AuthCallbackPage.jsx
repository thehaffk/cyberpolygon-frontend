import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { Container, Box, Typography, CircularProgress, Alert } from '@mui/material';
import authApi from '../api/auth';
import { useNotify } from '../contexts/NotificationContext';
import { setUser } from '../redux/userSlice';

const AuthCallbackPage = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();
  const notify = useNotify();

  useEffect(() => {
    const handleCallback = async () => {
      try {
        const urlParams = new URLSearchParams(location.search);
        const code = urlParams.get('code');
        const state = urlParams.get('state');
        const provider = state ? JSON.parse(state).provider : null;

        if (!code || !provider) {
          throw new Error('Отсутствуют необходимые параметры в URL');
        }

        const response = await authApi.handleOAuthCallback(provider, code, state);
        
        if (response && response.user) {
          dispatch(setUser(response.user));
          notify.success(`Вы успешно вошли через ${provider}`);
          navigate('/');
        } else {
          throw new Error('Не удалось получить данные пользователя');
        }
      } catch (err) {
        console.error('Auth callback error:', err);
        setError(err.response?.data?.detail || err.message || 'Ошибка при авторизации');
        setLoading(false);
        // Redirect to login page after a delay
        setTimeout(() => navigate('/auth'), 3000);
      }
    };

    handleCallback();
  }, [dispatch, location, navigate, notify]);

  if (loading) {
    return (
      <Container component="main" maxWidth="xs">
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <CircularProgress />
          <Typography sx={{ mt: 2 }} variant="body1">
            Завершаем авторизацию...
          </Typography>
        </Box>
      </Container>
    );
  }

  if (error) {
    return (
      <Container component="main" maxWidth="md">
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Alert severity="error" sx={{ width: '100%', mb: 2 }}>
            {error}
          </Alert>
          <Typography variant="body1">
            Перенаправление на страницу входа...
          </Typography>
        </Box>
      </Container>
    );
  }

  return null;
};

export default AuthCallbackPage; 