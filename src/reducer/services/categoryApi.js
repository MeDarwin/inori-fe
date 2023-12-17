import { createApi } from "@reduxjs/toolkit/query/react";
import { queryWithBearer } from "../queryWithBearer";

export const categoryApi = createApi({
  reducerPath: "categoryApi",
  baseQuery: queryWithBearer,
  tagTypes: ["Category"],
  endpoints: (builder) => ({
    //Get all category from database
    getCategories: builder.query({
      query: () => ({
        url: "/category",
        method: "GET",
      }),
      providesTags: ["Category"],
    }),
    //Get category by name
    getCategoryByName: builder.query({
      query: (name) => ({
        url: `/category/${name}`,
        method: "GET",
      }),
      providesTags: ["Category"],
    }),
    //Add category to database
    addCategory: builder.mutation({
      query: (name) => ({
        url: "/category",
        method: "POST",
        body: { name },
      }),
      invalidatesTags: ["Category"],
    }),
  }),
});

export const { useGetCategoriesQuery, useAddCategoryMutation, useLazyGetCategoriesQuery, useGetCategoryByNameQuery } =
  categoryApi;
