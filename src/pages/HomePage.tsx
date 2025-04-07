import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Button,
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  CardActionArea,
  useTheme,
} from '@mui/material';
import SecurityIcon from '@mui/icons-material/Security';
import SchoolIcon from '@mui/icons-material/School';
import CodeIcon from '@mui/icons-material/Code';

const features = [
  {
    icon: <SecurityIcon fontSize="large" color="primary" />,
    title: 'Практическая безопасность',
    description: 'Изучайте реальные уязвимости и методы защиты в безопасной среде.',
  },
  {
    icon: <SchoolIcon fontSize="large" color="primary" />,
    title: 'Структурированные курсы',
    description: 'Пошаговые уроки от основ до продвинутых техник кибербезопасности.',
  },
  {
    icon: <CodeIcon fontSize="large" color="primary" />,
    title: 'Интерактивные задания',
    description: 'Решайте практические задачи в эмулируемой среде с проверкой в реальном времени.',
  },
];

const HomePage: React.FC = () => {
  const navigate = useNavigate();
  const theme = useTheme();

  return (
    <Container maxWidth="lg">
      <Box
        sx={{
          mt: 8,
          mb: 6,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          textAlign: 'center',
        }}
      >
        <Typography
          component="h1"
          variant="h2"
          color="primary"
          gutterBottom
          sx={{ fontWeight: 'bold' }}
        >
          Киберполигон
        </Typography>
        <Typography variant="h5" color="text.secondary" paragraph sx={{ maxWidth: 700, mb: 4 }}>
          Образовательная платформа для изучения кибербезопасности через практику.
          Присоединяйтесь и станьте экспертом в области защиты информации.
        </Typography>
        <Box sx={{ mt: 2, display: 'flex', gap: 2 }}>
          <Button
            variant="contained"
            size="large"
            color="primary"
            onClick={() => navigate('/login')}
          >
            Начать обучение
          </Button>
          <Button
            variant="outlined"
            size="large"
            onClick={() => navigate('/courses')}
          >
            Просмотреть курсы
          </Button>
        </Box>
      </Box>

      <Box sx={{ py: 6 }}>
        <Typography variant="h4" component="h2" align="center" gutterBottom>
          Почему вам стоит выбрать нас
        </Typography>
        <Grid container spacing={4} sx={{ mt: 2 }}>
          {features.map((feature, index) => (
            <Grid item xs={12} md={4} key={index}>
              <Card
                sx={{
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  transition: 'transform 0.2s, box-shadow 0.2s',
                  '&:hover': {
                    transform: 'translateY(-5px)',
                    boxShadow: theme.shadows[10],
                  },
                }}
              >
                <CardActionArea sx={{ flexGrow: 1 }}>
                  <CardContent sx={{ textAlign: 'center', p: 3 }}>
                    <Box sx={{ mb: 2 }}>{feature.icon}</Box>
                    <Typography gutterBottom variant="h5" component="h3">
                      {feature.title}
                    </Typography>
                    <Typography variant="body1" color="text.secondary">
                      {feature.description}
                    </Typography>
                  </CardContent>
                </CardActionArea>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Box>
    </Container>
  );
};

export default HomePage; 