import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './components/Login';
import Home from './pages/Home';
import Dashboard from './pages/Dashboard';
import BarberDetail from './pages/BarberDetail';

function App() {
  const [isAuthenticated, setAuth] = useState(!!localStorage.getItem('token'));

  return (
    <Router>
      <Routes>
        <Route path="/" element={isAuthenticated ? <Home /> : <Navigate to="/login" />} />
        <Route path="/login" element={<Login setAuth={setAuth} />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/barber/:id" element={<BarberDetail />} />
      </Routes>
    </Router>
  );
}

export default App;