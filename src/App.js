import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { LanguageProvider } from './contexts/LanguageContext';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import Login from './components/Login';
import Home from './pages/Home';
import Dashboard from './pages/Dashboard';
import BarberDetail from './pages/BarberDetail';
import Services from './pages/Services';
import Offers from './pages/Offers';
import About from './pages/About';
import Company from './pages/Company';
import Support from './pages/Support';
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';
import Profile from './pages/Profile';
import Favorites from './pages/Favorites';
import Settings from './pages/Settings';
import BusinessSignup from './pages/BusinessSignup';
import BusinessDashboard from './pages/BusinessDashboard';

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
  return (
    <LanguageProvider>
      <AuthProvider>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <Router>
            <AuthAwareRoutes />
          </Router>
        </ThemeProvider>
      </AuthProvider>
    </LanguageProvider>
  );
}

// Separate component to access authentication context
function AuthAwareRoutes() {
  const { isAuthenticated } = useAuth();

  return (
    <Routes>
      <Route
        path="/"
        element={<Home />}
      />
      <Route
        path="/login"
        element={<Login />}
      />
      <Route
        path="/signin"
        element={<SignIn />}
      />
      <Route
        path="/signup"
        element={<SignUp />}
      />
      <Route
        path="/dashboard"
        element={isAuthenticated ? <Dashboard /> : <Navigate to="/signin" />}
      />
      <Route
        path="/profile"
        element={isAuthenticated ? <Profile /> : <Navigate to="/signin" />}
      />
      <Route
        path="/favorites"
        element={isAuthenticated ? <Favorites /> : <Navigate to="/signin" />}
      />
      <Route
        path="/settings"
        element={isAuthenticated ? <Settings /> : <Navigate to="/signin" />}
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
  );
}

export default App;
