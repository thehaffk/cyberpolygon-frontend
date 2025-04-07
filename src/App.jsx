import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/layout/Navbar';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import TasksPage from './pages/TasksPage';
import TaskPage from './pages/TaskPage';
import CoursesPage from './pages/CoursesPage';
import CoursePage from './pages/CoursePage';
import ProfilePage from './pages/ProfilePage';
import TerminalPage from './pages/TerminalPage';
import AuthPage from './pages/AuthPage';
import NotFoundPage from './pages/NotFoundPage';
import TestsPage from './pages/TestsPage';
import TestView from './pages/TestView';

const PrivateRoute = ({ children }) => {
  const token = localStorage.getItem('token');
  if (!token) {
    return <Navigate to="/login" replace />;
  }
  return children;
};

const App = () => {
  return (
    <Router>
      <div className="app">
        <Navbar />
        <main className="main-content">
          <Routes>
            {/* Публичные маршруты */}
            <Route path="/" element={<HomePage />} />
            <Route path="/login" element={<AuthPage type="login" />} />
            <Route path="/register" element={<AuthPage type="register" />} />
            <Route path="/courses" element={<CoursesPage />} />
            <Route path="/courses/:slug" element={<CoursePage />} />
            <Route path="/tasks" element={<TasksPage />} />
            <Route path="/tasks/:id" element={<TaskPage />} />
            <Route path="/tests" element={<TestsPage />} />
            
            {/* Защищенные маршруты */}
            <Route path="/tests/:id" element={
              <PrivateRoute>
                <TestView />
              </PrivateRoute>
            } />
            <Route path="/profile" element={
              <PrivateRoute>
                <ProfilePage />
              </PrivateRoute>
            } />
            <Route path="/terminal" element={
              <PrivateRoute>
                <TerminalPage />
              </PrivateRoute>
            } />
            
            {/* Перенаправления */}
            <Route path="/login" element={
              localStorage.getItem('token') ? 
              <Navigate to="/profile" replace /> : 
              <AuthPage type="login" />
            } />
            
            {/* 404 */}
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
};

export default App; 