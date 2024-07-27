import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import {
  Container, Typography, List, ListItem, ListItemText, Button, Grid, Paper, Box, AppBar, Toolbar, IconButton, Drawer, ListItemIcon, Divider,
  Dialog, DialogTitle, DialogContent, DialogActions, TextField, MenuItem
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import MessageIcon from '@mui/icons-material/Message';
import BloodtypeIcon from '@mui/icons-material/Bloodtype';

function AdminDashboard() {
  const [donors, setDonors] = useState([]);
  const [requests, setRequests] = useState([]);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [updatingDonor, setUpdatingDonor] = useState(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [newDonor, setNewDonor] = useState({
    name: '',
    age: '',
    email: '',
    phoneNumber: '',
    bloodType: '',
  });

  useEffect(() => {
    fetchDonors();
    fetchRequests();
  }, []);

  const fetchDonors = async () => {
    try {
      const res = await axios.get('http://127.0.0.1:3000/donors');
      setDonors(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  const fetchRequests = async () => {
    try {
      const res = await axios.get('http://127.0.0.1:3000/requests');
      setRequests(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  const handleStatusUpdate = async (requestId, status) => {
    try {
      const response = await axios.post(`http://127.0.0.1:3000/requests/${requestId}`, {
        status: status,
      });
      await fetchDonors();
      await fetchRequests();
      console.log('Request updated successfully:', response.data);
    } catch (error) {
      console.error('Error updating request:', error);
    }
  };

  const toggleDrawer = (open) => (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }
    setDrawerOpen(open);
  };

  const handleDialogOpen = () => {
    setDialogOpen(true);
  };

  const handleDialogClose = () => {
    setDialogOpen(false);
    setNewDonor({
      name: '',
      age: '',
      email: '',
      phoneNumber: '',
      bloodType: '',
    });
    setUpdatingDonor(null);
  };
  const handleDonorChange = (event) => {
    const { name, value } = event.target;
    if (updatingDonor) {
      setUpdatingDonor(prevState => ({ ...prevState, [name]: value }));
    } else {
      setNewDonor(prevState => ({ ...prevState, [name]: value }));
    }
  };
  const handleUpdate = (donor) => {
    setUpdatingDonor(donor);
    setDialogOpen(true);
  };
  const handleDonorSubmit = async (e) => {
    e.preventDefault();
    if (updatingDonor) {
      const response = await fetch(`http://127.0.0.1:3000/donors/${updatingDonor._id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updatingDonor),
      });
      if (response.ok) {
        const updatedDonor = await response.json();
        setDonors(donors.map(donor => donor._id === updatedDonor._id ? updatedDonor : donor));
        handleDialogClose();
      }
    } else {
    try {
      await axios.post('http://127.0.0.1:3000/donors', newDonor);
      alert('Donor added successfully');
      setNewDonor({
        name: '',
        age: '',
        email: '',
        phoneNumber: '',
        bloodType: '',
      });
      setDialogOpen(false);
      fetchDonors();
    } catch (err) {
      console.error(err);
    }}
  };

  const handleDelete = async (donorId) => {
    try {
      // Assuming you want to delete by changing the status to 'deleted'
      const response = await axios.post(`http://127.0.0.1:3000/requests/${donorId}`, {
        status: 'rejected'
      });
      await fetchDonors(); // Refresh the request list after deletion
      console.log('Request marked as deleted:', response.data);
      alert('Request marked as deleted successfully');
    } catch (error) {
      console.error('Error deleting request:', error);
      alert('Deleting request failed');
    }
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
              onClick={toggleDrawer(true)}
            >
              <MenuIcon />
            </IconButton>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              BloodAlly
            </Typography>
            <Button color="inherit" onClick={handleDialogOpen}>
              Add Donor
            </Button>
            <Button color="inherit">
              <Link to='/' style={{ textDecoration: "none", color: "white" }}>Logout</Link>
            </Button>
          </Toolbar>
        </AppBar>
      </Box>

      <Drawer
        anchor="left"
        open={drawerOpen}
        onClose={toggleDrawer(false)}
        sx={{ '& .MuiDrawer-paper': { width: 400 } }}
      >
        <Box
          sx={{ width: 400 }}
          role="presentation"
          onClick={toggleDrawer(false)}
          onKeyDown={toggleDrawer(false)}
        >
          <Typography variant="h6" sx={{ p: 2, color: '#e53935' }}>
            Request Messages
          </Typography>
          <Divider />
          <List sx={{ bgcolor: 'background.paper', borderRadius: 1 }}>
            {requests.map((request) => (
              <ListItem key={request._id} sx={{ display: 'flex', alignItems: 'center' }}>
                <ListItemIcon>
                  <MessageIcon />
                </ListItemIcon>
                <ListItemText
                  primary={`${request.name} - ${request.bloodType}`}
                  secondary={`Email: ${request.email}, Phone: ${request.phoneNumber}`}
                />
                <Box sx={{ display: 'flex', ml: 2 }}>
                  <Button
                    variant="contained"
                    color="success"
                    onClick={() => handleStatusUpdate(request._id, 'approved')}
                    sx={{ mr: 1 }}
                  >
                    Approve
                  </Button>
                  <Button
                    variant="contained"
                    color="error"
                    onClick={() => handleStatusUpdate(request._id, 'rejected')}
                  >
                    Reject
                  </Button>
                </Box>
              </ListItem>
            ))}
          </List>
        </Box>
      </Drawer>

      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Paper elevation={6} sx={{ p: 4, backgroundColor: 'rgba(255, 255, 255, 0.9)' }}>
          <Typography variant="h4" gutterBottom sx={{ color: '#e53935', display: 'flex', alignItems: 'center' }}>
            <BloodtypeIcon sx={{ fontSize: 40, mr: 2 }} />
            Admin Dashboard
          </Typography>

          <Grid container spacing={4}>
            <Grid item xs={12} md={6}>
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
                                    <Button 
                      variant="outlined" 
                      color="primary" 
                      sx={{ mr: 1 }}
                      onClick={() => handleUpdate(donor)}
                    >
                      Update
                    </Button>
                    <Button 
                      variant="outlined" 
                      color="error"
                      onClick={() => handleDelete(donor._id)}
                    >
                      Delete
                    </Button>
                  </ListItem>
                ))}
              </List>
            </Grid>
          </Grid>
        </Paper>
      </Container>

      <Dialog open={dialogOpen} onClose={handleDialogClose}>
  <DialogTitle>{updatingDonor ? 'Update Donor' : 'Add New Donor'}</DialogTitle>
  <DialogContent>
    <form onSubmit={handleDonorSubmit}>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <TextField
            required
            fullWidth
            id="name"
            label="Name"
            name="name"
            value={updatingDonor ? updatingDonor.name : newDonor.name}
            onChange={handleDonorChange}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            required
            fullWidth
            id="age"
            label="Age"
            name="age"
            type="number"
            value={updatingDonor ? updatingDonor.age : newDonor.age}
            onChange={handleDonorChange}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            required
            fullWidth
            id="email"
            label="Email"
            name="email"
            value={updatingDonor ? updatingDonor.email : newDonor.email}
            onChange={handleDonorChange}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            required
            fullWidth
            id="phoneNumber"
            label="Phone Number"
            name="phoneNumber"
            value={updatingDonor ? updatingDonor.phoneNumber : newDonor.phoneNumber}
            onChange={handleDonorChange}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            required
            fullWidth
            id="bloodType"
            label="Blood Type"
            name="bloodType"
            value={updatingDonor ? updatingDonor.bloodType : newDonor.bloodType}
            onChange={handleDonorChange}
          />
        </Grid>
      </Grid>
    </form>
  </DialogContent>
  <DialogActions>
    <Button onClick={handleDialogClose}>Cancel</Button>
    <Button onClick={handleDonorSubmit} variant="contained" sx={{ 
      backgroundColor: '#e53935',
      '&:hover': {
        backgroundColor: '#c62828',
      },
    }}>
      {updatingDonor ? 'Update Donor' : 'Add Donor'}
    </Button>
  </DialogActions>
</Dialog>
    </Box>
  );
}

export default AdminDashboard;