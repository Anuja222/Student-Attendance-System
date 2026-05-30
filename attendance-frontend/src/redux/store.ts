import { configureStore } from "@reduxjs/toolkit";

import { appReducer } from "./slices/appSlice";
import { authReducer } from "./slices/authSlice";
import { permissionReducer } from "./slices/permissionSlice";
import { systemConfigReducer } from "./slices/systemConfigSlice";

export const store = configureStore({
  reducer: {
    app: appReducer,
    auth: authReducer,
    permission: permissionReducer,
    systemConfig: systemConfigReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;