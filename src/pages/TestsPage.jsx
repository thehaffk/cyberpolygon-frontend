import React, { useEffect, useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import {
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  CardActions,
  Button,
  Box,
  Divider,
  CircularProgress,
  Chip
} from '@mui/material';
import { getTests } from '../api/tests';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import QuestionAnswerIcon from '@mui/icons-material/QuestionAnswer';
import PeopleIcon from '@mui/icons-material/People';
import { useAxiosErrorHandler } from '../hooks/useAxiosErrorHandler';
import { useNotify } from '../contexts/NotificationContext';

const TestsPage = () => {
  const [tests, setTests] = useState([]);
  const { loading, error, handleApiCall } = useAxiosErrorHandler();
  const notify = useNotify();

  useEffect(() => {
    const fetchTests = async () => {
      try {
        const data = await handleApiCall(() => getTests(), {
          errorMessage: 'Не удалось загрузить тесты'
        });
        setTests(data);
        
        if (data.length === 0) {
          notify.info('Список тестов пуст');
        }
      } catch (err) {
        // Ошибка уже обработана в handleApiCall
      }
    };

    fetchTests();
  }, [handleApiCall, notify]);

  if (loading) {
    return (
      <Container maxWidth="lg" sx={{ py: 6 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Тесты
        </Typography>
        <Box sx={{ display: 'flex', justifyContent: 'center', my: 4 }}>
          <CircularProgress />
        </Box>
      </Container>
    );
  }

  if (error) {
    return (
      <Container maxWidth="lg" sx={{ py: 6 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Тесты
        </Typography>
        <Typography color="error" sx={{ my: 2 }}>
          {error.message || 'Произошла ошибка при загрузке тестов'}
        </Typography>
        <Button 
          variant="contained" 
          onClick={() => window.location.reload()} 
          sx={{ mt: 2 }}
        >
          Попробовать снова
        </Button>
      </Container>
    );
  }

  return (
    <Container maxWidth="lg" sx={{ py: 6 }}>
      <Typography variant="h4" component="h1" gutterBottom>
        Тесты по кибербезопасности
      </Typography>
      <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
        Проверьте свои знания в различных областях кибербезопасности с помощью наших тестов.
      </Typography>

      <Grid container spacing={3}>
        {tests.length > 0 ? (
          tests.map((test) => (
            <Grid item xs={12} md={6} key={test.id}>
              <Card 
                sx={{ 
                  height: '100%', 
                  display: 'flex', 
                  flexDirection: 'column',
                  transition: 'transform 0.3s',
                  '&:hover': {
                    transform: 'translateY(-5px)',
                    boxShadow: 6
                  }
                }}
              >
                <CardContent sx={{ flexGrow: 1 }}>
                  <Typography variant="h5" component="h2" gutterBottom>
                    {test.title}
                  </Typography>
                  <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                    {test.description}
                  </Typography>
                  <Divider sx={{ my: 2 }} />
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 2 }}>
                    <Chip 
                      icon={<QuestionAnswerIcon />} 
                      label={`${test.questionCount} вопросов`} 
                      size="small"
                      sx={{ mr: 1 }}
                    />
                    <Chip 
                      icon={<AccessTimeIcon />} 
                      label={`${test.timeLimit} мин`} 
                      size="small"
                      sx={{ mr: 1 }}
                    />
                    <Chip 
                      icon={<PeopleIcon />} 
                      label={`${test.completedCount} прошли`} 
                      size="small"
                    />
                  </Box>
                </CardContent>
                <CardActions>
                  <Button 
                    component={RouterLink} 
                    to={`/tests/${test.id}`} 
                    variant="contained" 
                    fullWidth
                    onClick={() => notify.info(`Загружаем тест: ${test.title}`)}
                  >
                    Начать тест
                  </Button>
                </CardActions>
              </Card>
            </Grid>
          ))
        ) : (
          <Grid item xs={12}>
            <Typography variant="body1" align="center" sx={{ my: 3 }}>
              Тесты пока не доступны
            </Typography>
          </Grid>
        )}
      </Grid>
    </Container>
  );
};

export default TestsPage; 