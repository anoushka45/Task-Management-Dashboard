// src/App.jsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import TaskDashboard from './pages/TaskDashboard';
import TaskDetails from './pages/TaskDetails';
import Sidebar from './components/SideBar';
import ResponsiveAppBar from './components/Navbar';
import { CssBaseline, Box, Container } from '@mui/material';

const App = () => {
  return (
    <Router>
      <CssBaseline />
      <ResponsiveAppBar />
      <Box sx={{ display: 'flex' }}>
        <Sidebar />
        <Container sx={{ flexGrow: 1, marginTop: '64px', padding: '24px' }}>
          <Routes>
            <Route path="/tasks" element={<TaskDashboard />} />
            <Route path="/tasks/:id" element={<TaskDetails />} />
          </Routes>
        </Container>
      </Box>
    </Router>
  );
};

export default App;
