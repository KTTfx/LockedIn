import { createSlice } from '@reduxjs/toolkit';
import {
  loginUser as firebaseLogin,
  registerUser as firebaseRegister,
  logoutUser as firebaseLogout,
  checkAuthStatus,
} from '../../services/auth';

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    user: null,
    loading: false,
    error: null,
    initialized: false,
  },
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
      state.loading = false;
      state.error = null;
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
      state.loading = false;
    },
    clearError: (state) => {
      state.error = null;
    },
    setInitialized: (state) => {
      state.initialized = true;
    },
    logout: (state) => {
      state.user = null;
      state.error = null;
    },
  },
});

export const {
  setUser,
  setLoading,
  setError,
  clearError,
  setInitialized,
  logout,
} = authSlice.actions;

// Thunks
export const initializeAuth = () => async (dispatch) => {
  try {
    const { success, user } = await checkAuthStatus();
    if (success && user) {
      dispatch(setUser(user));
    }
  } catch (error) {
    console.error('Auth initialization error:', error);
  } finally {
    dispatch(setInitialized());
  }
};

export const loginUserThunk = (email, password) => async (dispatch) => {
  dispatch(setLoading(true));
  try {
    const { success, user, error } = await firebaseLogin(email, password);
    if (success) {
      dispatch(setUser(user));
    } else {
      dispatch(setError(error));
    }
  } catch (error) {
    dispatch(setError(error.message));
  }
};

export const registerUserThunk = (email, password) => async (dispatch) => {
  dispatch(setLoading(true));
  try {
    const { success, user, error } = await firebaseRegister(email, password);
    if (success) {
      dispatch(setUser(user));
    } else {
      dispatch(setError(error));
    }
  } catch (error) {
    dispatch(setError(error.message));
  }
};

export const logoutUserThunk = () => async (dispatch) => {
  dispatch(setLoading(true));
  try {
    await firebaseLogout();
    dispatch(logout());
  } catch (error) {
    dispatch(setError(error.message));
  }
};

export default authSlice.reducer;
