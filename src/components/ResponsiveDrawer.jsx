import React, { useState } from 'react';
import { Link, BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import MenuIcon from '@mui/icons-material/Menu';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import DashboardIcon from '@mui/icons-material/Dashboard';
import TaskIcon from '@mui/icons-material/Task';
import SettingsIcon from '@mui/icons-material/Settings';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import NotificationsIcon from '@mui/icons-material/Notifications';
import TaskDashboard from '../pages/TaskDashboard';
import TaskDetails from '../pages/TaskDetails';
import Logo from '../assets/task.svg';
import About from '../pages/About';

const drawerWidth = 240;

export default function ResponsiveDrawer() {
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const menuItems = [
    { text: 'Dashboard', icon: <DashboardIcon />, route: '/' },
    { text: 'About', icon: <TaskIcon />, route: '/about' },
  ];

  const drawer = (
    <div>
      <Toolbar />
      <Box sx={{ padding: 2, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <img src={Logo} alt="logo" style={{ width: '50%', marginBottom: 20 }} />
      </Box>

      <Divider />
      <List>
        {menuItems.map(({ text, icon, route }) => (
          <ListItem key={text} disablePadding>
            <ListItemButton component={Link} to={route}>
              <ListItemIcon>{icon}</ListItemIcon>
              <ListItemText primary={text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </div>
  );

  return (
    <Router>
      <Box sx={{ display: 'flex' }}>
        <CssBaseline />
        <AppBar
          position="fixed"
          sx={{
            zIndex: (theme) => theme.zIndex.drawer + 1,
            backgroundColor: '#613dc1',
            display: 'flex',
            justifyContent: 'space-between',
          }}
        >
          <Toolbar sx={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <IconButton
                color="inherit"
                aria-label="open drawer"
                edge="start"
                onClick={handleDrawerToggle}
                sx={{ mr: 2, display: { md: 'none' } }}
              >
                <MenuIcon />
              </IconButton>
              <Typography variant="h4" noWrap component="div">
                Task
                <span style={{ color: '#81d4fa' }}>Flow</span>
              </Typography>


            </Box>
            {/* Right-aligned icons */}
            <Box sx={{ display: 'flex', alignItems: 'center' }}>

              <IconButton color="inherit">
                <NotificationsIcon />
              </IconButton>
              <IconButton color="inherit">
                <AccountCircleIcon />
              </IconButton>
            </Box>
          </Toolbar>
        </AppBar>
        <Box
          component="nav"
          sx={{ width: { md: drawerWidth }, flexShrink: { md: 0 } }}
          aria-label="menu options"
        >
          {/* Mobile Drawer */}
          <Drawer
            variant="temporary"
            open={mobileOpen}
            onClose={handleDrawerToggle}
            ModalProps={{
              keepMounted: true,
            }}
            sx={{
              display: { xs: 'block', md: 'none' },
              '& .MuiDrawer-paper': {
                boxSizing: 'border-box',
                width: drawerWidth,
                boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.2)',
              },
            }}
          >
            {drawer}
          </Drawer>
          {/* Desktop Drawer */}
          <Drawer
            variant="permanent"
            sx={{
              display: { xs: 'none', md: 'block' },
              '& .MuiDrawer-paper': {
                boxSizing: 'border-box',
                width: drawerWidth,
                boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)',
              },
            }}
            open
          >
            {drawer}
          </Drawer>
        </Box>
        <Box
          component="main"
          sx={{
            flexGrow: 1,
            p: 3,
            width: { md: `calc(100% - ${drawerWidth}px)` },
            backgroundColor: '#fafafa',
          }}
        >
          <Toolbar />
          {/* Add Routes */}
          <Routes>
            <Route path="/" element={<TaskDashboard />} />
            <Route path="/about" element={<About />} />
            <Route path="/:id" element={<TaskDetails />} />
          </Routes>
        </Box>
      </Box>
    </Router>
  );
}
