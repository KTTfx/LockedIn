import { createSlice } from '@reduxjs/toolkit';

const statsSlice = createSlice({
  name: 'stats',
  initialState: {
    dailyStats: {
      focusTime: 0,
      completedTasks: 0,
      sessions: 0,
    },
    weeklyStats: {
      focusTime: 0,
      completedTasks: 0,
      sessions: 0,
      dailyBreakdown: [],
    },
    monthlyStats: {
      focusTime: 0,
      completedTasks: 0,
      sessions: 0,
      weeklyBreakdown: [],
    },
    streak: 0,
    lastActiveDate: null,
  },
  reducers: {
    addFocusSession: (state, action) => {
      const { duration, completedTasks } = action.payload;
      const today = new Date().toISOString().split('T')[0];

      // Update daily stats
      state.dailyStats.focusTime += duration;
      state.dailyStats.completedTasks += completedTasks;
      state.dailyStats.sessions += 1;

      // Update streak
      if (state.lastActiveDate) {
        const lastDate = new Date(state.lastActiveDate);
        const yesterday = new Date();
        yesterday.setDate(yesterday.getDate() - 1);
        
        if (lastDate.toISOString().split('T')[0] === yesterday.toISOString().split('T')[0]) {
          state.streak += 1;
        } else if (lastDate.toISOString().split('T')[0] !== today) {
          state.streak = 1;
        }
      } else {
        state.streak = 1;
      }
      
      state.lastActiveDate = today;
    },
    resetDailyStats: (state) => {
      state.dailyStats = {
        focusTime: 0,
        completedTasks: 0,
        sessions: 0,
      };
    },
    updateWeeklyStats: (state, action) => {
      state.weeklyStats = action.payload;
    },
    updateMonthlyStats: (state, action) => {
      state.monthlyStats = action.payload;
    },
  },
});

export const {
  addFocusSession,
  resetDailyStats,
  updateWeeklyStats,
  updateMonthlyStats,
} = statsSlice.actions;

export default statsSlice.reducer;
