import { configureStore } from "@reduxjs/toolkit";
import { authApi } from "./reducer/services/authApi";
import { authSlice } from "./reducer/slices/authSlice";

export const store = configureStore({
  reducer: {
    auth: authSlice.reducer,
    [authApi.reducerPath]: authApi.reducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(authApi.middleware),
});
