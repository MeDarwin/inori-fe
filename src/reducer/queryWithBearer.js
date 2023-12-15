import { fetchBaseQuery } from "@reduxjs/toolkit/query";
import { config } from "../config/app";

export const queryWithBearer = fetchBaseQuery({
  baseUrl: config.apiUrl,
  prepareHeaders: (headers, { getState, endpoint }) => {
    const token = getState().auth.token;
    headers.set("Accept", "application/json");
    if (endpoint === "login") return headers;
    if (token) headers.set("Authorization", `Bearer ${token}`);
  },
});
