import { createSlice } from '@reduxjs/toolkit';

const settingsSlice = createSlice({
  name: 'settings',
  initialState: {
    theme: 'light',
    notifications: {
      sessionEnd: true,
      breakEnd: true,
      dailyReminder: true,
    },
    defaultSessionDuration: 25 * 60, // 25 minutes in seconds
    defaultBreakDuration: 5 * 60, // 5 minutes in seconds
    unlockFee: 5.00, // Default unlock fee in dollars
    soundEnabled: true,
    vibrationEnabled: true,
    autoStartBreaks: true,
    dailyGoal: 4 * 60 * 60, // 4 hours in seconds
  },
  reducers: {
    toggleTheme: (state) => {
      state.theme = state.theme === 'light' ? 'dark' : 'light';
    },
    updateNotificationSettings: (state, action) => {
      state.notifications = {
        ...state.notifications,
        ...action.payload,
      };
    },
    updateDefaultDurations: (state, action) => {
      const { sessionDuration, breakDuration } = action.payload;
      if (sessionDuration) state.defaultSessionDuration = sessionDuration;
      if (breakDuration) state.defaultBreakDuration = breakDuration;
    },
    updateUnlockFee: (state, action) => {
      state.unlockFee = action.payload;
    },
    toggleSound: (state) => {
      state.soundEnabled = !state.soundEnabled;
    },
    toggleVibration: (state) => {
      state.vibrationEnabled = !state.vibrationEnabled;
    },
    toggleAutoStartBreaks: (state) => {
      state.autoStartBreaks = !state.autoStartBreaks;
    },
    updateDailyGoal: (state, action) => {
      state.dailyGoal = action.payload;
    },
  },
});

export const {
  toggleTheme,
  updateNotificationSettings,
  updateDefaultDurations,
  updateUnlockFee,
  toggleSound,
  toggleVibration,
  toggleAutoStartBreaks,
  updateDailyGoal,
} = settingsSlice.actions;

export default settingsSlice.reducer;
