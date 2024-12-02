import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ResponsiveDrawer from './components/ResponsiveDrawer'; // Assuming you saved the drawer component as ResponsiveDrawer
import TaskDashboard from './pages/TaskDashboard';
import TaskDetails from './pages/TaskDetails';

const App = () => {
  return (
    <Router>
      {/* Wrap Routes with ResponsiveDrawer */}
      <ResponsiveDrawer>
        <Routes>
          <Route path="/tasks" element={<TaskDashboard />} />
          <Route path="/tasks/:id" element={<TaskDetails />} />
        </Routes>
      </ResponsiveDrawer>
    </Router>
  );
};

export default App;
