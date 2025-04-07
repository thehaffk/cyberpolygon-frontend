import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import {
  Container,
  Typography,
  Box,
  TextField,
  Button,
  Paper,
  Tab,
  Tabs,
  Alert,
  CircularProgress,
  Link,
} from '@mui/material';
import { login, register, clearError } from '../store/slices/authSlice';
import { RootState, AppDispatch } from '../store';

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

const TabPanel: React.FC<TabPanelProps> = ({ children, value, index }) => {
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`tabpanel-${index}`}
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
};

const AuthPage: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const { loading, error } = useSelector((state: RootState) => state.auth);
  const [tabValue, setTabValue] = useState(0);
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [registerUsername, setRegisterUsername] = useState('');
  const [registerEmail, setRegisterEmail] = useState('');
  const [registerPassword, setRegisterPassword] = useState('');
  const [registerConfirmPassword, setRegisterConfirmPassword] = useState('');
  const [passwordError, setPasswordError] = useState('');

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
    dispatch(clearError());
    setPasswordError('');
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await dispatch(login({ email: loginEmail, password: loginPassword })).unwrap();
      navigate('/');
    } catch (err) {
      console.error('Login failed:', err);
    }
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    if (registerPassword !== registerConfirmPassword) {
      setPasswordError('Пароли не совпадают');
      return;
    }
    try {
      await dispatch(register({
        username: registerUsername,
        email: registerEmail,
        password: registerPassword,
      })).unwrap();
      navigate('/');
    } catch (err) {
      console.error('Registration failed:', err);
    }
  };

  return (
    <Container maxWidth="sm">
      <Box
        sx={{
          mt: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Typography component="h1" variant="h4" gutterBottom>
          CyberPolygon
        </Typography>
        <Paper sx={{ width: '100%', mt: 3 }}>
          <Tabs
            value={tabValue}
            onChange={handleTabChange}
            variant="fullWidth"
            indicatorColor="primary"
            textColor="primary"
          >
            <Tab label="Вход" />
            <Tab label="Регистрация" />
          </Tabs>

          {/* Вход */}
          <TabPanel value={tabValue} index={0}>
            <Box component="form" onSubmit={handleLogin} noValidate>
              {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
              <TextField
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email"
                name="email"
                autoComplete="email"
                autoFocus
                value={loginEmail}
                onChange={(e) => setLoginEmail(e.target.value)}
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                label="Пароль"
                type="password"
                id="password"
                autoComplete="current-password"
                value={loginPassword}
                onChange={(e) => setLoginPassword(e.target.value)}
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
                disabled={loading}
              >
                {loading ? <CircularProgress size={24} /> : 'Войти'}
              </Button>
            </Box>
          </TabPanel>

          {/* Регистрация */}
          <TabPanel value={tabValue} index={1}>
            <Box component="form" onSubmit={handleRegister} noValidate>
              {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
              {passwordError && <Alert severity="error" sx={{ mb: 2 }}>{passwordError}</Alert>}
              <TextField
                margin="normal"
                required
                fullWidth
                id="username"
                label="Имя пользователя"
                name="username"
                autoComplete="username"
                autoFocus
                value={registerUsername}
                onChange={(e) => setRegisterUsername(e.target.value)}
              />
              <TextField
                margin="normal"
                required
                fullWidth
                id="register-email"
                label="Email"
                name="email"
                autoComplete="email"
                value={registerEmail}
                onChange={(e) => setRegisterEmail(e.target.value)}
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                label="Пароль"
                type="password"
                id="register-password"
                value={registerPassword}
                onChange={(e) => setRegisterPassword(e.target.value)}
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="confirm-password"
                label="Подтвердите пароль"
                type="password"
                id="confirm-password"
                value={registerConfirmPassword}
                onChange={(e) => setRegisterConfirmPassword(e.target.value)}
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
                disabled={loading}
              >
                {loading ? <CircularProgress size={24} /> : 'Зарегистрироваться'}
              </Button>
            </Box>
          </TabPanel>
        </Paper>
      </Box>
    </Container>
  );
};

export default AuthPage; 