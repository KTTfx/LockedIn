import AsyncStorage from '@react-native-async-storage/async-storage';

const STORAGE_KEY = '@auth_data';

// Simulated authentication for development
const mockUsers = {
  'test@example.com': {
    password: 'password123',
    id: '1',
    name: 'Test User',
  },
};

export const loginUser = async (email, password) => {
  try {
    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 1000));

    const user = mockUsers[email];
    if (!user || user.password !== password) {
      return {
        success: false,
        error: 'Invalid email or password',
      };
    }

    const userData = {
      id: user.id,
      email,
      name: user.name,
    };

    await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(userData));
    return { success: true, user: userData };
  } catch (error) {
    console.error('Login error:', error);
    return {
      success: false,
      error: error.message || 'Failed to login. Please try again.',
    };
  }
};

export const registerUser = async (email, password) => {
  try {
    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 1000));

    if (mockUsers[email]) {
      return {
        success: false,
        error: 'Email already registered',
      };
    }

    // Create new user
    const userData = {
      id: Date.now().toString(),
      email,
      name: email.split('@')[0],
    };

    mockUsers[email] = {
      password,
      ...userData,
    };

    await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(userData));
    return { success: true, user: userData };
  } catch (error) {
    console.error('Registration error:', error);
    return {
      success: false,
      error: error.message || 'Failed to register. Please try again.',
    };
  }
};

export const logoutUser = async () => {
  try {
    await AsyncStorage.removeItem(STORAGE_KEY);
    return { success: true };
  } catch (error) {
    console.error('Logout error:', error);
    return {
      success: false,
      error: error.message || 'Failed to logout. Please try again.',
    };
  }
};

export const resetPassword = async (email) => {
  try {
    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 1000));

    const user = mockUsers[email];
    if (!user) {
      return {
        success: false,
        error: 'Email not registered',
      };
    }

    // Simulate password reset
    return { success: true };
  } catch (error) {
    console.error('Password reset error:', error);
    return {
      success: false,
      error: error.message || 'Failed to send reset email. Please try again.',
    };
  }
};

export const checkAuthStatus = async () => {
  try {
    const userJson = await AsyncStorage.getItem(STORAGE_KEY);
    if (!userJson) return { success: false };
    
    const user = JSON.parse(userJson);
    return { success: true, user };
  } catch (error) {
    console.error('Auth status check error:', error);
    return { success: false };
  }
};
