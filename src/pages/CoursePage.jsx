import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getCourseBySlug, getCourseProgress } from '../api/courses';
import { getTasks } from '../api/tasks';
import ReactMarkdown from 'react-markdown';

const CoursePage = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const [course, setCourse] = useState(null);
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeLesson, setActiveLesson] = useState(0);

  useEffect(() => {
    const loadCourse = async () => {
      try {
        setLoading(true);
        const courseData = await getCourseBySlug(slug);
        setCourse(courseData);
        
        // Загружаем задачи курса
        const tasksData = await getTasks();
        const courseTasks = tasksData.filter(task => task.course === courseData.id);
        setTasks(courseTasks);
      } catch (err) {
        console.error('Error loading course:', err);
        setError('Не удалось загрузить курс');
      } finally {
        setLoading(false);
      }
    };

    loadCourse();
  }, [slug]);

  if (loading) {
    return <div className="loading">Загрузка курса...</div>;
  }

  if (error) {
    return <div className="error">{error}</div>;
  }

  if (!course) {
    return <div className="error">Курс не найден</div>;
  }

  const handleTaskClick = (taskId) => {
    navigate(`/tasks/${taskId}`);
  };

  // Получаем медиа-файл курса или используем заглушку
  const courseImage = course.media && course.media.length > 0 
    ? `http://localhost:8000${course.media[0].url}` 
    : 'https://via.placeholder.com/200x200';

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="bg-white rounded-lg shadow-md p-6 mb-6">
        <h1 className="text-2xl font-bold mb-4">{course.title}</h1>
        <p className="text-gray-600 mb-4">{course.description}</p>
        <div className="flex items-center text-sm text-gray-500">
          <span>Уроков: {course.lessons_count}</span>
          <span className="mx-2">•</span>
          <span>Задач: {tasks.length}</span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {tasks.map(task => (
          <div 
            key={task.id}
            onClick={() => handleTaskClick(task.id)}
            className="bg-white rounded-lg shadow-md p-6 cursor-pointer hover:shadow-lg transition-shadow"
          >
            <h2 className="text-xl font-semibold mb-2">{task.title}</h2>
            <p className="text-gray-600 mb-4">{task.description}</p>
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-500">
                {task.is_completed ? '✅ Выполнено' : '❌ Не выполнено'}
              </span>
              <span className="text-sm font-medium text-blue-600">
                {task.points} очков
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CoursePage; 