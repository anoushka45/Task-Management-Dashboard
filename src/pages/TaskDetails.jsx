import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { TextField, Button, Card, CardContent, Typography } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { updateTask } from '../store/taskSlice';

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
    navigate('/tasks'); // Redirect after saving
  };

  return (
    <Card>
      <CardContent>
        <Typography variant="h6">Edit Task</Typography>
        <TextField
          label="Task Title"
          value={taskTitle}
          onChange={(e) => setTaskTitle(e.target.value)}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Task Description"
          value={taskDescription}
          onChange={(e) => setTaskDescription(e.target.value)}
          fullWidth
          margin="normal"
        />
        <TextField
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
        <Button onClick={handleSaveChanges} variant="contained" color="primary" fullWidth style={{ marginTop: '10px' }}>
          Save Changes
        </Button>
      </CardContent>
    </Card>
  );
};

export default TaskDetails;
