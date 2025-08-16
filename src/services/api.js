import axios from 'axios';
import { mockAuthAPI, mockUserAPI, mockBarberAPI } from './mockAuth';

const api = axios.create({
  baseURL: 'http://localhost:8000/api', // FastAPI backend URL
});

// Check if we should use mock API (when backend is not available)
const USE_MOCK_API = process.env.NODE_ENV === 'development' || !process.env.REACT_APP_API_URL;

// Request interceptor to add authorization token
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('access_token');
  if (token) {
    config.headers['Authorization'] = `Bearer ${token}`;
  }
  return config;
});

// Response interceptor to handle token expiration
api.interceptors.response.use(
  (response) => response,
  (error) => {
    // Only handle 401 errors if not using mock API
    if (!USE_MOCK_API && error.response?.status === 401) {
      // Token expired or invalid
      localStorage.removeItem('access_token');
      localStorage.removeItem('isAuthenticated');
      localStorage.removeItem('user');
      window.location.href = '/signin';
    }
    return Promise.reject(error);
  }
);

// Authentication endpoints
export const authAPI = {
  login: async (email, password) => {
    if (USE_MOCK_API) {
      return await mockAuthAPI.login(email, password);
    }

    const formData = new FormData();
    formData.append('username', email); // FastAPI OAuth2PasswordRequestForm expects 'username'
    formData.append('password', password);

    const response = await api.post('/auth/login', formData, {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    });
    return response.data;
  },

  register: async (email, password, firstName = '', lastName = '') => {
    if (USE_MOCK_API) {
      return await mockAuthAPI.register(email, password, firstName, lastName);
    }

    const response = await api.post('/auth/register', {
      email,
      password,
      first_name: firstName,
      last_name: lastName
    });
    return response.data;
  },

  getProfile: async () => {
    if (USE_MOCK_API) {
      return await mockAuthAPI.getProfile();
    }

    const response = await api.get('/auth/me');
    return response.data;
  },

  updateProfile: async (profileData) => {
    if (USE_MOCK_API) {
      return await mockAuthAPI.updateProfile(profileData);
    }

    const response = await api.put('/auth/profile', profileData);
    return response.data;
  },

  changePassword: async (currentPassword, newPassword) => {
    if (USE_MOCK_API) {
      return await mockAuthAPI.changePassword(currentPassword, newPassword);
    }

    const response = await api.post('/auth/change-password', {
      current_password: currentPassword,
      new_password: newPassword
    });
    return response.data;
  }
};

// User endpoints
export const userAPI = {
  getAppointments: async () => {
    if (USE_MOCK_API) {
      return await mockUserAPI.getAppointments();
    }

    const response = await api.get('/appointments/my');
    return response.data;
  },

  getFavoriteBarbers: async () => {
    if (USE_MOCK_API) {
      return await mockUserAPI.getFavoriteBarbers();
    }

    const response = await api.get('/favorites');
    return response.data;
  },

  updateNotificationSettings: async (settings) => {
    if (USE_MOCK_API) {
      return await mockUserAPI.updateNotificationSettings(settings);
    }

    const response = await api.put('/user/notifications', settings);
    return response.data;
  }
};

// Barber endpoints
export const barberAPI = {
  getBarbers: async (filters = {}) => {
    if (USE_MOCK_API) {
      return await mockBarberAPI.getBarbers(filters);
    }

    const response = await api.get('/barbers', { params: filters });
    return response.data;
  },

  getBarberById: async (id) => {
    if (USE_MOCK_API) {
      return await mockBarberAPI.getBarberById(id);
    }

    const response = await api.get(`/barbers/${id}`);
    return response.data;
  },

  bookAppointment: async (barberId, appointmentData) => {
    if (USE_MOCK_API) {
      return await mockBarberAPI.bookAppointment(barberId, appointmentData);
    }

    const response = await api.post(`/barbers/${barberId}/appointments`, appointmentData);
    return response.data;
  }
};

export default api;
