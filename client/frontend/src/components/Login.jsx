import React, { useState } from 'react';
import { Container, Typography, TextField, Button, Box, Paper } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import BloodtypeIcon from '@mui/icons-material/Bloodtype';
import axios from 'axios';

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    axios.post("http://127.0.0.1:3000/auth/login", { email, password })
      .then((res) => {
        console.log("res", res.data.user);
        localStorage.setItem("userId", res.data.user.id);
        alert("Login successful");
        if (res.data.user.role === "admin") {
          navigate('/AdminDashboard');
        } else {
          navigate('/dashboard');
        }
      })
      .catch((err) => {
        console.log(err);
        alert("Login failed. Please check your credentials.");
      });
  };

  return (
    <Box
      sx={{
        minHeight: 'calc(100vh - 64px)', // Subtract navbar height
        paddingTop: '64px', // Add padding equal to navbar height
        backgroundImage: 'url(https://wallpapercave.com/wp/wp2159355.jpg)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
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
      <Container component="main" maxWidth="xs" sx={{ position: 'relative', zIndex: 1 }}>
        <Paper elevation={6} sx={{ p: 4, display: 'flex', flexDirection: 'column', alignItems: 'center', backgroundColor: 'rgba(255, 255, 255, 0.9)' }}>
          <BloodtypeIcon sx={{ color: '#e53935', fontSize: 48, mb: 2 }} />
          <Typography component="h1" variant="h5" sx={{ color: '#e53935' }} gutterBottom>
            Login to BloodAlly
          </Typography>
          <Box component="form" noValidate sx={{ mt: 1, width: '100%' }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <Button
              type="button"
              fullWidth
              variant="contained"
              sx={{ 
                mt: 3, 
                mb: 2, 
                backgroundColor: '#e53935',
                '&:hover': {
                  backgroundColor: '#c62828',
                },
              }}
              onClick={handleLogin}
            >
              Sign In
            </Button>
            <Box sx={{ textAlign: 'center', mt: 2 }}>
              <Link to="/s" style={{ color: '#e53935', textDecoration: 'none' }}>
                Don't have an account? Sign Up
              </Link>
            </Box>
          </Box>
        </Paper>
      </Container>
    </Box>
  );
};

export default Login;