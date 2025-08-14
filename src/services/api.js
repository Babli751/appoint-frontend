import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:8000/api', // FastAPI backend URL
});

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
    if (error.response?.status === 401) {
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
    const response = await api.post('/auth/register', {
      email,
      password,
      first_name: firstName,
      last_name: lastName
    });
    return response.data;
  },

  getProfile: async () => {
    const response = await api.get('/auth/me');
    return response.data;
  },

  updateProfile: async (profileData) => {
    const response = await api.put('/auth/profile', profileData);
    return response.data;
  },

  changePassword: async (currentPassword, newPassword) => {
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
    const response = await api.get('/appointments/my');
    return response.data;
  },

  getFavoriteBarbers: async () => {
    const response = await api.get('/favorites');
    return response.data;
  },

  updateNotificationSettings: async (settings) => {
    const response = await api.put('/user/notifications', settings);
    return response.data;
  }
};

// Barber endpoints
export const barberAPI = {
  getBarbers: async (filters = {}) => {
    const response = await api.get('/barbers', { params: filters });
    return response.data;
  },

  getBarberById: async (id) => {
    const response = await api.get(`/barbers/${id}`);
    return response.data;
  },

  bookAppointment: async (barberId, appointmentData) => {
    const response = await api.post(`/barbers/${barberId}/appointments`, appointmentData);
    return response.data;
  }
};

export default api;
