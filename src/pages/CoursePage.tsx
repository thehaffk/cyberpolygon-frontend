import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  Container,
  Typography,
  Box,
  CircularProgress,
  Alert,
  Button,
  Card,
  CardContent,
  Divider,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Tabs,
  Tab,
  Paper,
} from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import BookmarkIcon from '@mui/icons-material/Bookmark';
import AssignmentIcon from '@mui/icons-material/Assignment';
import ReactMarkdown from 'react-markdown';
import { useQuery } from '@tanstack/react-query';
import axios from '../api/axiosInstance';

interface CourseLesson {
  id: number;
  title: string;
  content: string;
  position: number;
  completed: boolean;
}

interface Course {
  id: number;
  title: string;
  description: string;
  image_url: string;
  difficulty: 'Начинающий' | 'Средний' | 'Продвинутый';
  lessons: CourseLesson[];
  tasks: number[];
}

const fetchCourse = async (courseId: string): Promise<Course> => {
  const response = await axios.get(`/api/courses/${courseId}/`);
  return response.data;
};

const CoursePage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState(0);
  const [activeLesson, setActiveLesson] = useState<number | null>(null);

  const { data: course, isLoading, error } = useQuery<Course, Error>({
    queryKey: ['course', id],
    queryFn: () => fetchCourse(id!),
    enabled: !!id,
  });

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setActiveTab(newValue);
  };

  const handleLessonClick = (lessonId: number) => {
    setActiveLesson(lessonId);
  };

  if (isLoading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', mt: 8 }}>
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Container sx={{ mt: 4 }}>
        <Alert severity="error">
          Ошибка при загрузке курса: {error.message}
        </Alert>
      </Container>
    );
  }

  if (!course) {
    return (
      <Container sx={{ mt: 4 }}>
        <Alert severity="error">Курс не найден</Alert>
      </Container>
    );
  }

  const currentLesson = course.lessons.find(lesson => lesson.id === activeLesson) || 
                        (course.lessons.length > 0 ? course.lessons[0] : null);

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 6 }}>
      <Box sx={{ mb: 4 }}>
        <Button
          startIcon={<ArrowBackIcon />}
          onClick={() => navigate('/courses')}
          sx={{ mb: 2 }}
        >
          Назад к курсам
        </Button>
        <Typography variant="h4" component="h1" gutterBottom>
          {course.title}
        </Typography>
        <Typography variant="body1" color="text.secondary" paragraph>
          {course.description}
        </Typography>
      </Box>

      <Box sx={{ mb: 4 }}>
        <Tabs value={activeTab} onChange={handleTabChange} aria-label="course tabs">
          <Tab label="Уроки" id="course-tab-0" />
          <Tab label="Задания" id="course-tab-1" />
          <Tab label="Информация" id="course-tab-2" />
        </Tabs>
      </Box>

      <Box hidden={activeTab !== 0} sx={{ display: activeTab === 0 ? 'flex' : 'none', gap: 4 }}>
        <Paper sx={{ width: 300, flexShrink: 0 }}>
          <Box sx={{ p: 2, bgcolor: 'primary.main', color: 'white' }}>
            <Typography variant="h6">Содержание курса</Typography>
          </Box>
          <List>
            {course.lessons.map((lesson) => (
              <ListItem
                button
                key={lesson.id}
                selected={activeLesson === lesson.id || (!activeLesson && lesson.id === course.lessons[0]?.id)}
                onClick={() => handleLessonClick(lesson.id)}
              >
                <ListItemIcon>
                  {lesson.completed ? (
                    <CheckCircleOutlineIcon color="success" />
                  ) : (
                    <PlayArrowIcon />
                  )}
                </ListItemIcon>
                <ListItemText 
                  primary={lesson.title} 
                  secondary={`Урок ${lesson.position}`} 
                />
              </ListItem>
            ))}
          </List>
        </Paper>

        <Box sx={{ flexGrow: 1 }}>
          {currentLesson ? (
            <Card>
              <CardContent>
                <Typography variant="h5" gutterBottom>
                  {currentLesson.title}
                </Typography>
                <Divider sx={{ my: 2 }} />
                <Box className="markdown-body">
                  <ReactMarkdown>{currentLesson.content}</ReactMarkdown>
                </Box>
                <Box sx={{ mt: 4, display: 'flex', justifyContent: 'space-between' }}>
                  <Button
                    variant="outlined"
                    disabled={currentLesson.id === course.lessons[0].id}
                    onClick={() => {
                      const prevIndex = course.lessons.findIndex(l => l.id === currentLesson.id) - 1;
                      if (prevIndex >= 0) {
                        setActiveLesson(course.lessons[prevIndex].id);
                      }
                    }}
                  >
                    Предыдущий урок
                  </Button>
                  <Button
                    variant="contained"
                    disabled={currentLesson.id === course.lessons[course.lessons.length - 1].id}
                    onClick={() => {
                      const nextIndex = course.lessons.findIndex(l => l.id === currentLesson.id) + 1;
                      if (nextIndex < course.lessons.length) {
                        setActiveLesson(course.lessons[nextIndex].id);
                      }
                    }}
                  >
                    Следующий урок
                  </Button>
                </Box>
              </CardContent>
            </Card>
          ) : (
            <Alert severity="info">Выберите урок из списка</Alert>
          )}
        </Box>
      </Box>

      <Box hidden={activeTab !== 1} sx={{ display: activeTab === 1 ? 'block' : 'none' }}>
        {course.tasks.length > 0 ? (
          <List>
            {course.tasks.map((taskId) => (
              <ListItem
                button
                key={taskId}
                onClick={() => navigate(`/tasks/${taskId}`)}
              >
                <ListItemIcon>
                  <AssignmentIcon />
                </ListItemIcon>
                <ListItemText primary={`Задание ${taskId}`} />
              </ListItem>
            ))}
          </List>
        ) : (
          <Alert severity="info">Для этого курса нет заданий</Alert>
        )}
      </Box>

      <Box hidden={activeTab !== 2} sx={{ display: activeTab === 2 ? 'block' : 'none' }}>
        <Card>
          <CardContent>
            <Typography variant="h6" gutterBottom>
              О курсе
            </Typography>
            <Typography variant="body1" paragraph>
              {course.description}
            </Typography>
            <Box sx={{ mt: 2 }}>
              <Typography variant="subtitle1" gutterBottom>
                Сложность:
              </Typography>
              <Typography variant="body2" sx={{ mb: 2 }}>
                {course.difficulty}
              </Typography>
              
              <Typography variant="subtitle1" gutterBottom>
                Количество уроков:
              </Typography>
              <Typography variant="body2" sx={{ mb: 2 }}>
                {course.lessons.length}
              </Typography>
              
              <Typography variant="subtitle1" gutterBottom>
                Количество заданий:
              </Typography>
              <Typography variant="body2">
                {course.tasks.length}
              </Typography>
            </Box>
          </CardContent>
        </Card>
      </Box>
    </Container>
  );
};

export default CoursePage; 