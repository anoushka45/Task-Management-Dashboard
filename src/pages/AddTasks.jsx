// src/pages/AddTasks.jsx
import React, { useState } from 'react';
import { Button, TextField, Card, CardContent, Typography } from '@mui/material';
import { useDispatch } from 'react-redux';
import { addTask } from '../store/taskSlice';
import { useNavigate } from 'react-router-dom';

const AddTasks = () => {
  const [taskTitle, setTaskTitle] = useState('');
  const [taskDescription, setTaskDescription] = useState('');
  const [taskDueDate, setTaskDueDate] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleAddTask = () => {
    if (taskTitle && taskDescription && taskDueDate) {
      const newTask = {
        id: Date.now(),
        title: taskTitle,
        description: taskDescription,
        dueDate: taskDueDate,
        completed: false,
      };
      dispatch(addTask(newTask));
      navigate('/tasks'); // Navigate back to the task list page after adding a task
    }
  };

  return (
    <div className="add-tasks-container">
      <Typography variant="h4" gutterBottom>Add New Task</Typography>
      <Card className="add-task-card">
        <CardContent>
          <TextField
            label="Task Title"
            fullWidth
            value={taskTitle}
            onChange={(e) => setTaskTitle(e.target.value)}
            margin="normal"
          />
          <TextField
            label="Task Description"
            fullWidth
            value={taskDescription}
            onChange={(e) => setTaskDescription(e.target.value)}
            margin="normal"
          />
          <TextField
            label="Due Date"
            type="date"
            fullWidth
            value={taskDueDate}
            onChange={(e) => setTaskDueDate(e.target.value)}
            margin="normal"
            InputLabelProps={{ shrink: true }}
          />
          <Button
            onClick={handleAddTask}
            variant="contained"
            color="primary"
            fullWidth
            className="add-task-button"
            style={{ backgroundColor: '#613dc1' }}
          >
            Add Task
          </Button>

        </CardContent>
      </Card>
    </div>
  );
};

export default AddTasks;
