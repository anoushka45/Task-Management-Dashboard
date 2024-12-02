import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { TextField, Button, Card, CardContent, Typography } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { updateTask } from '../store/taskSlice';
import styled from 'styled-components';

// Styled Components
const CardContainer = styled(Card)`
  max-width: 600px;
  margin: 20px auto;
  padding: 20px;
  background-color: #fff;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  animation: fadeIn 0.6s ease-in-out;
`;

const CardHeader = styled(Typography)`
  font-size: 1.5rem;
  font-weight: bold;
  color: #333;
  margin-bottom: 20px;
`;

const StyledTextField = styled(TextField)`
  margin-bottom: 15px;
  border-radius: 8px;
  width: 100%;

  input {
    padding: 10px;
  }
`;

const SaveButton = styled(Button)`
  margin-top: 20px;
  background-color: #6200ea;
  color: #fff;
  border-radius: 30px;
  padding: 10px 20px;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #3700b3;
  }
`;

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
    <CardContainer>
      <CardContent>
        <CardHeader>Edit Task</CardHeader>
        <StyledTextField
          label="Task Title"
          value={taskTitle}
          onChange={(e) => setTaskTitle(e.target.value)}
          fullWidth
          margin="normal"
        />
        <StyledTextField
          label="Task Description"
          value={taskDescription}
          onChange={(e) => setTaskDescription(e.target.value)}
          fullWidth
          margin="normal"
        />
        <StyledTextField
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
        <SaveButton onClick={handleSaveChanges} variant="contained" fullWidth>
          Save Changes
        </SaveButton>
      </CardContent>
    </CardContainer>
  );
};

export default TaskDetails;
