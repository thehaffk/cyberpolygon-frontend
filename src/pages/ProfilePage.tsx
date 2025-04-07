import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  Container,
  Typography,
  Box,
  Card,
  CardContent,
  Avatar,
  Button,
  TextField,
  Grid,
  Divider,
  CircularProgress,
  Alert,
  Chip,
  Paper,
} from '@mui/material';
import PersonIcon from '@mui/icons-material/Person';
import EditIcon from '@mui/icons-material/Edit';
import SchoolIcon from '@mui/icons-material/School';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
import SecurityIcon from '@mui/icons-material/Security';
import { RootState, AppDispatch } from '../store';
import { updateProfile } from '../store/slices/authSlice';
import axios from '../api/axiosInstance';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';

interface ProfileStats {
  courses_completed: number;
  courses_in_progress: number;
  tasks_solved: number;
  total_points: number;
  rank: string;
  level: number;
}

interface Achievement {
  id: number;
  title: string;
  description: string;
  image_url: string;
  date_earned: string;
}

const fetchProfileStats = async (): Promise<ProfileStats> => {
  const response = await axios.get('/api/profile/stats/');
  return response.data;
};

const fetchAchievements = async (): Promise<Achievement[]> => {
  const response = await axios.get('/api/profile/achievements/');
  return response.data;
};

const ProfilePage: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const queryClient = useQueryClient();
  const { user } = useSelector((state: RootState) => state.auth);
  
  const [editMode, setEditMode] = useState(false);
  const [editedProfile, setEditedProfile] = useState({
    username: user?.username || '',
    email: user?.email || '',
    firstName: user?.first_name || '',
    lastName: user?.last_name || '',
  });
  
  const { 
    data: stats, 
    isLoading: statsLoading, 
    error: statsError 
  } = useQuery<ProfileStats, Error>({
    queryKey: ['profileStats'],
    queryFn: fetchProfileStats,
  });
  
  const { 
    data: achievements, 
    isLoading: achievementsLoading, 
    error: achievementsError 
  } = useQuery<Achievement[], Error>({
    queryKey: ['achievements'],
    queryFn: fetchAchievements,
  });

  const updateMutation = useMutation({
    mutationFn: (userData: typeof editedProfile) => {
      return axios.patch('/api/profile/', userData);
    },
    onSuccess: (response) => {
      dispatch(updateProfile(response.data));
      queryClient.invalidateQueries({ queryKey: ['profileStats'] });
      setEditMode(false);
    },
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setEditedProfile(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    updateMutation.mutate(editedProfile);
  };

  const handleCancel = () => {
    setEditMode(false);
    setEditedProfile({
      username: user?.username || '',
      email: user?.email || '',
      firstName: user?.first_name || '',
      lastName: user?.last_name || '',
    });
  };

  if (!user) {
    return (
      <Container maxWidth="lg" sx={{ mt: 4 }}>
        <Alert severity="error">Пользователь не авторизован</Alert>
      </Container>
    );
  }

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 6 }}>
      <Typography variant="h4" component="h1" gutterBottom>
        Мой профиль
      </Typography>
      
      <Grid container spacing={3}>
        {/* Информация о пользователе */}
        <Grid item xs={12} md={4}>
          <Card>
            <CardContent sx={{ textAlign: 'center' }}>
              <Avatar
                sx={{
                  width: 120,
                  height: 120,
                  bgcolor: 'primary.main',
                  fontSize: 48,
                  margin: '0 auto 16px',
                }}
              >
                {user.username ? user.username.charAt(0).toUpperCase() : <PersonIcon />}
              </Avatar>
              
              {!editMode ? (
                <>
                  <Typography variant="h5" gutterBottom>
                    {user.first_name && user.last_name 
                      ? `${user.first_name} ${user.last_name}` 
                      : user.username}
                  </Typography>
                  <Typography variant="body1" color="text.secondary" gutterBottom>
                    @{user.username}
                  </Typography>
                  <Typography variant="body2" sx={{ mb: 2 }}>
                    {user.email}
                  </Typography>
                  <Button
                    variant="outlined"
                    startIcon={<EditIcon />}
                    onClick={() => setEditMode(true)}
                    sx={{ mt: 2 }}
                  >
                    Редактировать профиль
                  </Button>
                </>
              ) : (
                <Box component="form" onSubmit={handleSubmit}>
                  <Grid container spacing={2}>
                    <Grid item xs={12}>
                      <TextField
                        name="username"
                        label="Имя пользователя"
                        fullWidth
                        value={editedProfile.username}
                        onChange={handleInputChange}
                        disabled
                        variant="outlined"
                        margin="normal"
                        size="small"
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <TextField
                        name="email"
                        label="Email"
                        fullWidth
                        value={editedProfile.email}
                        onChange={handleInputChange}
                        variant="outlined"
                        margin="normal"
                        size="small"
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <TextField
                        name="firstName"
                        label="Имя"
                        fullWidth
                        value={editedProfile.firstName}
                        onChange={handleInputChange}
                        variant="outlined"
                        margin="normal"
                        size="small"
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <TextField
                        name="lastName"
                        label="Фамилия"
                        fullWidth
                        value={editedProfile.lastName}
                        onChange={handleInputChange}
                        variant="outlined"
                        margin="normal"
                        size="small"
                      />
                    </Grid>
                    <Grid item xs={6}>
                      <Button
                        variant="outlined"
                        color="secondary"
                        onClick={handleCancel}
                        fullWidth
                      >
                        Отмена
                      </Button>
                    </Grid>
                    <Grid item xs={6}>
                      <Button
                        type="submit"
                        variant="contained"
                        color="primary"
                        fullWidth
                        disabled={updateMutation.isPending}
                      >
                        {updateMutation.isPending ? (
                          <CircularProgress size={24} />
                        ) : (
                          'Сохранить'
                        )}
                      </Button>
                    </Grid>
                  </Grid>
                </Box>
              )}
              
              {updateMutation.isError && (
                <Alert severity="error" sx={{ mt: 2 }}>
                  Ошибка при обновлении профиля
                </Alert>
              )}
            </CardContent>
          </Card>
        </Grid>
        
        {/* Статистика */}
        <Grid item xs={12} md={8}>
          <Card sx={{ mb: 3 }}>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Статистика
              </Typography>
              <Divider sx={{ mb: 2 }} />
              
              {statsLoading ? (
                <Box sx={{ display: 'flex', justifyContent: 'center', py: 3 }}>
                  <CircularProgress />
                </Box>
              ) : statsError ? (
                <Alert severity="error">
                  Ошибка при загрузке статистики
                </Alert>
              ) : stats ? (
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={6}>
                    <Paper elevation={0} sx={{ p: 2, border: '1px solid', borderColor: 'divider' }}>
                      <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <SchoolIcon color="primary" sx={{ mr: 1 }} />
                        <Typography variant="body1">Курсы</Typography>
                      </Box>
                      <Box sx={{ mt: 2 }}>
                        <Typography variant="h5" color="primary.main">
                          {stats.courses_completed} / {stats.courses_completed + stats.courses_in_progress}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          Завершено курсов
                        </Typography>
                      </Box>
                    </Paper>
                  </Grid>
                  
                  <Grid item xs={12} sm={6}>
                    <Paper elevation={0} sx={{ p: 2, border: '1px solid', borderColor: 'divider' }}>
                      <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <EmojiEventsIcon color="primary" sx={{ mr: 1 }} />
                        <Typography variant="body1">Рейтинг</Typography>
                      </Box>
                      <Box sx={{ mt: 2 }}>
                        <Typography variant="h5" color="primary.main">
                          {stats.total_points}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          Баллов набрано
                        </Typography>
                      </Box>
                    </Paper>
                  </Grid>
                  
                  <Grid item xs={12} sm={6}>
                    <Paper elevation={0} sx={{ p: 2, border: '1px solid', borderColor: 'divider' }}>
                      <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <SecurityIcon color="primary" sx={{ mr: 1 }} />
                        <Typography variant="body1">Задания</Typography>
                      </Box>
                      <Box sx={{ mt: 2 }}>
                        <Typography variant="h5" color="primary.main">
                          {stats.tasks_solved}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          Решено заданий
                        </Typography>
                      </Box>
                    </Paper>
                  </Grid>
                  
                  <Grid item xs={12} sm={6}>
                    <Paper elevation={0} sx={{ p: 2, border: '1px solid', borderColor: 'divider' }}>
                      <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <PersonIcon color="primary" sx={{ mr: 1 }} />
                        <Typography variant="body1">Уровень</Typography>
                      </Box>
                      <Box sx={{ mt: 2 }}>
                        <Typography variant="h5" color="primary.main">
                          {stats.level}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          {stats.rank}
                        </Typography>
                      </Box>
                    </Paper>
                  </Grid>
                </Grid>
              ) : null}
            </CardContent>
          </Card>
          
          {/* Достижения */}
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Достижения
              </Typography>
              <Divider sx={{ mb: 2 }} />
              
              {achievementsLoading ? (
                <Box sx={{ display: 'flex', justifyContent: 'center', py: 3 }}>
                  <CircularProgress />
                </Box>
              ) : achievementsError ? (
                <Alert severity="error">
                  Ошибка при загрузке достижений
                </Alert>
              ) : achievements && achievements.length > 0 ? (
                <Grid container spacing={2}>
                  {achievements.map((achievement) => (
                    <Grid item xs={12} sm={6} md={4} key={achievement.id}>
                      <Paper 
                        elevation={0}
                        sx={{ 
                          p: 2, 
                          border: '1px solid', 
                          borderColor: 'divider',
                          textAlign: 'center',
                        }}
                      >
                        <Avatar
                          src={achievement.image_url}
                          alt={achievement.title}
                          sx={{ width: 64, height: 64, margin: '0 auto 8px' }}
                        />
                        <Typography variant="body1" fontWeight="bold">
                          {achievement.title}
                        </Typography>
                        <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                          {achievement.description}
                        </Typography>
                        <Chip
                          label={achievement.date_earned}
                          size="small"
                          variant="outlined"
                        />
                      </Paper>
                    </Grid>
                  ))}
                </Grid>
              ) : (
                <Alert severity="info">
                  У вас пока нет достижений. Заработайте их, выполняя задания!
                </Alert>
              )}
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Container>
  );
};

export default ProfilePage; 