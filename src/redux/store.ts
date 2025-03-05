import { configureStore } from "@reduxjs/toolkit";
import { authReducer } from "./slice/authSlice";
// import { settingsReducer } from "./slice/settingsSlice";
// import { financeReducer } from "./slice/financeSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    // settings: settingsReducer,
    // finance: financeReducer,
  },
});

type RootState = ReturnType<typeof store.getState>;
type AppDispatch = typeof store.dispatch;

export type { RootState, AppDispatch };
