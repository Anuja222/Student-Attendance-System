import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

export type AppState = {
  sidebarOpen: boolean;
  activeSection: string;
};

const initialState: AppState = {
  sidebarOpen: true,
  activeSection: "Dashboard",
};

const appSlice = createSlice({
  name: "app",
  initialState,
  reducers: {
    toggleSidebar(state) {
      state.sidebarOpen = !state.sidebarOpen;
    },
    setActiveSection(state, action: PayloadAction<string>) {
      state.activeSection = action.payload;
    },
  },
});

export const { toggleSidebar, setActiveSection } = appSlice.actions;

export const appReducer = appSlice.reducer;