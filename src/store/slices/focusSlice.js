import { createSlice } from '@reduxjs/toolkit';

const focusSlice = createSlice({
  name: 'focus',
  initialState: {
    isSessionActive: false,
    sessionStartTime: null,
    sessionDuration: 25 * 60, // 25 minutes in seconds
    breakDuration: 5 * 60, // 5 minutes in seconds
    currentTasks: [],
    blockedApps: [],
    isBreakActive: false,
  },
  reducers: {
    startSession: (state) => {
      state.isSessionActive = true;
      state.sessionStartTime = Date.now();
    },
    endSession: (state) => {
      state.isSessionActive = false;
      state.sessionStartTime = null;
    },
    startBreak: (state) => {
      state.isBreakActive = true;
    },
    endBreak: (state) => {
      state.isBreakActive = false;
    },
    addTask: (state, action) => {
      state.currentTasks.push({
        id: Date.now().toString(),
        title: action.payload,
        completed: false,
      });
    },
    toggleTask: (state, action) => {
      const task = state.currentTasks.find(t => t.id === action.payload);
      if (task) {
        task.completed = !task.completed;
      }
    },
    removeTask: (state, action) => {
      state.currentTasks = state.currentTasks.filter(
        task => task.id !== action.payload
      );
    },
    addBlockedApp: (state, action) => {
      state.blockedApps.push(action.payload);
    },
    removeBlockedApp: (state, action) => {
      state.blockedApps = state.blockedApps.filter(
        app => app !== action.payload
      );
    },
    updateSessionDuration: (state, action) => {
      state.sessionDuration = action.payload;
    },
    updateBreakDuration: (state, action) => {
      state.breakDuration = action.payload;
    },
  },
});

export const {
  startSession,
  endSession,
  startBreak,
  endBreak,
  addTask,
  toggleTask,
  removeTask,
  addBlockedApp,
  removeBlockedApp,
  updateSessionDuration,
  updateBreakDuration,
} = focusSlice.actions;

export default focusSlice.reducer;
