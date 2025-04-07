import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  Container,
  Box,
  Typography,
  Card,
  CardContent,
  CircularProgress,
  Alert,
  Button,
  TextField,
  Chip,
  Divider,
  Paper,
  Snackbar,
} from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
import ReactMarkdown from 'react-markdown';
import { useQuery, useMutation } from '@tanstack/react-query';
import axios from '../api/axiosInstance';

interface Task {
  id: number;
  title: string;
  description: string;
  content: string;
  difficulty: 'Легкий' | 'Средний' | 'Сложный';
  category: string;
  points: number;
  completed: boolean;
  hints: string[];
}

interface SubmitFlagResponse {
  success: boolean;
  message: string;
}

const fetchTask = async (taskId: string): Promise<Task> => {
  const response = await axios.get(`/api/tasks/${taskId}/`);
  return response.data;
};

const submitFlag = async ({ taskId, flag }: { taskId: string; flag: string }): Promise<SubmitFlagResponse> => {
  const response = await axios.post(`/api/tasks/${taskId}/submit/`, { flag });
  return response.data;
};

const difficultyColors = {
  'Легкий': 'success',
  'Средний': 'warning',
  'Сложный': 'error',
};

const TaskPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [flagInput, setFlagInput] = useState('');
  const [showHints, setShowHints] = useState(false);
  const [notification, setNotification] = useState<{ 
    open: boolean; 
    message: string; 
    severity: 'success' | 'error' | 'info'; 
  }>({
    open: false,
    message: '',
    severity: 'info',
  });

  const { data: task, isLoading, error, refetch } = useQuery<Task, Error>({
    queryKey: ['task', id],
    queryFn: () => fetchTask(id!),
    enabled: !!id,
  });

  const flagMutation = useMutation({
    mutationFn: submitFlag,
    onSuccess: (data) => {
      setNotification({
        open: true,
        message: data.message || (data.success ? 'Правильный флаг! Задание выполнено.' : 'Неверный флаг. Попробуйте еще раз.'),
        severity: data.success ? 'success' : 'error',
      });
      
      if (data.success) {
        refetch();  // Обновляем данные задания
        setFlagInput('');
      }
    },
    onError: (error) => {
      setNotification({
        open: true,
        message: 'Ошибка при отправке флага. Попробуйте позже.',
        severity: 'error',
      });
    },
  });

  const handleFlagSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!id || !flagInput.trim()) return;
    
    flagMutation.mutate({ taskId: id, flag: flagInput.trim() });
  };

  const handleCloseNotification = () => {
    setNotification({ ...notification, open: false });
  };

  if (isLoading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', mt: 8 }}>
        <CircularProgress />
      </Box>
    );
  }

  if (error || !task) {
    return (
      <Container sx={{ mt: 4 }}>
        <Alert severity="error">
          {error ? `Ошибка при загрузке задания: ${error.message}` : 'Задание не найдено'}
        </Alert>
      </Container>
    );
  }

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 6 }}>
      <Box sx={{ mb: 4 }}>
        <Button
          startIcon={<ArrowBackIcon />}
          onClick={() => navigate('/tasks')}
          sx={{ mb: 2 }}
        >
          Назад к заданиям
        </Button>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Typography variant="h4" component="h1" gutterBottom>
            {task.title}
          </Typography>
          <Box sx={{ display: 'flex', gap: 1 }}>
            <Chip
              label={task.difficulty}
              color={difficultyColors[task.difficulty] as 'success' | 'warning' | 'error'}
            />
            <Chip
              label={`${task.points} points`}
              variant="outlined"
              icon={<EmojiEventsIcon />}
            />
            <Chip
              label={task.category}
              variant="outlined"
            />
          </Box>
        </Box>
      </Box>

      <Paper sx={{ mb: 4, overflow: 'hidden' }}>
        <Box sx={{ p: 3 }}>
          <Typography variant="h6" gutterBottom>
            Описание задания
          </Typography>
          <Divider sx={{ mb: 2 }} />
          <Box className="markdown-body">
            <ReactMarkdown>{task.content}</ReactMarkdown>
          </Box>
        </Box>
      </Paper>

      {task.hints.length > 0 && (
        <Paper sx={{ mb: 4, overflow: 'hidden' }}>
          <Box sx={{ p: 3 }}>
            <Box 
              sx={{ 
                display: 'flex', 
                justifyContent: 'space-between', 
                alignItems: 'center', 
                cursor: 'pointer' 
              }}
              onClick={() => setShowHints(!showHints)}
            >
              <Typography variant="h6">
                Подсказки
              </Typography>
              <Button size="small">
                {showHints ? 'Скрыть' : 'Показать'}
              </Button>
            </Box>
            <Divider sx={{ my: 2 }} />
            {showHints && (
              <Box>
                {task.hints.map((hint, index) => (
                  <Alert key={index} severity="info" sx={{ mb: 2 }}>
                    <Typography variant="body1">{hint}</Typography>
                  </Alert>
                ))}
              </Box>
            )}
          </Box>
        </Paper>
      )}

      <Card sx={{ mb: 4 }}>
        <CardContent>
          {task.completed ? (
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', p: 2 }}>
              <CheckCircleIcon color="success" sx={{ mr: 1 }} />
              <Typography variant="h6" color="success.main">
                Вы успешно выполнили это задание!
              </Typography>
            </Box>
          ) : (
            <Box component="form" onSubmit={handleFlagSubmit} sx={{ p: 2 }}>
              <Typography variant="h6" gutterBottom>
                Отправить флаг
              </Typography>
              <Box sx={{ display: 'flex', gap: 2 }}>
                <TextField
                  label="Введите флаг"
                  variant="outlined"
                  fullWidth
                  value={flagInput}
                  onChange={(e) => setFlagInput(e.target.value)}
                  disabled={flagMutation.isPending}
                  sx={{ flexGrow: 1 }}
                />
                <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                  disabled={!flagInput.trim() || flagMutation.isPending}
                  sx={{ minWidth: 120 }}
                >
                  {flagMutation.isPending ? <CircularProgress size={24} /> : 'Отправить'}
                </Button>
              </Box>
            </Box>
          )}
        </CardContent>
      </Card>

      <Snackbar
        open={notification.open}
        autoHideDuration={6000}
        onClose={handleCloseNotification}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert 
          onClose={handleCloseNotification} 
          severity={notification.severity} 
          variant="filled" 
          sx={{ width: '100%' }}
        >
          {notification.message}
        </Alert>
      </Snackbar>
    </Container>
  );
};

export default TaskPage; 