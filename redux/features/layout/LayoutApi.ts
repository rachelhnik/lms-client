import { apiSlice } from "../api/apiSlice";

export const LayoutApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getHeroData: builder.query({
      query: (type) => ({
        url: `/layouts/get-layout/${type}`,
        method: "GET",
        credentials: "include" as const,
      }),
    }),
    editLayoutData: builder.mutation({
      query: ({ type, image, title, subtitle, faq, categories }) => ({
        url: "/layouts/edit",
        method: "PUT",
        body: {
          type,
          image,
          title,
          subtitle,
          faq,
          categories,
        },
        credentials: "include" as const,
      }),
    }),
  }),
});

export const { useGetHeroDataQuery, useEditLayoutDataMutation } = LayoutApi;
