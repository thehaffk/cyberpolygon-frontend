import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
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
import PrivateRoute from './components/PrivateRoute';
import TestsPage from './pages/TestsPage';
import TestView from './pages/TestView';

function App() {
  return (
    <Router>
      <div className="app">
        <Navbar />
        <div className="main-content">
          <Routes>
            {/* Публичные маршруты */}
            <Route path="/" element={<HomePage />} />
            <Route path="/login" element={<AuthPage type="login" />} />
            <Route path="/register" element={<AuthPage type="register" />} />
            
            {/* Защищенные маршруты */}
            <Route element={<PrivateRoute />}>
              <Route path="/profile" element={<ProfilePage />} />
              <Route path="/courses" element={<CoursesPage />} />
              <Route path="/courses/:slug" element={<CoursePage />} />
              <Route path="/tasks" element={<TasksPage />} />
              <Route path="/tasks/:id" element={<TaskPage />} />
              <Route path="/terminal" element={<TerminalPage />} />
              <Route path="/tests" element={<TestsPage />} />
              <Route path="/tests/:id" element={<TestView />} />
            </Route>
            
            {/* Страница 404 */}
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </div>
        <Footer />
      </div>
    </Router>
  );
}

export default App; 