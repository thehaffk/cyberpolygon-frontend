import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import {
  Container,
  Box,
  Typography,
  Button,
  Paper,
  Alert,
  CircularProgress,
  Divider,
  Tooltip,
  IconButton,
  Stack,
} from '@mui/material';
import GoogleIcon from '@mui/icons-material/Google';
import GitHubIcon from '@mui/icons-material/GitHub';
import { SiYandexcloud } from 'react-icons/si';
import { getOAuthUrl } from '../api/auth';

const AuthPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [activeProvider, setActiveProvider] = useState('');

  const handleOAuthLogin = async (provider) => {
    setError('');
    setLoading(true);
    setActiveProvider(provider);

    try {
      const authUrl = await getOAuthUrl(provider);
      window.location.href = authUrl;
    } catch (err) {
      console.error(`OAuth error with ${provider}:`, err);
      setError(
        err.response?.data?.detail || 
        err.message || 
        `Ошибка при авторизации через ${provider}`
      );
      setLoading(false);
      setActiveProvider('');
    }
  };

  const providers = [
    {
      id: 'google',
      name: 'Google',
      icon: <GoogleIcon />,
      color: '#DB4437'
    },
    {
      id: 'github',
      name: 'GitHub',
      icon: <GitHubIcon />,
      color: '#333'
    },
    {
      id: 'yandex',
      name: 'Яндекс',
      icon: <SiYandexcloud size={24} />,
      color: '#FC3F1D'
    }
  ];

  return (
    <Container component="main" maxWidth="sm">
      <Box
        sx={{
          marginTop: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Paper
          elevation={3}
          sx={{
            padding: 4,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            width: '100%',
            borderRadius: 2,
            bgcolor: 'background.paper'
          }}
        >
          <Typography component="h1" variant="h5" sx={{ mb: 3, fontWeight: 600 }}>
            Вход в систему
          </Typography>

          {error && (
            <Alert severity="error" sx={{ width: '100%', mb: 3 }}>
              {error}
            </Alert>
          )}

          <Typography variant="body2" color="text.secondary" sx={{ mb: 4, textAlign: 'center' }}>
            Используйте один из сервисов для входа в систему
          </Typography>

          <Stack spacing={2} sx={{ width: '100%', mb: 3 }}>
            {providers.map((provider) => (
              <Button
                key={provider.id}
                fullWidth
                variant="outlined"
                size="large"
                startIcon={provider.icon}
                disabled={loading}
                onClick={() => handleOAuthLogin(provider.id)}
                sx={{
                  py: 1.5,
                  borderColor: loading ? 'divider' : provider.color,
                  color: loading ? 'text.disabled' : provider.color,
                  '&:hover': {
                    borderColor: provider.color,
                    bgcolor: `${provider.color}10`,
                  },
                  position: 'relative'
                }}
              >
                {loading && activeProvider === provider.id ? (
                  <CircularProgress size={24} sx={{ position: 'absolute', left: 20 }} />
                ) : (
                  <>Войти через {provider.name}</>
                )}
              </Button>
            ))}
          </Stack>

          <Typography variant="body2" color="text.secondary" sx={{ mt: 2, textAlign: 'center' }}>
            Вход означает согласие с условиями использования и политикой конфиденциальности
          </Typography>
        </Paper>
      </Box>
    </Container>
  );
};

export default AuthPage; 