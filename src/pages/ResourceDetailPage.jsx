import React from 'react';
import { useParams, useNavigate, Link as RouterLink } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { 
  Typography, Box, Container, Breadcrumbs, 
  Link, CircularProgress, Alert, Card, 
  CardContent, Chip, Divider, Button,
  Paper, Skeleton
} from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import ArticleIcon from '@mui/icons-material/Article';
import ReactMarkdown from 'react-markdown';
import { articlesApi } from '../api';

const ResourceDetailPage = () => {
  const { slug } = useParams();
  const navigate = useNavigate();

  // Запрос на получение детальной информации о статье
  const { 
    data: article, 
    isLoading, 
    error 
  } = useQuery(
    ['article', slug], 
    () => articlesApi.get(slug),
    { 
      enabled: !!slug,
      refetchOnWindowFocus: false,
      onError: (error) => {
        console.error('Error fetching article:', error);
      },
      staleTime: 10 * 60 * 1000, // Кэширование на 10 минут
    }
  );

  // Функция для возврата к списку ресурсов
  const handleBackClick = () => {
    navigate('/resources');
  };

  const renderError = () => (
    <Paper 
      elevation={0} 
      sx={{ 
        p: 3, 
        bgcolor: 'error.light', 
        color: 'error.contrastText',
        borderRadius: 2,
        display: 'flex',
        alignItems: 'center',
        gap: 2
      }}
    >
      <ErrorOutlineIcon color="error" fontSize="large" />
      <Box>
        <Typography variant="h6" gutterBottom>Ошибка загрузки статьи</Typography>
        <Typography variant="body2">
          {error?.message || 'Статья не найдена или произошла ошибка при загрузке'}
        </Typography>
        <Button 
          variant="contained" 
          color="primary" 
          size="small"
          onClick={handleBackClick}
          sx={{ mt: 2 }}
        >
          Вернуться к списку статей
        </Button>
      </Box>
    </Paper>
  );

  const renderLoading = () => (
    <>
      <Box sx={{ mb: 3 }}>
        <Skeleton variant="text" height={40} width="60%" />
        <Box sx={{ display: 'flex', gap: 1, mt: 2 }}>
          <Skeleton variant="rounded" height={32} width={100} />
          <Skeleton variant="rounded" height={32} width={80} />
        </Box>
      </Box>
      <Divider sx={{ my: 3 }} />
      <Skeleton variant="rectangular" height={250} sx={{ mb: 3 }} />
      <Skeleton variant="text" height={24} />
      <Skeleton variant="text" height={24} />
      <Skeleton variant="text" height={24} width="90%" />
      <Skeleton variant="text" height={24} width="95%" />
      <Skeleton variant="text" height={24} width="88%" />
    </>
  );

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      {/* Хлебные крошки */}
      <Breadcrumbs sx={{ mb: 3 }}>
        <Link 
          component={RouterLink} 
          to="/"
          underline="hover"
          color="inherit"
        >
          Главная
        </Link>
        <Link 
          component={RouterLink} 
          to="/resources"
          underline="hover"
          color="inherit"
        >
          Ресурсы
        </Link>
        <Typography color="text.primary">
          {isLoading ? <Skeleton width={120} /> : (article?.title || 'Статья не найдена')}
        </Typography>
      </Breadcrumbs>
      
      {/* Кнопка назад */}
      <Button 
        startIcon={<ArrowBackIcon />} 
        onClick={handleBackClick}
        sx={{ mb: 4 }}
        variant="outlined"
        size="small"
      >
        К списку ресурсов
      </Button>

      {/* Ошибка */}
      {error && renderError()}

      {/* Загрузка */}
      {isLoading && !error && (
        <Card elevation={2} sx={{ mb: 4, p: 2 }}>
          <CardContent>{renderLoading()}</CardContent>
        </Card>
      )}

      {/* Контент статьи */}
      {!isLoading && !error && article && (
        <Card elevation={2} sx={{ mb: 4, overflow: 'hidden' }}>
          <CardContent sx={{ p: { xs: 2, sm: 4 } }}>
            {/* Заголовок статьи */}
            <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 2, mb: 3 }}>
              <ArticleIcon fontSize="large" color="primary" sx={{ mt: 0.5 }} />
              <Box>
                <Typography variant="h4" component="h1" gutterBottom sx={{ fontWeight: 700 }}>
                  {article.title}
                </Typography>
                
                {/* Метаданные */}
                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mb: 2 }}>
                  {article.rubric && (
                    <Chip 
                      label={article.rubric.title} 
                      color="primary" 
                      size="small" 
                    />
                  )}
                  {article.tags && article.tags.map((tag, index) => (
                    <Chip 
                      key={index} 
                      label={tag} 
                      size="small" 
                      variant="outlined"
                      sx={{ borderRadius: 1 }}
                    />
                  ))}
                </Box>
                
                {article.created_at && (
                  <Typography variant="body2" color="text.secondary">
                    {new Date(article.created_at).toLocaleDateString('ru-RU', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric'
                    })}
                  </Typography>
                )}
              </Box>
            </Box>
            
            <Divider sx={{ my: 3 }} />
            
            {/* Контент статьи */}
            <Box sx={{ py: 2 }}>
              {article.image && (
                <Box 
                  component="img" 
                  src={article.image} 
                  alt={article.title}
                  sx={{ 
                    width: '100%', 
                    maxHeight: 400,
                    objectFit: 'cover',
                    borderRadius: 2,
                    mb: 4
                  }}
                />
              )}
              
              {/* Рендеринг markdown-контента */}
              <Box 
                sx={{ 
                  typography: 'body1',
                  '& h1, & h2, & h3, & h4, & h5, & h6': {
                    mt: 4,
                    mb: 2,
                    fontWeight: 600,
                    color: 'text.primary'
                  },
                  '& p': {
                    mb: 2,
                    lineHeight: 1.7
                  },
                  '& a': {
                    color: 'primary.main',
                    textDecoration: 'none',
                    '&:hover': {
                      textDecoration: 'underline'
                    }
                  },
                  '& img': {
                    maxWidth: '100%',
                    height: 'auto',
                    borderRadius: 1,
                    my: 2
                  },
                  '& blockquote': {
                    borderLeft: '4px solid',
                    borderColor: 'divider',
                    pl: 2,
                    py: 1,
                    my: 2,
                    bgcolor: 'background.paper',
                    borderRadius: 1
                  },
                  '& code': {
                    fontFamily: 'monospace',
                    p: 0.5,
                    borderRadius: 0.5,
                    bgcolor: 'background.paper'
                  },
                  '& pre': {
                    p: 2,
                    borderRadius: 1,
                    bgcolor: 'background.paper',
                    overflowX: 'auto'
                  },
                  '& ul, & ol': {
                    pl: 3,
                    mb: 2
                  }
                }}
              >
                <ReactMarkdown>
                  {article.content}
                </ReactMarkdown>
              </Box>
            </Box>
          </CardContent>
        </Card>
      )}
      
      {/* Случай когда статья не найдена */}
      {!isLoading && !error && !article && (
        <Alert severity="warning" sx={{ my: 2 }}>
          Статья не найдена
        </Alert>
      )}
    </Container>
  );
};

export default ResourceDetailPage; 