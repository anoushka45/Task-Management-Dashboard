import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { TextField, Button, Card, CardContent, Typography } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { updateTask } from '../store/taskSlice';
import { AddCircle } from '@mui/icons-material';  // MUI icon import
import './TaskDetails.scss';  // Import the SCSS file

// Main Component
const TaskDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const task = useSelector((state) => state.tasks.tasks.find((task) => task.id.toString() === id));

  const [taskTitle, setTaskTitle] = useState(task?.title || '');
  const [taskDescription, setTaskDescription] = useState(task?.description || '');
  const [taskDueDate, setTaskDueDate] = useState(task?.dueDate || '');

  useEffect(() => {
    if (!task) {
      navigate('/'); // Redirect if the task doesn't exist
    }
  }, [task, navigate]);

  const handleSaveChanges = () => {
    const updatedTask = {
      id: task.id,
      title: taskTitle,
      description: taskDescription,
      dueDate: taskDueDate,
      completed: task.completed,
    };
    dispatch(updateTask(updatedTask));
    navigate('/'); // Redirect after saving
  };

  return (
    <Card className="card-container">
      <CardContent>
        <Typography variant="h5" className="card-header">
          <AddCircle className="icon" />
          Edit Task
        </Typography>
        <TextField
          className="styled-textfield"
          label="Task Title"
          value={taskTitle}
          onChange={(e) => setTaskTitle(e.target.value)}
          fullWidth
          margin="normal"
        />
        <TextField
          className="styled-textfield"
          label="Task Description"
          value={taskDescription}
          onChange={(e) => setTaskDescription(e.target.value)}
          fullWidth
          margin="normal"
        />
        <TextField
          className="styled-textfield"
          label="Due Date"
          type="date"
          value={taskDueDate}
          onChange={(e) => setTaskDueDate(e.target.value)}
          fullWidth
          margin="normal"
          InputLabelProps={{
            shrink: true,
          }}
        />
        <Button onClick={handleSaveChanges} variant="contained" className="save-button">
          Save Changes
        </Button>
      </CardContent>
    </Card>
  );
};

export default TaskDetails;
