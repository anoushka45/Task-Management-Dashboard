import React from 'react';
import { Typography, List, ListItem, ListItemText } from '@mui/material';
import styled from 'styled-components';

// Container for the main content
const Container = styled.div`
  padding: 60px;
  border-radius: 10px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  max-width: 1200px;
  margin: 20px auto;
`;

// Title Section
const SectionTitle = styled(Typography)`
  margin-bottom: 16px;
  color: #613dc1;
  font-weight: bold;
  font-size: 2.5rem;
`;

// Descriptive text
const Description = styled(Typography)`
  margin-bottom: 20px;
  font-size: 1.2rem;
  font-weight:bold;
  line-height: 1.8;
  max-width: 800px;
  text-align: justify;
`;

// Styled List and List Items
const ListContainer = styled(List)`
  padding-left: 20px;
    font-weight:bold;

`;

const ListItemStyled = styled(ListItem)`
  padding: 12px 0;
  border-bottom: 1px solid #ddd;
  &:hover {
    background-color: #e3f2fd;
    cursor: pointer;
  }
`;

const ListItemTextStyled = styled(ListItemText)`
  font-size: 1.1rem;
  color: #333;
  line-height: 1.6;
  margin-left: 20px;
  transition: color 0.3s ease;

  &:hover {
    color: #1976d2;
  }
`;

// Footer Text with a bit of spacing
const FooterText = styled(Typography)`
  margin-top: 40px;
  font-size: 1.1rem;
  color: #444;
  text-align: center;
`;

// About Component
const About = () => {
  return (
    <Container>
      <SectionTitle variant="h4" gutterBottom>
        About Task Dashboard
      </SectionTitle>

      <Description variant="h6" paragraph>
        The Task Dashboard is a comprehensive task management tool that enables users to add, edit, delete, and organize tasks with ease. This dashboard offers a range of features to streamline task management and improve productivity.
      </Description>

      <Description variant="h6" paragraph>
        Below are the main features:
      </Description>

      <ListContainer>
        <ListItemStyled>
          <ListItemTextStyled primary="1. Add a New Task" />
        </ListItemStyled>
        <ListItemStyled>
          <ListItemTextStyled
            primary="Easily add a new task by providing a title, description, and due date. Tasks are added dynamically to the task list."
          />
        </ListItemStyled>

        <ListItemStyled>
          <ListItemTextStyled primary="2. Edit Tasks" />
        </ListItemStyled>
        <ListItemStyled>
          <ListItemTextStyled
            primary="Users can edit the title, description, and due date of existing tasks, making it easy to update or correct information."
          />
        </ListItemStyled>

        <ListItemStyled>
          <ListItemTextStyled primary="3. Task Filtering and Search" />
        </ListItemStyled>
        <ListItemStyled>
          <ListItemTextStyled
            primary="Filter tasks based on their status (completed, pending, overdue) or search for tasks by their title for quick access."
          />
        </ListItemStyled>

        <ListItemStyled>
          <ListItemTextStyled primary="4. Task Reordering (Drag-and-Drop)" />
        </ListItemStyled>
        <ListItemStyled>
          <ListItemTextStyled
            primary="Tasks can be reordered using a drag-and-drop interface, enabling users to prioritize or organize tasks as needed."
          />
        </ListItemStyled>

        <ListItemStyled>
          <ListItemTextStyled primary="5. Mark as Completed" />
        </ListItemStyled>
        <ListItemStyled>
          <ListItemTextStyled
            primary="Tasks can be marked as completed to track progress, with a clear distinction between pending and completed tasks."
          />
        </ListItemStyled>

        <ListItemStyled>
          <ListItemTextStyled primary="6. Task Deletion" />
        </ListItemStyled>
        <ListItemStyled>
          <ListItemTextStyled
            primary="Users can delete tasks they no longer need, with a confirmation modal to prevent accidental deletions."
          />
        </ListItemStyled>

        <ListItemStyled>
          <ListItemTextStyled primary="7. Task Summary (Pie Chart)" />
        </ListItemStyled>
        <ListItemStyled>
          <ListItemTextStyled
            primary="The dashboard provides a summary of the task status using a pie chart, showing the number of completed and pending tasks."
          />
        </ListItemStyled>

        <ListItemStyled>
          <ListItemTextStyled primary="8. No Tasks Message" />
        </ListItemStyled>
        <ListItemStyled>
          <ListItemTextStyled
            primary="If no tasks are available, a friendly message with an image is displayed to guide users to add tasks."
          />
        </ListItemStyled>
      </ListContainer>

      <FooterText variant="body1">
        This dashboard provides an intuitive and simple interface for managing your tasks, helping you stay organized and productive.
      </FooterText>
    </Container>
  );
};

export default About;
