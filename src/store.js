import { configureStore } from "@reduxjs/toolkit";
import { authApi } from "./reducer/services/authApi";
import { categoryApi } from "./reducer/services/categoryApi";
import { magazineApi } from "./reducer/services/magazineApi";
import { recordApi } from "./reducer/services/visitApi";
import { authSlice } from "./reducer/slices/authSlice";

export const store = configureStore({
  reducer: {
    auth: authSlice.reducer,
    [authApi.reducerPath]: authApi.reducer,
    [recordApi.reducerPath]: recordApi.reducer,
    [magazineApi.reducerPath]: magazineApi.reducer,
    [categoryApi.reducerPath]: categoryApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(authApi.middleware)
      .concat(recordApi.middleware)
      .concat(magazineApi.middleware)
      .concat(categoryApi.middleware),
});
