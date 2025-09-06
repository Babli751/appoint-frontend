import axios from 'axios';

// 1. BASE URL CONFIGURATION
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8001/api/v1';
const USE_MOCK_API = process.env.NEXT_PUBLIC_USE_MOCK_API === 'true';

const api = axios.create({
  baseURL: API_BASE_URL,
});

// 2. REQUEST INTERCEPTOR
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('access_token') || localStorage.getItem('businessToken');
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
      localStorage.removeItem('businessToken');
      window.location.href = '/signin';
    }
    return Promise.reject(error);
  }
);

// 4. AUTH API ENDPOINTS
export const authAPI = {
  login: async (email, password) => {
    const formData = new URLSearchParams();
    formData.append('username', email);
    formData.append('password', password);
    
    const response = await api.post('/auth/login', formData, {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    });
    return response.data;
  },

  register: async (userData) => {
    const response = await api.post('/auth/register', userData);
    return response.data;
  },

  getProfile: async () => {
    const response = await api.get('/users/me');
    return response.data;
  },

  updateProfile: async (profileData) => {
    const response = await api.put('/users/me', profileData);
    return response.data;
  },

  changePassword: async (passwordData) => {
    const response = await api.put('/users/me', passwordData);
    return response.data;
  },
};

// 5. USER API ENDPOINTS
export const userAPI = {
  getAppointments: async () => {
    const response = await api.post('/appointments');
    return response.data;
  },

  getFavoriteBarbers: async () => {
    const response = await api.get('/favorites');
    return response.data;
  },

  updateNotificationSettings: async (settings) => {
    const response = await api.put('/users/notifications', settings);
    return response.data;
  },
};

// 6. PROFILE API ENDPOINTS
export const profileApi = {
  getUserStats: async () => {
    const response = await api.get('/users/stats');
    return response.data;
  },

  uploadAvatar: async (formData) => {
    const response = await api.post('/users/avatar', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  },
};

// 7. BARBER API ENDPOINTS
export const barberAPI = {
  login: async (email, password) => {
    const formData = new URLSearchParams();
    formData.append('username', email);
    formData.append('password', password);

    const response = await api.post('/auth/login', formData, {
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
    });
    return response.data;
  },

  register: async (barberData) => {
    const response = await api.post('/auth/register', barberData, {
      headers: { 'Content-Type': 'application/json' }
    });
    return response.data;
  },

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

// 8. BUSINESS API ENDPOINTS
export const businessAPI = {
  signup: async (businessData) => {
    const response = await api.post('/business/signup', businessData, {
      headers: { 'Content-Type': 'application/json' }
    });
    return response.data;
  },

  login: async (email, password) => {
    const response = await api.post('/business/login', {
      email: email,
      password: password
    }, {
      headers: { 'Content-Type': 'application/json' }
    });
    return response.data;
  }
};

export default api;
