import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, Button, Container, Typography } from '@mui/material';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import HomeIcon from '@mui/icons-material/Home';

const NotFoundPage: React.FC = () => {
  const navigate = useNavigate();

  return (
    <Container maxWidth="sm">
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          minHeight: 'calc(100vh - 64px)',
          textAlign: 'center',
          py: 4,
        }}
      >
        <ErrorOutlineIcon sx={{ fontSize: 100, color: 'error.main', mb: 2 }} />
        <Typography variant="h2" component="h1" gutterBottom>
          404
        </Typography>
        <Typography variant="h4" gutterBottom>
          Страница не найдена
        </Typography>
        <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
          Запрошенная страница не существует или была перемещена.
        </Typography>
        <Button
          variant="contained"
          color="primary"
          size="large"
          startIcon={<HomeIcon />}
          onClick={() => navigate('/')}
        >
          Вернуться на главную
        </Button>
      </Box>
    </Container>
  );
};

export default NotFoundPage; 