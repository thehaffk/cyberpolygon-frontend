import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Container,
  Grid,
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Typography,
  Box,
  CircularProgress,
  Alert,
  Chip,
  Divider,
} from '@mui/material';
import { useQuery } from '@tanstack/react-query';
import axios from '../api/axiosInstance';

interface Course {
  id: number;
  title: string;
  description: string;
  image_url: string;
  difficulty: 'Начинающий' | 'Средний' | 'Продвинутый';
  tags: string[];
  lessons_count: number;
}

const difficultyColors = {
  'Начинающий': 'success',
  'Средний': 'warning',
  'Продвинутый': 'error',
};

const fetchCourses = async (): Promise<Course[]> => {
  const response = await axios.get('/api/courses/');
  return response.data;
};

const CoursesPage: React.FC = () => {
  const navigate = useNavigate();
  const { data: courses, isLoading, error } = useQuery<Course[], Error>({
    queryKey: ['courses'],
    queryFn: fetchCourses,
  });

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
          Ошибка при загрузке курсов: {error.message}
        </Alert>
      </Container>
    );
  }

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 6 }}>
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Доступные курсы
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Выберите курс для изучения основ и продвинутых техник кибербезопасности
        </Typography>
      </Box>

      <Grid container spacing={3}>
        {courses?.map((course) => (
          <Grid item xs={12} sm={6} md={4} key={course.id}>
            <Card 
              sx={{ 
                height: '100%', 
                display: 'flex', 
                flexDirection: 'column',
                transition: 'transform 0.2s, box-shadow 0.2s',
                '&:hover': {
                  transform: 'translateY(-5px)',
                  boxShadow: 8,
                },
              }}
            >
              <CardActionArea
                sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}
                onClick={() => navigate(`/courses/${course.id}`)}
              >
                <CardMedia
                  component="img"
                  height="140"
                  image={course.image_url || 'https://source.unsplash.com/random?cybersecurity'}
                  alt={course.title}
                />
                <CardContent sx={{ flexGrow: 1, width: '100%' }}>
                  <Box sx={{ mb: 1, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <Chip
                      label={course.difficulty}
                      size="small"
                      color={difficultyColors[course.difficulty] as 'success' | 'warning' | 'error'}
                    />
                    <Typography variant="body2" color="text.secondary">
                      {course.lessons_count} {course.lessons_count === 1 ? 'урок' : 
                        course.lessons_count > 1 && course.lessons_count < 5 ? 'урока' : 'уроков'}
                    </Typography>
                  </Box>
                  <Typography gutterBottom variant="h6" component="h2">
                    {course.title}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {course.description.length > 120
                      ? `${course.description.substring(0, 120)}...`
                      : course.description}
                  </Typography>
                  <Box sx={{ mt: 2 }}>
                    {course.tags.map((tag) => (
                      <Chip
                        key={tag}
                        label={tag}
                        size="small"
                        sx={{ mr: 0.5, mb: 0.5 }}
                      />
                    ))}
                  </Box>
                </CardContent>
              </CardActionArea>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default CoursesPage; 