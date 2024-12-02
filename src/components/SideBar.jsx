import React from 'react';
import { Link } from 'react-router-dom';
import './Sidebar.css';

const Sidebar = () => {
  return (
    <div className="sidebar">
      <ul>
        <li>
          <Link to="/tasks">Dashboard</Link>
        </li>
        <li>
          <Link to="/tasks/1">Task Details</Link>
        </li>
        {/* Add more sidebar links here */}
      </ul>
    </div>
  );
};

export default Sidebar;
