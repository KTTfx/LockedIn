import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slices/authSlice';
import focusReducer from './slices/focusSlice';
import statsReducer from './slices/statsSlice';
import settingsReducer from './slices/settingsSlice';
import lockSessionReducer from './slices/lockSessionSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    focus: focusReducer,
    stats: statsReducer,
    settings: settingsReducer,
    lockSession: lockSessionReducer,
  },
});
