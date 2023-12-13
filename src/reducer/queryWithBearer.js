import { fetchBaseQuery } from "@reduxjs/toolkit/query";
import { config } from "../config/app";

export const queryWithBearer = fetchBaseQuery({
  baseUrl: config.apiUrl,
  prepareHeaders: (headers, { getState, endpoint }) => {
    headers.set("Accept", "application/json");
    if (endpoint === "login") return headers;
    headers.set("Authorization", `Bearer ${getState().auth.token}`);
  },
});
