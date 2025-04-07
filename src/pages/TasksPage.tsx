import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Container,
  Typography,
  Box,
  Grid,
  Card,
  CardContent,
  CardActionArea,
  Chip,
  CircularProgress,
  Alert,
  TextField,
  InputAdornment,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  SelectChangeEvent,
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import { useQuery } from '@tanstack/react-query';
import axios from '../api/axiosInstance';

interface Task {
  id: number;
  title: string;
  description: string;
  difficulty: 'Легкий' | 'Средний' | 'Сложный';
  category: string;
  points: number;
  completed: boolean;
}

const difficultyColors = {
  'Легкий': 'success',
  'Средний': 'warning',
  'Сложный': 'error',
};

const fetchTasks = async (): Promise<Task[]> => {
  const response = await axios.get('/api/tasks/');
  return response.data;
};

const TasksPage: React.FC = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [difficultyFilter, setDifficultyFilter] = useState<string>('');
  const [categoryFilter, setCategoryFilter] = useState<string>('');

  const { data: tasks, isLoading, error } = useQuery<Task[], Error>({
    queryKey: ['tasks'],
    queryFn: fetchTasks,
  });

  const handleDifficultyChange = (event: SelectChangeEvent) => {
    setDifficultyFilter(event.target.value);
  };

  const handleCategoryChange = (event: SelectChangeEvent) => {
    setCategoryFilter(event.target.value);
  };

  const filteredTasks = tasks?.filter(task => {
    const matchesSearch = task.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                        task.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesDifficulty = difficultyFilter === '' || task.difficulty === difficultyFilter;
    const matchesCategory = categoryFilter === '' || task.category === categoryFilter;
    
    return matchesSearch && matchesDifficulty && matchesCategory;
  });

  const categories = tasks ? [...new Set(tasks.map(task => task.category))] : [];

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
          Ошибка при загрузке заданий: {error.message}
        </Alert>
      </Container>
    );
  }

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 6 }}>
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Задания
        </Typography>
        <Typography variant="body1" color="text.secondary" paragraph>
          Решайте задания по кибербезопасности и получайте баллы
        </Typography>
      </Box>

      <Box sx={{ mb: 4, display: 'flex', flexDirection: { xs: 'column', md: 'row' }, gap: 2 }}>
        <TextField
          fullWidth
          variant="outlined"
          placeholder="Поиск заданий..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            ),
          }}
        />
        <FormControl variant="outlined" sx={{ minWidth: 150 }}>
          <InputLabel id="difficulty-filter-label">Сложность</InputLabel>
          <Select
            labelId="difficulty-filter-label"
            value={difficultyFilter}
            onChange={handleDifficultyChange}
            label="Сложность"
          >
            <MenuItem value="">Все</MenuItem>
            <MenuItem value="Легкий">Легкий</MenuItem>
            <MenuItem value="Средний">Средний</MenuItem>
            <MenuItem value="Сложный">Сложный</MenuItem>
          </Select>
        </FormControl>
        {categories.length > 0 && (
          <FormControl variant="outlined" sx={{ minWidth: 150 }}>
            <InputLabel id="category-filter-label">Категория</InputLabel>
            <Select
              labelId="category-filter-label"
              value={categoryFilter}
              onChange={handleCategoryChange}
              label="Категория"
            >
              <MenuItem value="">Все</MenuItem>
              {categories.map(category => (
                <MenuItem key={category} value={category}>{category}</MenuItem>
              ))}
            </Select>
          </FormControl>
        )}
      </Box>

      <Grid container spacing={3}>
        {filteredTasks?.length === 0 ? (
          <Box sx={{ p: 4, width: '100%', textAlign: 'center' }}>
            <Typography variant="h6" color="text.secondary">
              Задания не найдены
            </Typography>
          </Box>
        ) : (
          filteredTasks?.map((task) => (
            <Grid item xs={12} sm={6} md={4} key={task.id}>
              <Card
                sx={{
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  position: 'relative',
                  transition: 'transform 0.2s, box-shadow 0.2s',
                  '&:hover': {
                    transform: 'translateY(-5px)',
                    boxShadow: 8,
                  },
                }}
              >
                {task.completed && (
                  <Box
                    sx={{
                      position: 'absolute',
                      top: 0,
                      right: 0,
                      bgcolor: 'success.main',
                      color: 'white',
                      py: 0.5,
                      px: 1,
                      borderBottomLeftRadius: 4,
                    }}
                  >
                    Решено
                  </Box>
                )}
                <CardActionArea
                  sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column', alignItems: 'stretch' }}
                  onClick={() => navigate(`/tasks/${task.id}`)}
                >
                  <CardContent sx={{ flexGrow: 1 }}>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
                      <Chip
                        label={task.difficulty}
                        size="small"
                        color={difficultyColors[task.difficulty] as 'success' | 'warning' | 'error'}
                      />
                      <Chip
                        label={`${task.points} pts`}
                        size="small"
                        variant="outlined"
                      />
                    </Box>
                    <Typography variant="h6" component="h2" gutterBottom>
                      {task.title}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {task.description.length > 100
                        ? `${task.description.substring(0, 100)}...`
                        : task.description}
                    </Typography>
                    <Box sx={{ mt: 2 }}>
                      <Chip
                        label={task.category}
                        size="small"
                        variant="outlined"
                      />
                    </Box>
                  </CardContent>
                </CardActionArea>
              </Card>
            </Grid>
          ))
        )}
      </Grid>
    </Container>
  );
};

export default TasksPage; 