import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { 
  Grid, Typography, Box, Card, CardContent, 
  CardActionArea, Chip, CircularProgress, 
  Tabs, Tab, Alert, Container, Skeleton,
  Divider, Paper
} from '@mui/material';
import MenuBookIcon from '@mui/icons-material/MenuBook';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import { rubricsApi, articlesApi } from '../api';

const ResourcesPage = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState(0);
  const [selectedRubric, setSelectedRubric] = useState(null);

  // Запрос на получение рубрик
  const { 
    data: rubrics, 
    isLoading: rubricsLoading, 
    error: rubricsError 
  } = useQuery(
    ['rubrics'], 
    () => rubricsApi.list(), 
    {
      onError: (error) => {
        console.error('Error fetching rubrics:', error);
      },
      staleTime: 5 * 60 * 1000, // Кэширование на 5 минут
    }
  );

  // Запрос на получение статей с фильтрацией по рубрике
  const { 
    data: articles, 
    isLoading: articlesLoading, 
    error: articlesError 
  } = useQuery(
    ['articles', selectedRubric], 
    () => selectedRubric 
      ? rubricsApi.getArticles(selectedRubric) 
      : articlesApi.list(),
    { 
      keepPreviousData: true,
      onError: (error) => {
        console.error('Error fetching articles:', error);
      },
    }
  );

  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue);
    setSelectedRubric(newValue === 0 ? null : rubrics[newValue - 1]?.slug);
  };

  const handleArticleClick = (slug) => {
    navigate(`/resources/${slug}`);
  };

  const renderError = (error) => (
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
      <ErrorOutlineIcon color="error" />
      <Box>
        <Typography variant="h6" gutterBottom>Ошибка загрузки данных</Typography>
        <Typography variant="body2">
          {error?.message || 'Пожалуйста, попробуйте обновить страницу'}
        </Typography>
      </Box>
    </Paper>
  );

  const renderSkeleton = () => (
    <Grid container spacing={3}>
      {[1, 2, 3, 4, 5, 6].map((item) => (
        <Grid item xs={12} sm={6} md={4} key={item}>
          <Card sx={{ height: '100%' }}>
            <Skeleton variant="rectangular" height={140} />
            <CardContent>
              <Skeleton variant="text" height={32} width="80%" />
              <Skeleton variant="text" height={20} />
              <Skeleton variant="text" height={20} />
              <Box sx={{ mt: 2, display: 'flex', gap: 1 }}>
                <Skeleton variant="rectangular" height={24} width={60} />
                <Skeleton variant="rectangular" height={24} width={80} />
              </Box>
            </CardContent>
          </Card>
        </Grid>
      ))}
    </Grid>
  );

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" component="h1" sx={{ 
          fontWeight: 700,
          display: 'flex',
          alignItems: 'center',
          gap: 1
        }}>
          <MenuBookIcon fontSize="large" color="primary" /> Ресурсы
        </Typography>
        <Typography variant="subtitle1" color="text.secondary" sx={{ mt: 1 }}>
          Статьи и материалы по кибербезопасности
        </Typography>
        <Divider sx={{ mt: 2 }} />
      </Box>

      {/* Ошибки */}
      {(rubricsError || articlesError) && renderError(rubricsError || articlesError)}

      {/* Вкладки рубрик */}
      {!rubricsError && (
        <Box sx={{ borderBottom: 1, borderColor: 'divider', mb: 4 }}>
          <Tabs 
            value={activeTab} 
            onChange={handleTabChange}
            variant="scrollable"
            scrollButtons="auto"
            textColor="primary"
            indicatorColor="primary"
            sx={{
              '& .MuiTab-root': {
                minWidth: { xs: 'auto', sm: 120 },
                px: { xs: 2, sm: 3 }
              }
            }}
          >
            <Tab label="Все" />
            {rubricsLoading ? (
              <Tab label={<Skeleton width={80} />} disabled />
            ) : (
              rubrics && rubrics.map((rubric) => (
                <Tab key={rubric.id} label={rubric.title} />
              ))
            )}
          </Tabs>
        </Box>
      )}

      {/* Загрузка */}
      {(rubricsLoading || articlesLoading) && !rubricsError && renderSkeleton()}

      {/* Список статей */}
      {!rubricsLoading && !articlesLoading && !rubricsError && !articlesError && (
        <Grid container spacing={3}>
          {articles && articles.length > 0 ? (
            articles.map((article) => (
              <Grid item xs={12} sm={6} md={4} key={article.id}>
                <Card sx={{ 
                  height: '100%', 
                  display: 'flex', 
                  flexDirection: 'column',
                  transition: 'transform 0.2s ease, box-shadow 0.2s ease',
                  '&:hover': {
                    transform: 'translateY(-5px)',
                    boxShadow: 6
                  }
                }}>
                  <CardActionArea 
                    onClick={() => handleArticleClick(article.slug)}
                    sx={{ height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'stretch' }}
                  >
                    {article.image && (
                      <Box
                        component="img"
                        src={article.image}
                        alt={article.title}
                        sx={{ 
                          height: 160,
                          width: '100%',
                          objectFit: 'cover'
                        }}
                      />
                    )}
                    <CardContent sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
                      <Typography variant="h6" component="div" gutterBottom sx={{ fontWeight: 600 }}>
                        {article.title}
                      </Typography>
                      <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                        {article.description || article.excerpt || 'Нет описания'}
                      </Typography>
                      <Box sx={{ mt: 'auto', pt: 2, display: 'flex', gap: 1, flexWrap: 'wrap' }}>
                        {article.rubric && (
                          <Chip label={article.rubric.title} color="primary" size="small" />
                        )}
                        {article.tags && article.tags.map((tag, index) => (
                          <Chip key={index} label={tag} size="small" variant="outlined" />
                        ))}
                      </Box>
                    </CardContent>
                  </CardActionArea>
                </Card>
              </Grid>
            ))
          ) : (
            <Box sx={{ py: 6, width: '100%', textAlign: 'center' }}>
              <Typography variant="h6" color="text.secondary" gutterBottom>
                Статьи не найдены
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {selectedRubric 
                  ? 'В данной рубрике пока нет статей' 
                  : 'Статьи скоро появятся'}
              </Typography>
            </Box>
          )}
        </Grid>
      )}
    </Container>
  );
};

export default ResourcesPage; 