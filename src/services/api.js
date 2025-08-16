import axios from 'axios';

// 1. BASE URL CONFIGURATION
const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:8001/api/v1';

const api = axios.create({
  baseURL: API_BASE_URL,
});

// 2. REQUEST INTERCEPTOR
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('access_token');
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// 3. RESPONSE INTERCEPTOR
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('access_token');
      window.location.href = '/signin';
    }
    return Promise.reject(error);
  }
);

// 4. AUTH API ENDPOINTS
export const authAPI = {
  login: async (email, password) => {
    const params = new URLSearchParams();
    params.append('username', email);
    params.append('password', password);
    
    return api.post('/auth/login', params, {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    });
  },

  register: async (userData) => {
    return api.post('/auth/register', userData, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
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
      new_password: newPassword,
    });
    return response.data;
  },
};

// 5. USER API ENDPOINTS
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
  },
};

// 6. BARBER API ENDPOINTS
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
  },
};

export default api;