import React, { useState } from 'react';
import { Button, TextField, Card, CardContent, Typography, Grid, Select, MenuItem, FormControl, InputLabel, Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { addTask, deleteTask, markAsCompleted, setFilter, reorderTasks } from '../store/taskSlice';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { useNavigate } from 'react-router-dom';
import NoTask from '../assets/noTasks.jpg';
import NoChart from '../assets/charts.jpg';
import { PieChart, Pie, Cell, } from 'recharts';
import './TaskDashboard.scss';
import { CheckCircle, Delete, Edit, AddCircle, ListAlt, Assessment } from '@mui/icons-material';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';

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
      setTaskTitle('');
      setTaskDescription('');
      setTaskDueDate('');


      toast.success('Yay! Task successfully added.');
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


  const completedCount = tasks.filter(task => task.completed).length;
  const pendingCount = tasks.filter(task => !task.completed).length;

 
  const data = [
    { name: 'Completed', value: completedCount },
    { name: 'Pending', value: pendingCount },
  ];

  const normalizedData = data.map((item) => ({
    ...item,
    value: Math.round(item.value), 
  }));
  const openDeleteModal = (taskId) => {
    setTaskToDelete(taskId);
    setOpenModal(true);
  };

  const closeDeleteModal = () => {
    setOpenModal(false);
    setTaskToDelete(null);
  };

  const handleEditTask = (taskId) => {
    navigate(`/${taskId}`);
  };

  return (
    <div className="task-dashboard">
      <Typography variant="h4" gutterBottom> Task Dashboard</Typography>
      <ToastContainer />

      <div className="filter-search-container">
        <Grid container spacing={2} alignItems="center">
          <Grid item xs={12} sm={6} md={6}>
            <FormControl fullWidth margin="normal" className="filter-section" variant="outlined" sx={{ backgroundColor: 'white' }}>
              <InputLabel id="filter-tasks-label">Filter Tasks</InputLabel>
              <Select
                labelId="filter-tasks-label"
                value={filter}
                onChange={handleFilterChange}
                label="Filter Tasks"
              >
                <MenuItem value="all">All Tasks</MenuItem>
                <MenuItem value="completed">Completed Tasks</MenuItem>
                <MenuItem value="pending">Pending Tasks</MenuItem>
                <MenuItem value="overdue">Overdue Tasks</MenuItem>
              </Select>
            </FormControl>
          </Grid>

          <Grid item xs={12} sm={6} md={6}>
            <TextField
              label="Search Tasks"
              variant="outlined"
              fullWidth
              sx={{ backgroundColor: 'white' }}
              value={searchQuery}
              onChange={handleSearchChange}
              margin="normal"
              className="search-section"
            />
          </Grid>
        </Grid>
      </div>


      <Grid container spacing={2}>
        {/* Task Add Form */}
        <Grid item xs={12} sm={6} md={6}>
          <Card className="task-card " style={{ height: '100%' }}>
            <CardContent>
              <Typography variant="h6" gutterBottom style={{ display: 'flex', alignItems: 'center' }} className='card-title'>
                <AddCircle style={{ marginRight: '8px' }} />
                Add a New Task
              </Typography>

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
              <Button onClick={handleAddTask} variant="contained" color="primary" fullWidth>
                Add Task
              </Button>
            </CardContent>
          </Card>
        </Grid>

        {/* Task List */}
        <Grid item xs={12} sm={6} md={6}>
          <Card className="task-card" style={{ height: '100%' }}>
            <CardContent>
              <Typography variant="h6" gutterBottom style={{ display: 'flex', alignItems: 'center' }} className='card-title'>
                <ListAlt style={{ marginRight: '8px' }} />
                Task List ({filteredTasks.length})
              </Typography>
              {filteredTasks.length === 0 ? (
                <div className="no-tasks-message" style={{ textAlign: 'center', padding: '20px' }}>
                  <img src={NoTask} alt="No tasks" style={{ width: '250px', marginBottom: '20px' }} />
                  <Typography variant="body1">No tasks available. Please add some tasks.</Typography>
                </div>
              ) : (
                <DragDropContext onDragEnd={handleOnDragEnd}>
                  <Droppable droppableId="taskList" direction="vertical">
                    {(provided) => (
                      <div
                        ref={provided.innerRef}
                        {...provided.droppableProps}
                        style={{
                          maxHeight: '400px',
                          overflowY: 'auto',
                          paddingRight: '10px',
                          transition: 'all 0.2s ease-out',
                        }}
                        
                      >
                        {filteredTasks.map((task, index) => (
                          <Draggable key={task.id} draggableId={task.id.toString()} index={index}>
                            {(provided) => (
                              <Card
                                ref={provided.innerRef}
                                {...provided.draggableProps}
                                {...provided.dragHandleProps}
                                className=" "
                                style={{
                                  marginBottom: '10px', 
                                  ...provided.draggableProps.style, 
                                  boxSizing: 'border-box',
                                  boxShadow:'none',
                                  border:'0.5px solid #D3D3D3'
                                 
                                }}
                              >
                                <CardContent >
                                  <Typography variant="h6">{task.title}</Typography>
                                  <Typography variant="body2">{task.description}</Typography>
                                  <Typography variant="body2" color="textSecondary">{task.dueDate}</Typography>
                                  <div className="task-actions">
                                    <Button
                                      className="mark-completed"
                                      variant="contained"
                                      onClick={() => handleMarkAsCompleted(task.id)}
                                      disabled={task.completed}
                                    >
                                      <CheckCircle />
                                    </Button>

                                    <Button
                                      className="delete-task"
                                      variant="contained"
                                      onClick={() => openDeleteModal(task.id)}
                                    >
                                      <Delete />
                                    </Button>

                                    <Button
                                      className="edit-task"
                                      variant="contained"
                                      onClick={() => handleEditTask(task.id)}
                                    >
                                      <Edit />
                                    </Button>
                                  </div>
                                </CardContent>
                              </Card>
                            )}
                          </Draggable>
                        ))}
                        {provided.placeholder} {}
                      </div>
                    )}
                  </Droppable>
                </DragDropContext>
              )}
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      <Grid container spacing={2}>
        {/* Task Summary */}
        <Grid item xs={12} sm={12} md={12}>
          <Card className="task-summary-card task-card">
            <CardContent>
              <Typography variant="h6" gutterBottom style={{ display: 'flex', alignItems: 'center' }} className='card-title'>
                <Assessment style={{ marginRight: '8px' }} />
                Task Summary
              </Typography>
              {tasks.length === 0 ? (
                <div className="no-tasks-message" style={{ textAlign: 'center', padding: '20px' }}>
                  <img src={NoChart} alt="No tasks" style={{ width: '450px', marginBottom: '20px' }} />
                  <Typography variant="body1">No tasks available to summarize. Please add some tasks.</Typography>
                </div>
              ) : (
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap' }}>
                  {/* Pie Chart */}
                  <div style={{ flex: 1, minWidth: '300px', marginRight: '20px' }}>
                    <ResponsiveContainer width="100%" height={300}>
                      <PieChart>
                        <Pie data={normalizedData} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={100} fill="#8884d8">
                          <Cell fill="#82ca9d" />
                          <Cell fill="#ff7300" />
                        </Pie>
                      </PieChart>
                    </ResponsiveContainer>
                  </div>

                  {/* Bar Chart */}
                  <div style={{ flex: 1, minWidth: '300px' }}>
                    <ResponsiveContainer width="100%" height={300}>
                      <BarChart data={normalizedData} margin={{ top: 20, right: 30, left: 0, bottom: 0 }}>
                        <XAxis dataKey="name" />
                        <YAxis allowDecimals={false} />
                        <Bar dataKey="value" fill="#8884d8">
                          <Cell fill="#82ca9d" />
                          <Cell fill="#ff7300" />
                        </Bar>
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </Grid>
      </Grid>


   
      <Dialog open={openModal} onClose={closeDeleteModal}>
        <DialogTitle>Delete Task</DialogTitle>
        <DialogContent>
          <Typography variant="body1">Are you sure you want to delete this task?</Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={closeDeleteModal} color="primary">Cancel</Button>
          <Button onClick={handleDeleteTask} color="primary">Delete</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default TaskDashboard;
