import React from 'react'
import { Route, Routes, useLocation } from 'react-router-dom'
import Navbar from './components/Navbar'
import Login from './components/Login'
import Signup from './components/Signup'
import Dashboard from './components/Dashboard'
import AdminDashboard from './components/AdminDashboard'
import Home from './components/Home'

const App = () => {
  const location = useLocation();
  const noNavbarRoutes = ['/dashboard', '/AdminDashboard'];

  return (
    <div>
      {!noNavbarRoutes.includes(location.pathname) && <Navbar />}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/s" element={<Signup />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/AdminDashboard" element={<AdminDashboard />} />
      </Routes>
    </div>
  )
}

export default App
