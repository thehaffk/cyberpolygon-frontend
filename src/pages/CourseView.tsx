import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import { Typography, Box, Container, Paper, Breadcrumbs, Link, CircularProgress, Alert } from '@mui/material';
import axiosInstance from '../api/axiosInstance';

interface Course {
  id: number;
  title: string;
  description: string;
  markdown_url?: string;
  level: string;
  duration: number;
}

const CourseView: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [course, setCourse] = useState<Course | null>(null);
  const [markdown, setMarkdown] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCourse = async () => {
      try {
        setLoading(true);
        const response = await axiosInstance.get(`/cyberpolygon/api/v1/course/${id}/`);
        setCourse(response.data);
        
        if (response.data.markdown_url) {
          const markdownResponse = await axiosInstance.post('/cyberpolygon/v1/get_markdown_post/', {
            url: response.data.markdown_url
          });
          setMarkdown(markdownResponse.data.content || markdownResponse.data);
        }
        setError(null);
      } catch (err) {
        setError('Ошибка при загрузке курса');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchCourse();
    }
  }, [id]);

  if (loading) {
    return (
      <Container>
        <Box display="flex" justifyContent="center" alignItems="center" minHeight="50vh">
          <CircularProgress />
        </Box>
      </Container>
    );
  }

  if (error) {
    return (
      <Container>
        <Alert severity="error">{error}</Alert>
      </Container>
    );
  }

  if (!course) {
    return (
      <Container>
        <Alert severity="warning">Курс не найден</Alert>
      </Container>
    );
  }

  return (
    <Container maxWidth="lg">
      <Box my={4}>
        <Breadcrumbs aria-label="breadcrumb" sx={{ mb: 2 }}>
          <Link color="inherit" onClick={() => navigate('/courses')}>
            Курсы
          </Link>
          <Typography color="textPrimary">{course.title}</Typography>
        </Breadcrumbs>
        
        <Typography variant="h4" component="h1" gutterBottom>
          {course.title}
        </Typography>
        
        <Box mb={3}>
          <Typography variant="subtitle1" color="textSecondary">
            Уровень: {course.level} • Длительность: {course.duration} ч
          </Typography>
        </Box>

        <Typography variant="body1" paragraph>
          {course.description}
        </Typography>

        <Paper elevation={1} sx={{ p: 3, mt: 3 }}>
          {markdown ? (
            <ReactMarkdown>{markdown}</ReactMarkdown>
          ) : (
            <Typography variant="body2" color="textSecondary">
              Содержимое курса недоступно
            </Typography>
          )}
        </Paper>
      </Box>
    </Container>
  );
};

export default CourseView; 