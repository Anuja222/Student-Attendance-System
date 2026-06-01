import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

export type AuthState = {
  token: string | null;
  userId?: string | null;
  loading: boolean;
};

const initialState: AuthState = {
  token: null,
  userId: null,
  loading: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setToken(state, action: PayloadAction<string | null>) {
      state.token = action.payload;
    },
    setUserId(state, action: PayloadAction<string | null>) {
      state.userId = action.payload;
    },
    setLoading(state, action: PayloadAction<boolean>) {
      state.loading = action.payload;
    },
    clearAuth(state) {
      state.token = null;
      state.userId = null;
    },
  },
});

export const { setToken, setUserId, setLoading, clearAuth } = authSlice.actions;
export const authReducer = authSlice.reducer;
