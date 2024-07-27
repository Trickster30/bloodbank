import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { Container, Typography, List, ListItem, ListItemText, TextField, Button, Grid, MenuItem, Paper, Box, AppBar, Toolbar, IconButton, Dialog, DialogTitle, DialogContent, DialogActions } from '@mui/material';
import BloodtypeIcon from '@mui/icons-material/Bloodtype';

function Dashboard() {
  const [donors, setDonors] = useState([]);
  const [openDialog, setOpenDialog] = useState(false);
  const [userRequests, setUserRequests] = useState([]);
  const [request, setRequest] = useState({
    userId: localStorage.getItem('userId'),
    name: '',
    age: '',
    email: '',
    phoneNumber: '',
    bloodType: '',
    requestCategory: 'donor',
    ailments: '',
    unitsRequired: 0,
  });
  const fetchUserRequests = async () => {
    const userId = localStorage.getItem('userId'); // Get userId from local storage
    if (!userId) {
      console.error('User ID not found in local storage');
      return;
    }
    try {
      const response = await fetch(`http://127.0.0.1:3000/requests/user/${userId}`);
      if (response.ok) {
        const data = await response.json();
        setUserRequests(data);
      }
    } catch (error) {
      console.error('Error fetching user requests:', error);
    }
  };
  const getStatusColor = (status) => {
    switch (status) {
      case 'approved':
        return '#e8f5e9';  // light green
      case 'rejected':
        return '#ffebee';  // light red
      case 'pending':
      default:
        return '#e3f2fd';  // light blue
    }
  };
  useEffect(() => {
 
  
    fetchUserRequests();
    fetchDonors();
  }, []);

  const fetchDonors = async () => {
    try {
      const res = await axios.get('http://127.0.0.1:3000/donors');
      setDonors(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  const handleChange = (e) => {
    setRequest({ ...request, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://127.0.0.1:3000/requests', request);
      alert('Request submitted successfully');
      setRequest({
        name: '',
        age: '',
        userId: localStorage.getItem('userId'),
        email: '',
        phoneNumber: '',
        bloodType: '',
        requestCategory: 'donor',
        ailments: '',
        unitsRequired: 0,
      });
      setOpenDialog(false);
      fetchUserRequests();
    } catch (err) {
      console.error(err);
    }
  };

  const handleOpenDialog = () => {
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  return (
    <Box
      sx={{
        minHeight: '100vh',
        backgroundImage: 'url(https://wallpapercave.com/wp/wp2159355.jpg)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed',
      }}
    >
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static" style={{ backgroundColor: 'red' }}>
          <Toolbar>
            <IconButton
              size="large"
              edge="start"
              color="inherit"
              aria-label="menu"
              sx={{ mr: 2 }}
            >
              <BloodtypeIcon />
            </IconButton>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              BloodAlly
            </Typography>
            <Button color="inherit" onClick={handleOpenDialog}>
              Submit Request
            </Button>
            <Button color="inherit">
              <Link to='/' style={{ textDecoration: "none", color: "white" }}>Logout</Link>
            </Button>
          </Toolbar>
        </AppBar>
      </Box>

      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Paper elevation={6} sx={{ p: 4, backgroundColor: 'rgba(255, 255, 255, 0.9)' }}>
          <Typography variant="h4" gutterBottom sx={{ color: '#e53935', display: 'flex', alignItems: 'center' }}>
            <BloodtypeIcon sx={{ fontSize: 40, mr: 2 }} />
            Donor Dashboard
          </Typography>
          
          <Grid container spacing={4}>
            <Grid item xs={12}>
              <Typography variant="h6" gutterBottom sx={{ color: '#e53935' }}>
                Available Donors
              </Typography>
              <List sx={{ bgcolor: 'background.paper', borderRadius: 1 }}>
                {donors.map((donor) => (
                  <ListItem key={donor._id}>
                    <ListItemText
                      primary={`${donor.name} - ${donor.bloodType}`}
                      secondary={`Email: ${donor.email}, Phone: ${donor.phoneNumber}`}
                    />
                  </ListItem>
                ))}
              </List>
            </Grid>
          </Grid>
          <Paper elevation={3} sx={{ p: 2, mt: 4 }}>
  <Typography variant="h6" gutterBottom>
    My Requests
  </Typography>
  <List>
    {userRequests.map((request) => (
      <ListItem 
        key={request._id} 
        sx={{ 
          mb: 2, 
          backgroundColor: getStatusColor(request.status),
          borderRadius: 1,
          flexDirection: 'column',
          alignItems: 'flex-start'
        }}
      >
        <ListItemText
          primary={
            <Typography variant="subtitle1" fontWeight="bold">
              {request.name} - {request.bloodType}
            </Typography>
          }
          secondary={
            <>
              <Typography component="span" variant="body2">
                Status: <span style={{fontWeight: 'bold'}}>{request.status}</span>
              </Typography>
              <br />
              <Typography component="span" variant="body2">
                Age: {request.age}
              </Typography>
              <br />
              <Typography component="span" variant="body2">
                Email: {request.email}
              </Typography>
              <br />
              <Typography component="span" variant="body2">
                Phone: {request.phoneNumber}
              </Typography>
              {request.ailments && (
                <>
                  <br />
                  <Typography component="span" variant="body2">
                    Ailments: {request.ailments}
                  </Typography>
                </>
              )}
              {request.unitsRequired > 0 && (
                <>
                  <br />
                  <Typography component="span" variant="body2">
                    Units Required: {request.unitsRequired}
                  </Typography>
                </>
              )}
              <br />
              <Typography component="span" variant="body2" color="text.secondary">
                Requested on: {new Date(request.createdAt).toLocaleDateString()}
              </Typography>
         
            </>
          }
        />
      </ListItem>
    ))}
  </List>
</Paper>
        </Paper>
      </Container>

      <Dialog open={openDialog} onClose={handleCloseDialog}>
        <DialogTitle>Submit Request</DialogTitle>
        <DialogContent>
          <form onSubmit={handleSubmit}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  id="name"
                  label="Name"
                  name="name"
                  value={request.name}
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  id="age"
                  label="Age"
                  name="age"
                  type="number"
                  value={request.age}
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="email"
                  label="Email"
                  name="email"
                  value={request.email}
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="phoneNumber"
                  label="Phone"
                  name="phoneNumber"
                  value={request.phoneNumber}
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  id="bloodType"
                  label="Blood Type"
                  name="bloodType"
                  value={request.bloodType}
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  select
                  name="requestCategory"
                  label="Category"
                  value={request.requestCategory}
                  onChange={handleChange}
                >
                  <MenuItem value="donor">Donor</MenuItem>
                  <MenuItem value="receiver">Receiver</MenuItem>
                </TextField>
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  id="ailments"
                  label="Ailments (comma-separated)"
                  name="ailments"
                  value={request.ailments}
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  id="unitsRequired"
                  label="Units Required"
                  name="unitsRequired"
                  type="number"
                  value={request.unitsRequired}
                  onChange={handleChange}
                />
              </Grid>
            </Grid>
          </form>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>Cancel</Button>
          <Button onClick={handleSubmit} variant="contained" sx={{ 
            backgroundColor: '#e53935',
            '&:hover': {
              backgroundColor: '#c62828',
            },
          }}>
            Submit
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}

export default Dashboard;