import { debug } from '../utils/debug';

// Mock authentication service for frontend-only demo
const MOCK_USERS = [
  {
    id: 1,
    email: 'demo@barberpro.com',
    password: 'password123',
    first_name: 'Demo',
    last_name: 'User',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face',
    is_active: true,
    created_at: '2024-01-01T00:00:00Z',
    total_appointments: 5,
    favorite_barbers_count: 3,
    phone: '+1234567890',
    birth_date: '1990-01-01',
    address: 'Demo Address, Demo City'
  },
  {
    id: 2,
    email: 'test@test.com',
    password: '123456',
    first_name: 'Test',
    last_name: 'User',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face',
    is_active: true,
    created_at: '2024-01-01T00:00:00Z',
    total_appointments: 3,
    favorite_barbers_count: 2,
    phone: '+1234567891',
    birth_date: '1985-05-15',
    address: 'Test Address, Test City'
  }
];

// Simulate network delay
const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

export const mockAuthAPI = {
  login: async (email, password) => {
    await delay(500); // Simulate network delay

    // Trim whitespace and convert to lowercase for email comparison
    const trimmedEmail = email.trim().toLowerCase();
    const trimmedPassword = password.trim();

    debug.log('Mock login attempt:', { email: trimmedEmail, password: trimmedPassword });
    debug.log('Available users:', MOCK_USERS.map(u => ({ email: u.email, password: u.password })));

    const user = MOCK_USERS.find(u =>
      u.email.toLowerCase() === trimmedEmail && u.password === trimmedPassword
    );

    if (!user) {
      debug.error('Login failed - user not found');
      throw new Error('Invalid email or password');
    }

    debug.log('Login successful for user:', user.email);
    return {
      access_token: `mock_token_${Date.now()}`,
      token_type: 'bearer'
    };
  },

  register: async (email, password, firstName = '', lastName = '') => {
    await delay(500);

    // Trim whitespace and normalize email
    const trimmedEmail = email.trim().toLowerCase();
    const trimmedPassword = password.trim();

    debug.log('Mock register attempt:', { email: trimmedEmail, firstName, lastName });

    // Check if user already exists
    const existingUser = MOCK_USERS.find(u => u.email.toLowerCase() === trimmedEmail);
    if (existingUser) {
      throw new Error('Email already exists');
    }
    
    // Add new user to mock database
    const newUser = {
      id: MOCK_USERS.length + 1,
      email: trimmedEmail,
      password: trimmedPassword,
      first_name: firstName.trim(),
      last_name: lastName.trim(),
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face',
      is_active: true,
      created_at: new Date().toISOString(),
      total_appointments: 0,
      favorite_barbers_count: 0,
      phone: '',
      birth_date: '',
      address: ''
    };
    
    MOCK_USERS.push(newUser);
    
    return {
      id: newUser.id,
      email: newUser.email,
      message: 'User registered successfully'
    };
  },

  getProfile: async () => {
    await delay(300);
    
    const token = localStorage.getItem('access_token');
    if (!token || !token.startsWith('mock_token_')) {
      throw new Error('Invalid token');
    }
    
    // For demo, return the first user or a user based on stored email
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      const userData = JSON.parse(storedUser);
      const user = MOCK_USERS.find(u => u.email === userData.email) || MOCK_USERS[0];
      return user;
    }
    
    return MOCK_USERS[0];
  },

  updateProfile: async (profileData) => {
    await delay(500);
    
    const token = localStorage.getItem('access_token');
    if (!token || !token.startsWith('mock_token_')) {
      throw new Error('Invalid token');
    }
    
    // For demo, just return the updated data
    return {
      ...profileData,
      updated_at: new Date().toISOString()
    };
  },

  changePassword: async (currentPassword, newPassword) => {
    await delay(500);
    
    const token = localStorage.getItem('access_token');
    if (!token || !token.startsWith('mock_token_')) {
      throw new Error('Invalid token');
    }
    
    return {
      message: 'Password changed successfully'
    };
  }
};

// Mock other APIs
export const mockUserAPI = {
  getAppointments: async () => {
    await delay(300);
    return [];
  },

  getFavoriteBarbers: async () => {
    await delay(300);
    return [];
  },

  updateNotificationSettings: async (settings) => {
    await delay(300);
    return settings;
  }
};

export const mockBarberAPI = {
  getBarbers: async (filters = {}) => {
    await delay(400);
    return [];
  },

  getBarberById: async (id) => {
    await delay(300);
    return null;
  },

  bookAppointment: async (barberId, appointmentData) => {
    await delay(500);
    return {
      id: Date.now(),
      ...appointmentData,
      status: 'confirmed'
    };
  }
};
