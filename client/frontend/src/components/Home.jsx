import React from 'react';
import { Container, Typography, Button, Box, ThemeProvider, createTheme } from '@mui/material';
import { Link } from 'react-router-dom';
import BloodtypeIcon from '@mui/icons-material/Bloodtype';

const theme = createTheme({
  palette: {
    primary: {
      main: '#e53935', // A deep red color
    },
    secondary: {
      main: '#ffffff', // White
    },
  },
});

const Home = () => {
  return (
    <ThemeProvider theme={theme}>
      <Box
        sx={{
          height: '100vh',
          backgroundImage: 'url(https://ibb.co/Fg6vwRb)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          textAlign: 'center',
          color: 'white',
          position: 'relative',
          '&::before': {
            content: '""',
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(0, 0, 0, 0.5)', // Semi-transparent overlay
          },
        }}
      >
        <Container maxWidth="md" sx={{ position: 'relative', zIndex: 1 }}>
          <BloodtypeIcon sx={{ fontSize: 80, mb: 4 }} />
          <Typography variant="h2" component="h1" gutterBottom>
            Welcome to BloodAlly
          </Typography>
          <Typography variant="h5" gutterBottom>
            Your local blood bank management system
          </Typography>
          <Box sx={{ mt: 4 }}>
            <Button
              component={Link}
              to="/login"
              variant="contained"
              color="primary"
              size="large"
              sx={{ mr: 2 }}
            >
              Login
            </Button>
            <Button
              component={Link}
              to="/s"
              variant="outlined"
              color="secondary"
              size="large"
            >
              Sign Up
            </Button>
          </Box>
        </Container>
      </Box>
    </ThemeProvider>
  );
};

export default Home;