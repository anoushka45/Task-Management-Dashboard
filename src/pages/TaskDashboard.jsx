import React, { useState } from 'react';
import { Button, TextField, Card, CardContent, Typography, Grid, Select, MenuItem, FormControl, InputLabel, Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { addTask, deleteTask, markAsCompleted, setFilter, reorderTasks } from '../store/taskSlice';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { useNavigate } from 'react-router-dom';

const TaskDashboard = () => {
  const [taskTitle, setTaskTitle] = useState('');
  const [taskDescription, setTaskDescription] = useState('');
  const [taskDueDate, setTaskDueDate] = useState('');
  const [openModal, setOpenModal] = useState(false);
  const [taskToDelete, setTaskToDelete] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');

  const tasks = useSelector((state) => state.tasks.tasks);
  const filter = useSelector((state) => state.tasks.filter);
  const dispatch = useDispatch();
  const navigate = useNavigate(); // for navigation

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
      setTaskTitle('');
      setTaskDescription('');
      setTaskDueDate('');
    }
  };

  const handleDeleteTask = () => {
    if (taskToDelete !== null) {
      dispatch(deleteTask(taskToDelete));
      setOpenModal(false);
      setTaskToDelete(null);
    }
  };

  const handleMarkAsCompleted = (taskId) => {
    dispatch(markAsCompleted(taskId));
  };

  const handleFilterChange = (event) => {
    dispatch(setFilter(event.target.value));
  };

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const handleOnDragEnd = (result) => {
    const { destination, source } = result;
    if (!destination) return;

    if (destination.index === source.index) return;

    const reorderedTasks = Array.from(tasks);
    const [movedTask] = reorderedTasks.splice(source.index, 1);
    reorderedTasks.splice(destination.index, 0, movedTask);

    dispatch(reorderTasks(reorderedTasks));
  };

  const filteredTasks = tasks.filter((task) => {
    if (filter === 'completed') return task.completed;
    if (filter === 'pending') return !task.completed;
    if (filter === 'overdue') return new Date(task.dueDate) < new Date();
    return task.title.toLowerCase().includes(searchQuery.toLowerCase());
  });

  const openDeleteModal = (taskId) => {
    setTaskToDelete(taskId);
    setOpenModal(true);
  };

  const closeDeleteModal = () => {
    setOpenModal(false);
    setTaskToDelete(null);
  };

  const handleEditTask = (taskId) => {
    navigate(`/tasks/${taskId}`); // Navigate to task details page
  };

  return (
    <div>
      <Typography variant="h4" gutterBottom>Task Management Dashboard</Typography>

      <FormControl fullWidth margin="normal">
        <InputLabel>Filter Tasks</InputLabel>
        <Select value={filter} onChange={handleFilterChange}>
          <MenuItem value="all">All Tasks</MenuItem>
          <MenuItem value="completed">Completed Tasks</MenuItem>
          <MenuItem value="pending">Pending Tasks</MenuItem>
          <MenuItem value="overdue">Overdue Tasks</MenuItem>
        </Select>
      </FormControl>

      <TextField
        label="Search Tasks"
        variant="outlined"
        fullWidth
        value={searchQuery}
        onChange={handleSearchChange}
        margin="normal"
      />

      <Grid container spacing={2}>
        <Grid item xs={12} sm={6}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>Add a New Task</Typography>
              <TextField label="Task Title" fullWidth value={taskTitle} onChange={(e) => setTaskTitle(e.target.value)} margin="normal" />
              <TextField label="Task Description" fullWidth value={taskDescription} onChange={(e) => setTaskDescription(e.target.value)} margin="normal" />
              <TextField label="Due Date" type="date" fullWidth value={taskDueDate} onChange={(e) => setTaskDueDate(e.target.value)} margin="normal" InputLabelProps={{ shrink: true }} />
              <Button onClick={handleAddTask} variant="contained" color="primary" fullWidth>Add Task</Button>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>Task List</Typography>

              <DragDropContext onDragEnd={handleOnDragEnd}>
                <Droppable droppableId="taskList">
                  {(provided) => (
                    <div ref={provided.innerRef} {...provided.droppableProps}>
                      {filteredTasks.map((task, index) => (
                        <Draggable key={task.id} draggableId={task.id.toString()} index={index}>
                          {(provided) => (
                            <Card ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps} sx={{ marginBottom: 2 }} key={task.id}>
                              <CardContent>
                                <Typography variant="h6">{task.title}</Typography>
                                <Typography variant="body2">{task.description}</Typography>
                                <Typography variant="caption" color="textSecondary">Due: {task.dueDate}</Typography>
                                <div style={{ marginTop: '10px' }}>
                                  <Button variant="contained" color="secondary" onClick={() => handleMarkAsCompleted(task.id)} disabled={task.completed}>
                                    {task.completed ? 'Completed' : 'Mark as Completed'}
                                  </Button>
                                  <Button variant="outlined" color="error" onClick={() => openDeleteModal(task.id)} style={{ marginLeft: '10px' }}>Delete</Button>
                                  <Button variant="outlined" color="primary" onClick={() => handleEditTask(task.id)} style={{ marginLeft: '10px' }}>Edit</Button>
                                </div>
                              </CardContent>
                            </Card>
                          )}
                        </Draggable>
                      ))}
                      {provided.placeholder}
                    </div>
                  )}
                </Droppable>
              </DragDropContext>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      <Dialog open={openModal} onClose={closeDeleteModal}>
        <DialogTitle>Confirm Deletion</DialogTitle>
        <DialogContent>
          <Typography>Are you sure you want to delete this task?</Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={closeDeleteModal} color="primary">Cancel</Button>
          <Button onClick={handleDeleteTask} color="secondary">Delete</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default TaskDashboard;
