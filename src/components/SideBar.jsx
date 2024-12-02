// src/components/Sidebar.jsx
import React from 'react';
import { List, ListItem, ListItemText, Drawer, Divider } from '@mui/material';
import { Link } from 'react-router-dom';
import { useMediaQuery } from '@mui/material';
import { Dashboard, Task, Settings } from '@mui/icons-material';  // Importing Material UI icons
import taskLogo from '../assets/task.svg'; // Importing task.svg from the assets folder

const Sidebar = () => {
  const isMobile = useMediaQuery('(max-width:600px)');  // Check if the screen width is less than 600px

  // Don't render the Sidebar and Menu on mobile devices
  if (isMobile) {
    return null;  // This hides the sidebar completely on small screens
  }

  return (
    <Drawer
      sx={{
        width: 240,
        flexShrink: 0,
        '& .MuiDrawer-paper': {
          width: 240,
          boxSizing: 'border-box',
          backgroundColor: '#ffffff', // Light background color for the sidebar
          color: '#333333', // Dark text color for better readability
          paddingTop: '20px',
          boxShadow: '4px 0px 10px rgba(0, 0, 0, 0.1)', // Subtle shadow for depth
        },
      }}
      variant="permanent"
      anchor="left"
    >
      {/* Logo Section */}
      <div style={{ textAlign: 'center', marginBottom: '30px' }}>
        <img
          src={taskLogo} // Replace with your actual logo path
          alt="Logo"
          style={{ width: '120px', height: 'auto' }}
        />
      </div>

      {/* Divider for better separation */}
      <Divider sx={{ backgroundColor: '#e0e0e0', marginBottom: '20px' }} />

      {/* Navigation Links */}
      <List>
        <ListItem button component={Link} to="/tasks" sx={{
          '&:hover': { backgroundColor: '#f0f0f0' },
          borderRadius: '8px', // Rounded corners for each item
          padding: '10px 20px',
        }}>
          <Dashboard sx={{ marginRight: 2, color: 'gray' }} /> {/* Default gray color for icons */}
          <ListItemText primary={<span style={{ color: 'black', fontWeight: 'bold' }}>Task Dashboard</span>} /> {/* Black and bold text */}
        </ListItem>
        <ListItem button component={Link} to="/tasks/1" sx={{
          '&:hover': { backgroundColor: '#f0f0f0' },
          borderRadius: '8px',
          padding: '10px 20px',
        }}>
          <Task sx={{ marginRight: 2, color: 'gray' }} /> {/* Default gray color for icons */}
          <ListItemText primary={<span style={{ color: 'black', fontWeight: 'bold' }}>Task Details</span>} /> {/* Black and bold text */}
        </ListItem>
        <ListItem button component={Link} to="/settings" sx={{
          '&:hover': { backgroundColor: '#f0f0f0' },
          borderRadius: '8px',
          padding: '10px 20px',
        }}>
          <Settings sx={{ marginRight: 2, color: 'gray' }} /> {/* Default gray color for icons */}
          <ListItemText primary={<span style={{ color: 'black', fontWeight: 'bold' }}>Settings</span>} /> {/* Black and bold text */}
        </ListItem>
      </List>
    </Drawer>
  );
};

export default Sidebar;
