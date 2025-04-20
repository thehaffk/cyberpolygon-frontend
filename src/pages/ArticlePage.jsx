import React, { useEffect, useState } from 'react';
import { useParams, Link as RouterLink } from 'react-router-dom';
import {
  Container,
  Typography,
  Box,
  Breadcrumbs,
  Link,
  Paper,
  Skeleton,
  Chip,
  Divider,
  Button
} from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import articlesApi from '../api/articles';
import { useNotify } from '../contexts/NotificationContext';

const ArticlePage = () => {
  const { id } = useParams();
  const [article, setArticle] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const notify = useNotify();

  useEffect(() => {
    const fetchArticle = async () => {
      try {
        setLoading(true);
        const data = await articlesApi.getArticleById(parseInt(id));
        setArticle(data);
      } catch (err) {
        console.error('Error loading article:', err);
        setError('Не удалось загрузить статью');
        notify.error('Статья не найдена или произошла ошибка при загрузке');
      } finally {
        setLoading(false);
      }
    };

    fetchArticle();
  }, [id, notify]);

  if (loading) {
    return (
      <Container maxWidth="md" sx={{ py: 6 }}>
        <Breadcrumbs aria-label="breadcrumb" sx={{ mb: 3 }}>
          <Link component={RouterLink} to="/" color="inherit">
            Главная
          </Link>
          <Link component={RouterLink} to="/rubrics" color="inherit">
            Рубрики
          </Link>
          <Skeleton width={100} />
        </Breadcrumbs>
        
        <Skeleton variant="text" height={60} width="80%" />
        <Skeleton variant="text" height={30} width="40%" sx={{ mb: 4 }} />
        
        <Paper sx={{ p: 4 }}>
          <Skeleton variant="text" height={30} />
          <Skeleton variant="text" height={30} />
          <Skeleton variant="text" height={30} />
          <Skeleton variant="text" height={30} />
          <Skeleton variant="text" height={30} width="80%" />
        </Paper>
      </Container>
    );
  }

  if (error || !article) {
    return (
      <Container maxWidth="md" sx={{ py: 6 }}>
        <Breadcrumbs aria-label="breadcrumb" sx={{ mb: 3 }}>
          <Link component={RouterLink} to="/" color="inherit">
            Главная
          </Link>
          <Link component={RouterLink} to="/rubrics" color="inherit">
            Рубрики
          </Link>
          <Typography color="text.primary">Ошибка</Typography>
        </Breadcrumbs>
        
        <Typography color="error" variant="h5">
          {error || 'Статья не найдена'}
        </Typography>
        
        <Button 
          component={RouterLink}
          to="/rubrics"
          startIcon={<ArrowBackIcon />}
          sx={{ mt: 3 }}
        >
          Вернуться к рубрикам
        </Button>
      </Container>
    );
  }

  return (
    <Container maxWidth="md" sx={{ py: 6 }}>
      <Breadcrumbs aria-label="breadcrumb" sx={{ mb: 3 }}>
        <Link component={RouterLink} to="/" color="inherit">
          Главная
        </Link>
        <Link component={RouterLink} to="/rubrics" color="inherit">
          Рубрики
        </Link>
        <Link 
          component={RouterLink} 
          to={`/rubrics/${article.rubric_name}`} 
          color="inherit"
        >
          {article.rubric_name === 'network-security' && 'Сетевая безопасность'}
          {article.rubric_name === 'crypto' && 'Криптография'}
          {article.rubric_name === 'web-security' && 'Веб-безопасность'}
        </Link>
        <Typography color="text.primary">
          {article.title}
        </Typography>
      </Breadcrumbs>
      
      <Button 
        component={RouterLink}
        to={`/rubrics/${article.rubric_name}`}
        startIcon={<ArrowBackIcon />}
        variant="outlined"
        sx={{ mb: 4 }}
      >
        Назад к рубрике
      </Button>
      
      <Typography variant="h4" component="h1" gutterBottom sx={{ mb: 2 }}>
        {article.title}
      </Typography>
      
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 4 }}>
        <Chip 
          label={
            article.rubric_name === 'network-security' ? 'Сетевая безопасность' :
            article.rubric_name === 'crypto' ? 'Криптография' :
            article.rubric_name === 'web-security' ? 'Веб-безопасность' :
            article.rubric_name
          } 
          color="primary" 
          component={RouterLink}
          to={`/rubrics/${article.rubric_name}`}
          clickable
        />
        <Typography variant="body2" color="text.secondary">
          {new Date(article.created_at).toLocaleDateString()}
        </Typography>
      </Box>
      
      <Divider sx={{ mb: 4 }} />
      
      <Paper sx={{ p: 4, mb: 4 }}>
        <Typography variant="body1" sx={{ whiteSpace: 'pre-line' }}>
          {article.content}
        </Typography>
      </Paper>
      
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 4 }}>
        <Button
          component={RouterLink}
          to={`/rubrics/${article.rubric_name}`}
          startIcon={<ArrowBackIcon />}
        >
          Назад к рубрике
        </Button>
      </Box>
    </Container>
  );
};

export default ArticlePage; 