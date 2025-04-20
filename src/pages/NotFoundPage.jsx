import React from 'react';
import { Link } from 'react-router-dom';
import {
  Container,
  Box,
  Typography,
  Button,
  Grid,
  Paper,
} from '@mui/material';

const NotFoundPage = () => {
  return (
    <Container>
      <Box
        sx={{
          minHeight: '80vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Grid container spacing={4} justifyContent="center">
          <Grid item xs={12} md={6}>
            <Paper
              elevation={3}
              sx={{
                p: 4,
                textAlign: 'center',
              }}
            >
              {/* Заголовок */}
              <Typography variant="h1" component="h1" gutterBottom>
                404
              </Typography>

              {/* Подзаголовок */}
              <Typography variant="h4" component="h2" gutterBottom>
                Страница не найдена
              </Typography>

              {/* Описание */}
              <Typography variant="body1" paragraph>
                Извините, но страница, которую вы ищете, не существует или была перемещена.
              </Typography>

              {/* Кнопка возврата */}
              <Button
                component={Link}
                to="/"
                variant="contained"
                color="primary"
                size="large"
                sx={{ mt: 2 }}
              >
                Вернуться на главную
              </Button>
            </Paper>
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
};

export default NotFoundPage; 