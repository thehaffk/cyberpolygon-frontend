import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getTests } from '../api/tests';
import { Box, Button, Card, CardContent, CircularProgress, Grid, Typography } from '@mui/material';

export default function TestsPage() {
  const navigate = useNavigate();
  const [tests, setTests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadTests = async () => {
      try {
        setLoading(true);
        const data = await getTests();
        setTests(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    loadTests();
  }, []);

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="80vh">
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Box p={3}>
        <Typography color="error">{error}</Typography>
      </Box>
    );
  }

  return (
    <Box p={3}>
      <Typography variant="h4" gutterBottom>Тесты</Typography>
      <Grid container spacing={3}>
        {tests.map(test => (
          <Grid item xs={12} sm={6} md={4} key={test.id}>
            <Card>
              <CardContent>
                <Typography variant="h6">{test.title}</Typography>
                <Typography color="textSecondary" gutterBottom>
                  {test.description}
                </Typography>
                <Button 
                  variant="contained" 
                  color="primary"
                  onClick={() => navigate(`/tests/${test.id}`)}
                  disabled={test.completed}
                >
                  {test.completed ? 'Пройден' : 'Начать'}
                </Button>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
} 