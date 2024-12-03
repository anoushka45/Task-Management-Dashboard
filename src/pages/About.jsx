import React from 'react';
import { Typography } from '@mui/material';
import styled from 'styled-components';
import { Card, CardContent,useMediaQuery, useTheme } from '@mui/material';


const Container = styled.div`
  padding: 60px;
  border-radius: 10px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  max-width: 1200px;
  background-color: #ffffff;
  margin: 20px auto;
`;


const SectionTitle = styled(Typography)`
  margin-bottom: 16px;
  color: #613dc1;
  font-weight: bold;
  font-size: 2.5rem;
`;


const Description = styled(Typography)`
  margin-bottom: 20px;
  font-size: 1.2rem;
  font-weight:bold;
  line-height: 1.8;
  max-width: 800px;
  text-align: justify;
`;


const FooterText = styled(Typography)`
  margin-top: 40px;
  font-size: 1.1rem;
  color: #444;
  text-align: center;
`;



const tasks = [
  { title: "1. Add a New Task", description: "Easily add a new task by providing a title, description, and due date. Tasks are added dynamically to the task list." },
  { title: "2. Edit Tasks", description: "Users can edit the title, description, and due date of existing tasks, making it easy to update or correct information." },
  { title: "3. Task Filtering and Search", description: "Filter tasks based on their status (completed, pending, overdue) or search for tasks by their title for quick access." },
  { title: "4. Task Reordering (Drag-and-Drop)", description: "Tasks can be reordered using a drag-and-drop interface, enabling users to prioritize or organize tasks as needed." },
  { title: "5. Mark as Completed", description: "Tasks can be marked as completed to track progress, with a clear distinction between pending and completed tasks." },
  { title: "6. Task Deletion", description: "Users can delete tasks they no longer need, with a confirmation modal to prevent accidental deletions." },
  { title: "7. Task Summary (Pie Chart)", description: "The dashboard provides a summary of the task status using a pie chart, showing the number of completed and pending tasks." },
  { title: "8. No Tasks Message", description: "If no tasks are available, a friendly message with an image is displayed to guide users to add tasks." },
];

const About = () => {
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm')); 
  return (
    <Container>
       <Typography
        variant={isSmallScreen ? 'h5' : 'h4'} 
        gutterBottom
style={{fontWeight:"bold"}}

      >
        About Task Dashboard
      </Typography>

      <Typography
        variant={isSmallScreen ? 'body1' : 'h6'}
        paragraph
        style={{color:"#613DC1"}}
      >
        The Task Dashboard is a comprehensive task management tool that enables users to add, edit, delete, and organize tasks with ease. This dashboard offers a range of features to streamline task management and improve productivity.
      </Typography>

      <Description variant="h6" paragraph>
        Below are the main features:
      </Description>
      {tasks.map((task, index) => (
        <Card key={index} sx={{ marginBottom: 2, boxShadow: 3 }}>
          <CardContent>
            <Typography variant="h6" gutterBottom>
              {task.title}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {task.description}
            </Typography>
          </CardContent>
        </Card>
      ))}

      <FooterText variant="body1">
        This dashboard provides an intuitive and simple interface for managing your tasks, helping you stay organized and productive.
      </FooterText>
    </Container>
  );
};

export default About;
