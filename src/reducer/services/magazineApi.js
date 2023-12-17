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
    getMagazineById: builder.query({
      query: (id) => ({
        url: `/magazine/${id}`,
        method: "GET",
      }),
      providesTags: ["Magazine"],
    }),
    addMagazine: builder.mutation({
      query: ({ title, body, footer, post_schedule, thumbnail }) => {
        const formData = new FormData();
        title && formData.append("title", title);
        body && formData.append("body", body);
        footer && formData.append("footer", footer);
        post_schedule && formData.append("post_schedule", post_schedule);
        thumbnail && formData.append("thumbnail", thumbnail);
        return {
          url: "/magazine",
          method: "POST",
          body: formData,
        };
      },
      invalidatesTags: ["Magazine"],
    }),
    deleteMagazine: builder.mutation({
      query: (id) => ({
        url: `/magazine/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Magazine"],
    }),
    verifyMagazine: builder.mutation({
      query: (id) => ({
        url: `/magazine/verify/${id}`,
        method: "PATCH",
      }),
      invalidatesTags: ["Magazine"],
    }),
  }),
});

export const {
  useAddMagazineMutation,
  useGetMagazineQuery,
  useGetMagazineByIdQuery,
  useDeleteMagazineMutation,
  useVerifyMagazineMutation,
} = magazineApi;
