import { createApi } from "@reduxjs/toolkit/query/react";
import { queryWithBearer } from "../queryWithBearer";

export const magazineApi = createApi({
  reducerPath: "magazineApi",
  baseQuery: queryWithBearer,
  tagTypes: ["Magazine"],
  endpoints: (builder) => ({
    getMagazine: builder.query({
      query: () => ({
        url: "/magazine",
        method: "GET",
      }),
      providesTags: ["Magazine"],
    }),
    addMagazine: builder.mutation({
      query: ({ title, body, footer, post_schedule, thumbnail }) => {
        const formData = new FormData();
        formData.append("title", title ?? null);
        formData.append("body", body ?? null);
        formData.append("footer", footer ?? null);
        post_schedule && formData.append("post_schedule", post_schedule);
        formData.append("thumbnail", thumbnail ?? null);
        return {
          url: "/magazine",
          method: "POST",
          body: formData,
        };
      },
      invalidatesTags: ["Magazine"],
    }),
  }),
});

export const { useAddMagazineMutation, useGetMagazineQuery } = magazineApi;
