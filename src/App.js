import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { LanguageProvider } from './contexts/LanguageContext';
import Login from './components/Login';
import Home from './pages/Home';
import Dashboard from './pages/Dashboard';
import BarberDetail from './pages/BarberDetail';
import Services from './pages/Services';
import Offers from './pages/Offers';
import About from './pages/About';
import Company from './pages/Company';
import Support from './pages/Support';

// Booksy-inspired color scheme
const theme = createTheme({
  palette: {
    primary: {
      main: '#00a693', // Booksy's signature teal
      light: '#4fd5c7',
      dark: '#007562',
    },
    secondary: {
      main: '#ff6b35', // Complementary orange
      light: '#ff9d70',
      dark: '#c63f00',
    },
    background: {
      default: '#f8fffe',
      paper: '#ffffff',
    },
    success: {
      main: '#00a693',
    },
    warning: {
      main: '#ff6b35',
    },
  },
  typography: {
    fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
    h1: {
      fontWeight: 700,
    },
    h2: {
      fontWeight: 700,
    },
    h3: {
      fontWeight: 600,
    },
    h4: {
      fontWeight: 600,
    },
    h5: {
      fontWeight: 600,
    },
    h6: {
      fontWeight: 600,
    },
  },
  shape: {
    borderRadius: 12,
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none',
          borderRadius: 8,
          fontWeight: 600,
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 16,
          boxShadow: '0 4px 20px rgba(0, 166, 147, 0.08)',
        },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          backgroundColor: '#ffffff',
          color: '#1f2937',
        },
      },
    },
  },
});

function App() {
  const [isAuthenticated, setAuth] = useState(true); // Temporarily set to true to show homepage

  return (
    <LanguageProvider>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Router>
        <Routes>
          <Route 
            path="/" 
            element={<Home />} 
          />
          <Route 
            path="/login" 
            element={<Login setAuth={setAuth} />} 
          />
          <Route 
            path="/dashboard" 
            element={<Dashboard />} 
          />
          <Route 
            path="/barber/:id" 
            element={<BarberDetail />} 
          />
          <Route 
            path="/services" 
            element={<Services />} 
          />
          <Route 
            path="/offers" 
            element={<Offers />} 
          />
          <Route 
            path="/about" 
            element={<About />} 
          />
          <Route 
            path="/company" 
            element={<Company />} 
          />
          <Route 
            path="/support" 
            element={<Support />} 
          />
        </Routes>
        </Router>
      </ThemeProvider>
    </LanguageProvider>
  );
}

export default App;
