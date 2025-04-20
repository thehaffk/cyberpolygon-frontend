import React, { useState } from 'react';
import { useNavigate, Link as RouterLink } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import {
  AppBar,
  Box,
  Toolbar,
  IconButton,
  Typography,
  Menu,
  Container,
  Avatar,
  Button,
  Tooltip,
  MenuItem,
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Divider,
  Stack,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import HomeIcon from '@mui/icons-material/Home';
import SchoolIcon from '@mui/icons-material/School';
import AssignmentIcon from '@mui/icons-material/Assignment';
import CodeIcon from '@mui/icons-material/Code';
import MenuBookIcon from '@mui/icons-material/MenuBook';
import QuizIcon from '@mui/icons-material/Quiz';
import LogoutIcon from '@mui/icons-material/Logout';
import LoginIcon from '@mui/icons-material/Login';
import { logout } from '../../store/slices/authSlice';
import authApi from '../../api/auth';

const Navbar = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useSelector(state => state.auth);
  const isAuthenticated = authApi.isAuthenticated();
  
  const [anchorElUser, setAnchorElUser] = useState(null);
  const [drawerOpen, setDrawerOpen] = useState(false);

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const handleDrawerToggle = () => {
    setDrawerOpen(!drawerOpen);
  };

  const handleLogout = async () => {
    try {
      await authApi.logout();
      dispatch(logout());
      navigate('/auth');
    } catch (error) {
      console.error('Logout error:', error);
    }
    handleCloseUserMenu();
  };

  // Все доступные пункты меню
  const allMenuItems = [
    { title: 'Главная', path: '/', icon: <HomeIcon />, public: true },
    { title: 'Курсы', path: '/courses', icon: <SchoolIcon />, public: true },
    { title: 'Рубрики', path: '/rubrics', icon: <MenuBookIcon />, public: true },
    { title: 'Задания', path: '/tasks', icon: <AssignmentIcon />, public: false },
    { title: 'Ресурсы', path: '/resources', icon: <MenuBookIcon />, public: false },
    { title: 'Тесты', path: '/tests', icon: <QuizIcon />, public: false }
  ];

  // Только для авторизованных - "Терминал" спрятан в боковое меню
  const privateMenuItems = [
    { title: 'Терминал', path: '/terminal', icon: <CodeIcon /> }
  ];

  // Фильтруем меню в зависимости от статуса авторизации
  const visibleMenuItems = allMenuItems.filter(item => item.public || isAuthenticated);

  const userMenuItems = isAuthenticated
    ? [
        { title: 'Профиль', path: '/profile', action: () => navigate('/profile') },
        { title: 'Выйти', action: handleLogout },
      ]
    : [{ title: 'Войти', path: '/auth', action: () => navigate('/auth') }];

  const drawer = (
    <Box sx={{ width: 260 }} role="presentation" onClick={handleDrawerToggle}>
      <Box sx={{ p: 2, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <Typography variant="h6" component={RouterLink} to="/" sx={{ 
          color: 'text.primary', 
          textDecoration: 'none',
          fontWeight: 700
        }}>
          CyberPolygon
        </Typography>
      </Box>
      <Divider />
      <List>
        {visibleMenuItems.map((item) => (
          <ListItem
            button
            key={item.title}
            component={RouterLink}
            to={item.path}
          >
            <ListItemIcon sx={{ minWidth: 40, color: 'primary.main' }}>{item.icon}</ListItemIcon>
            <ListItemText primary={item.title} />
          </ListItem>
        ))}
        {isAuthenticated && privateMenuItems.map((item) => (
          <ListItem
            button
            key={item.title}
            component={RouterLink}
            to={item.path}
          >
            <ListItemIcon sx={{ minWidth: 40, color: 'primary.main' }}>{item.icon}</ListItemIcon>
            <ListItemText primary={item.title} />
          </ListItem>
        ))}
      </List>
      <Divider />
      <List>
        {isAuthenticated ? (
          <>
            <ListItem button component={RouterLink} to="/profile">
              <ListItemIcon sx={{ minWidth: 40, color: 'primary.main' }}>
                <AccountCircleIcon />
              </ListItemIcon>
              <ListItemText primary="Профиль" />
            </ListItem>
            <ListItem button onClick={handleLogout}>
              <ListItemIcon sx={{ minWidth: 40, color: 'secondary.main' }}>
                <LogoutIcon />
              </ListItemIcon>
              <ListItemText primary="Выйти" />
            </ListItem>
          </>
        ) : (
          <ListItem button component={RouterLink} to="/auth">
            <ListItemIcon sx={{ minWidth: 40, color: 'primary.main' }}>
              <LoginIcon />
            </ListItemIcon>
            <ListItemText primary="Войти" />
          </ListItem>
        )}
      </List>
    </Box>
  );

  return (
    <AppBar position="sticky" sx={{ bgcolor: '#0f0f23', boxShadow: '0 4px 20px rgba(0,0,0,0.15)' }}>
      <Container maxWidth="lg">
        <Toolbar disableGutters sx={{ minHeight: { xs: 64, md: 70 } }}>
          {/* Мобильное меню */}
          <Box sx={{ display: { xs: 'flex', md: 'none' }, mr: 1 }}>
            <IconButton
              size="large"
              aria-label="меню навигации"
              onClick={handleDrawerToggle}
              color="inherit"
              edge="start"
            >
              <MenuIcon />
            </IconButton>
            <Drawer
              anchor="left"
              open={drawerOpen}
              onClose={handleDrawerToggle}
              sx={{ 
                '& .MuiDrawer-paper': { 
                  backgroundColor: 'background.paper',
                  boxSizing: 'border-box' 
                } 
              }}
            >
              {drawer}
            </Drawer>
          </Box>

          {/* Логотип */}
          <Typography
            variant="h6"
            component={RouterLink}
            to="/"
            sx={{
              fontWeight: 700,
              color: 'inherit',
              textDecoration: 'none',
              letterSpacing: '.1rem',
              mr: { xs: 0, md: 4 }
            }}
          >
            CyberPolygon
          </Typography>

          {/* Центрированное десктопное меню */}
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' }, justifyContent: 'center' }}>
            <Stack direction="row" spacing={0.5}>
              {visibleMenuItems.map((item) => (
                <Button
                  key={item.title}
                  component={RouterLink}
                  to={item.path}
                  sx={{ 
                    color: 'white', 
                    mx: 1,
                    px: 2,
                    py: 1,
                    '&:hover': {
                      bgcolor: 'rgba(255,255,255,0.1)'
                    }
                  }}
                  startIcon={item.icon}
                >
                  {item.title}
                </Button>
              ))}
            </Stack>
          </Box>

          {/* Меню пользователя (справа) */}
          <Box sx={{ flexShrink: 0, ml: { xs: 'auto', md: 2 } }}>
            {isAuthenticated ? (
              <>
                <Tooltip title="Настройки профиля">
                  <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                    <Avatar 
                      alt={user?.username || "Пользователь"} 
                      sx={{ 
                        bgcolor: 'primary.main',
                        width: 40,
                        height: 40
                      }}
                    >
                      {user?.username ? user.username[0].toUpperCase() : <AccountCircleIcon />}
                    </Avatar>
                  </IconButton>
                </Tooltip>
                <Menu
                  sx={{ mt: '45px' }}
                  id="menu-appbar"
                  anchorEl={anchorElUser}
                  keepMounted
                  anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                  }}
                  transformOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                  }}
                  open={Boolean(anchorElUser)}
                  onClose={handleCloseUserMenu}
                >
                  {userMenuItems.map((item) => (
                    <MenuItem key={item.title} onClick={item.action}>
                      <Typography textAlign="center">{item.title}</Typography>
                    </MenuItem>
                  ))}
                </Menu>
              </>
            ) : (
              <Button
                component={RouterLink}
                to="/auth"
                variant="contained"
                color="secondary"
                startIcon={<LoginIcon />}
                sx={{
                  fontWeight: 'bold',
                  borderRadius: '4px',
                  px: 2,
                  py: 0.9
                }}
              >
                Войти
              </Button>
            )}
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default Navbar; 