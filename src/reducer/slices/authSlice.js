import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  token: localStorage.getItem("access_token") ?? null,
  user: null,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setToken: (state, action) => {
      state.token = action.payload;
      localStorage.setItem("access_token", action.payload);
    },
    setUser: (state, action) => {
      state.user = action.payload;
    },
    resetAuth: (state = state) => {
      localStorage.removeItem("access_token");
      state.token = null;
      state.user = null;
    },
  },
});

export const { setToken, resetAuth, setUser } = authSlice.actions;
