import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

export type PermissionState = {
  granted: Record<string, boolean>;
};

const initialState: PermissionState = {
  granted: {},
};

const permissionSlice = createSlice({
  name: "permission",
  initialState,
  reducers: {
    setPermission(state, action: PayloadAction<{ key: string; value: boolean }>) {
      state.granted[action.payload.key] = action.payload.value;
    },
    clearPermissions(state) {
      state.granted = {};
    },
  },
});

export const { setPermission, clearPermissions } = permissionSlice.actions;
export const permissionReducer = permissionSlice.reducer;
