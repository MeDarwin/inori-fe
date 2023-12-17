import { createApi } from "@reduxjs/toolkit/query/react";
import { queryWithBearer } from "../queryWithBearer";

export const recordApi = createApi({
  reducerPath: "recordApi",
  baseQuery: queryWithBearer,
  endpoints: (builder) => ({
    visit: builder.query({
      query: ({ view_type, view_url }) => ({
        url: "/record",
        method: "GET",
        params: {
          view_type,
          view_url,
        },
      }),
    }),
    getVisitLog: builder.query({
      query: () => ({
        url: "/visit-count",
        method: "GET",
      }),
    }),
  }),
});

export const { useVisitQuery, useGetVisitLogQuery } = recordApi;
