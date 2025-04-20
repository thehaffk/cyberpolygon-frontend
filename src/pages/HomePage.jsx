import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Container, 
  Typography, 
  Button, 
  Grid, 
  Box, 
  Card, 
  CardContent,
  CardActionArea,
  useTheme 
} from '@mui/material';
import SchoolIcon from '@mui/icons-material/School';
import AssignmentIcon from '@mui/icons-material/Assignment';
import QuizIcon from '@mui/icons-material/Quiz';
import authApi from '../api/auth';

const HomePage = () => {
  const theme = useTheme();
  const isAuthenticated = authApi.isAuthenticated();

  const features = [
    {
      id: 1,
      title: 'Курсы',
      description: 'Погрузитесь в мир кибербезопасности через интерактивные уроки и реальные примеры',
      icon: <SchoolIcon sx={{ fontSize: 40 }} />,
      link: '/courses',
      color: theme.palette.primary.main
    },
    {
      id: 2,
      title: 'Задания',
      description: 'Отточите навыки на практических заданиях разной сложности',
      icon: <AssignmentIcon sx={{ fontSize: 40 }} />,
      link: '/tasks',
      color: theme.palette.secondary.main
    },
    {
      id: 3,
      title: 'Тесты',
      description: 'Проверьте свои знания в реальном времени',
      icon: <QuizIcon sx={{ fontSize: 40 }} />,
      link: '/tests',
      color: theme.palette.success.main
    }
  ];

  return (
    <Box sx={{ pt: 8, pb: 10 }}>
      <Container maxWidth="lg">
        <Box 
          sx={{
            textAlign: 'center',
            mb: 10
          }}
        >
          <Typography
            variant="h1"
            sx={{
              fontSize: { xs: '2.5rem', sm: '3.5rem', md: '4.5rem' },
              fontWeight: 800,
              background: `linear-gradient(45deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
              backgroundClip: 'text',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              mb: 3,
              letterSpacing: '-0.02em'
            }}
          >
            Киберполигон
          </Typography>

          <Typography
            variant="h5"
            sx={{
              maxWidth: '700px',
              mx: 'auto',
              mb: 6,
              color: 'text.secondary',
              fontWeight: 400,
              letterSpacing: '0.01em',
              lineHeight: 1.6
            }}
          >
            Начни обучение по кибербезопасности
          </Typography>

          <Box
            sx={{
              display: 'flex',
              gap: 3,
              justifyContent: 'center',
              flexWrap: 'wrap',
              mb: 10
            }}
          >
            <Button
              component={Link}
              to={isAuthenticated ? "/courses" : "/auth"}
              variant="contained"
              size="large"
              sx={{
                px: 5,
                py: 1.5,
                fontSize: '1.1rem',
                fontWeight: 600,
                borderRadius: 1.5,
                boxShadow: 4
              }}
            >
              {isAuthenticated ? "Начать обучение" : "Войти"}
            </Button>
          </Box>

          <Grid container spacing={4} justifyContent="center">
            {features.map((feature) => (
              <Grid item xs={12} sm={6} md={4} key={feature.id}>
                <Card 
                  sx={{ 
                    height: '100%',
                    bgcolor: 'background.paper',
                    transition: 'transform 0.25s ease, box-shadow 0.25s ease',
                    borderRadius: 2,
                    overflow: 'hidden',
                    boxShadow: '0 4px 20px rgba(0,0,0,0.08)',
                    '&:hover': {
                      transform: 'translateY(-8px)',
                      boxShadow: '0 12px 30px rgba(0,0,0,0.15)'
                    }
                  }}
                >
                  <CardActionArea 
                    component={Link} 
                    to={feature.link}
                    sx={{ height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'stretch' }}
                  >
                    <Box 
                      sx={{ 
                        p: 3, 
                        display: 'flex', 
                        justifyContent: 'center',
                        bgcolor: `${feature.color}10`
                      }}
                    >
                      <Box 
                        sx={{ 
                          color: feature.color,
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center'
                        }}
                      >
                        {feature.icon}
                      </Box>
                    </Box>
                    <CardContent sx={{ flexGrow: 1, p: 3 }}>
                      <Typography 
                        gutterBottom 
                        variant="h6" 
                        component="div"
                        sx={{ 
                          fontWeight: 700,
                          color: 'text.primary',
                          mb: 1.5
                        }}
                      >
                        {feature.title}
                      </Typography>
                      <Typography 
                        variant="body2" 
                        color="text.secondary"
                        sx={{ lineHeight: 1.6 }}
                      >
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
    </Box>
  );
};

export default HomePage; 