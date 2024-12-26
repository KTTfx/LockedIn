import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  activeSession: null, // null when no active session
  sessionHistory: [],
  unlockFee: 2.99, // Base unlock fee in USD
};

const lockSessionSlice = createSlice({
  name: 'lockSession',
  initialState,
  reducers: {
    startSession: (state, action) => {
      const { duration, blockedApps, startTime } = action.payload;
      state.activeSession = {
        id: Date.now().toString(),
        duration, // in minutes
        blockedApps,
        startTime,
        endTime: startTime + duration * 60 * 1000, // Convert minutes to milliseconds
        isLocked: true,
        earlyUnlockAttempts: 0,
      };
    },
    endSession: (state) => {
      if (state.activeSession) {
        state.sessionHistory.push({
          ...state.activeSession,
          actualEndTime: Date.now(),
        });
        state.activeSession = null;
      }
    },
    unlockSession: (state, action) => {
      const { paymentId } = action.payload;
      if (state.activeSession) {
        state.activeSession.isLocked = false;
        state.activeSession.unlockPaymentId = paymentId;
        state.sessionHistory.push({
          ...state.activeSession,
          actualEndTime: Date.now(),
          earlyUnlock: true,
        });
        state.activeSession = null;
      }
    },
    incrementUnlockAttempt: (state) => {
      if (state.activeSession) {
        state.activeSession.earlyUnlockAttempts += 1;
        // Increase unlock fee by 50% for each attempt
        state.unlockFee *= 1.5;
      }
    },
    resetUnlockFee: (state) => {
      state.unlockFee = 2.99;
    },
  },
});

export const {
  startSession,
  endSession,
  unlockSession,
  incrementUnlockAttempt,
  resetUnlockFee,
} = lockSessionSlice.actions;

export const selectActiveSession = (state) => state.lockSession.activeSession;
export const selectUnlockFee = (state) => state.lockSession.unlockFee;
export const selectSessionHistory = (state) => state.lockSession.sessionHistory;

export default lockSessionSlice.reducer;
