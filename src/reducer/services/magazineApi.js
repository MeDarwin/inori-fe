import { createApi } from "@reduxjs/toolkit/query/react";
import { queryWithBearer } from "../queryWithBearer";

export const magazineApi = createApi({
  reducerPath: "magazineApi",
  baseQuery: queryWithBearer,
  tagTypes: ["Magazine"],
  endpoints: (builder) => ({
    //Get all magazine from database
    getMagazine: builder.query({
      query: () => ({
        url: "/magazine",
        method: "GET",
      }),
      providesTags: ["Magazine"],
    }),
    //Get magazine by id
    getMagazineById: builder.query({
      query: (id) => ({
        url: `/magazine/${id}`,
        method: "GET",
      }),
      providesTags: ["Magazine"],
    }),
    //Add magazine to database
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
    //Delete magazine
    deleteMagazine: builder.mutation({
      query: (id) => ({
        url: `/magazine/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Magazine"],
    }),
    //Verify magazine
    verifyMagazine: builder.mutation({
      query: (id) => ({
        url: `/magazine/verify/${id}`,
        method: "PATCH",
      }),
      invalidatesTags: ["Magazine"],
    }),
    //Add category to magazine
    addCategoryToMagazine: builder.mutation({
      query: ({ magazineId, categoryName }) => ({
        url: `/magazine/${magazineId}/category`,
        method: "POST",
        params: {
          category_name: categoryName,
        },
      }),
      invalidatesTags: ["Magazine"],
    }),
    //Delete category from magazine
    deleteCategoryFromMagazine: builder.mutation({
      query: ({ magazineId, categoryName }) => ({
        url: `/magazine/${magazineId}/category`,
        method: "DELETE",
        params: {
          category_name: categoryName,
        },
      }),
      invalidatesTags: ["Magazine"],
    })
  }),
});

export const {
  useAddMagazineMutation,
  useGetMagazineQuery,
  useGetMagazineByIdQuery,
  useDeleteMagazineMutation,
  useVerifyMagazineMutation,
  useAddCategoryToMagazineMutation,
  useDeleteCategoryFromMagazineMutation
} = magazineApi;
