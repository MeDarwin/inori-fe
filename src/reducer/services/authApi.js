import { createApi } from "@reduxjs/toolkit/query/react";
import { queryWithBearer } from "../queryWithBearer";
import { resetAuth, setToken, setUser } from "../slices/authSlice";

/**
 * Auth service to handle regarding auth related endpoints.
 */
export const authApi = createApi({
  reducerPath: "authApi",
  baseQuery: queryWithBearer,
  endpoints: (builder) => ({
    /** Login endpoint with redux query*/
    login: builder.mutation({
      query: ({ username, password }) => ({
        url: "/auth/login",
        method: "POST",
        body: { username, password },
      }),
      onQueryStarted: (_, { dispatch, queryFulfilled }) => {
        queryFulfilled.then(({ data }) => {
          // Set token upon successful login
          dispatch(setToken(data?.access_token));
        });
      },
    }),
    /** Logout endpoint with redux query */
    logout: builder.mutation({
      query: () => ({
        url: "/auth/logout",
        method: "DELETE",
      }),
      onQueryStarted: (_, { dispatch, queryFulfilled }) => {
        queryFulfilled.then(() => {
          // Remove token upon successful logout
          dispatch(resetAuth());
        });
      },
    }),
    /** Get current user endpoint with redux query */
    getMe: builder.query({
      query: () => ({
        url: "/auth/get-me",
        method: "GET",
      }),
      onQueryStarted: (_, { dispatch, queryFulfilled }) => {
        queryFulfilled
          .then(({ data }) => {
            // Set user upon valid token
            dispatch(setUser(data));
          })
          .catch(() => {
            // Remove auth state upon invalid token
            dispatch(resetAuth());
          });
      },
    }),
  }),
});

export const { useLoginMutation, useLogoutMutation, useGetMeQuery } = authApi;
