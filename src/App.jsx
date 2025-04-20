import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { ThemeProvider } from '@mui/material/styles';
import { CssBaseline } from '@mui/material';
import { SnackbarProvider } from 'notistack';
import { theme } from './theme';
import Layout from './components/layout/Layout';
import AuthPage from './pages/AuthPage';
import AuthCallbackPage from './pages/AuthCallbackPage';
import ProfilePage from './pages/ProfilePage';
import CoursesPage from './pages/CoursesPage';
import CoursePage from './pages/CoursePage';
import TaskPage from './pages/TaskPage';
import TestsPage from './pages/TestsPage';
import TestView from './pages/TestView';
import TerminalPage from './pages/TerminalPage';
import HomePage from './pages/HomePage';
import ResourcesPage from './pages/ResourcesPage';
import ResourceDetailPage from './pages/ResourceDetailPage';
import RubricsPage from './pages/RubricsPage';
import RubricDetailPage from './pages/RubricDetailPage';
import ArticlePage from './pages/ArticlePage';
import PrivateRoute from './components/PrivateRoute';
import { FEATURES } from './config/env';
import { Alert } from '@mui/material';
import { NotificationProvider } from './contexts/NotificationContext';
import NotificationSnack, { SlideTransition } from './components/ui/NotificationSnack';
import { notistackConfig } from './theme/NotificationStyles';

// Mock mode indicator banner
const MockModeBanner = () => {
  if (!FEATURES.USE_MOCKS) return null;
  
  return (
    <Alert 
      severity="warning" 
      sx={{ 
        position: 'fixed', 
        bottom: 0, 
        left: 0, 
        right: 0, 
        zIndex: 1000,
        borderRadius: 0 
      }}
    >
      Режим моков активен (REACT_APP_USE_MOCKS=true)
    </Alert>
  );
};

// Маршрут только для неавторизованных пользователей
const PublicOnlyRoute = ({ children }) => {
  const isAuthenticated = localStorage.getItem('access_token') !== null;
  return !isAuthenticated ? children : <Navigate to="/profile" replace />;
};

const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <SnackbarProvider
        {...notistackConfig}
        TransitionComponent={SlideTransition}
        Components={{
          success: NotificationSnack,
          error: NotificationSnack,
          warning: NotificationSnack,
          info: NotificationSnack,
        }}
      >
        <NotificationProvider>
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Layout />}>
                {/* Публичные маршруты */}
                <Route index element={<HomePage />} />
                <Route path="auth" element={
                  <PublicOnlyRoute>
                    <AuthPage />
                  </PublicOnlyRoute>
                } />
                <Route path="auth/callback" element={<AuthCallbackPage />} />
                {/* Публичная страница курсов */}
                <Route path="courses" element={<CoursesPage />} />
                
                {/* Рубрики и статьи */}
                <Route path="rubrics" element={<RubricsPage />} />
                <Route path="rubrics/:name" element={<RubricDetailPage />} />
                <Route path="articles/:id" element={<ArticlePage />} />

                {/* Защищенные маршруты */}
                <Route element={<PrivateRoute />}>
                  <Route path="profile" element={<ProfilePage />} />
                  <Route path="courses/:id" element={<CoursePage />} />
                  <Route path="tasks/:id" element={<TaskPage />} />
                  <Route path="tests" element={<TestsPage />} />
                  <Route path="tests/:id" element={<TestView />} />
                  <Route path="terminal" element={<TerminalPage />} />
                  <Route path="resources" element={<ResourcesPage />} />
                  <Route path="resources/:slug" element={<ResourceDetailPage />} />
                </Route>

                {/* Редирект 404 на главную */}
                <Route path="*" element={<Navigate to="/" replace />} />
              </Route>
            </Routes>
          </BrowserRouter>
          <MockModeBanner />
        </NotificationProvider>
      </SnackbarProvider>
    </ThemeProvider>
  );
};

export default App;