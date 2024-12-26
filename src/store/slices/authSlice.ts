import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface AuthState {
  user: any | null;
  initialized: boolean;
}

const initialState: AuthState = {
  user: null,
  initialized: false,
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<any | null>) => {
      state.user = action.payload;
      state.initialized = true;
    },
    signOut: (state) => {
      state.user = null;
      state.initialized = true;
    },
  },
});

export const { setUser, signOut } = authSlice.actions;

export default authSlice.reducer;
