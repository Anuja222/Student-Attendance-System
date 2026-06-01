import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

export type SystemConfigState = {
  ready: boolean;
  settings: Record<string, string>;
};

const initialState: SystemConfigState = {
  ready: false,
  settings: {},
};

const systemConfigSlice = createSlice({
  name: "systemConfig",
  initialState,
  reducers: {
    setSetting(state, action: PayloadAction<{ key: string; value: string }>) {
      state.settings[action.payload.key] = action.payload.value;
    },
    setReady(state, action: PayloadAction<boolean>) {
      state.ready = action.payload;
    },
  },
});

export const { setSetting, setReady } = systemConfigSlice.actions;
export const systemConfigReducer = systemConfigSlice.reducer;
