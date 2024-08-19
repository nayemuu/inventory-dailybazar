import { apiSlice } from "../api/apiSlice";

const apiWithTag = apiSlice.enhanceEndpoints({
  addTagTypes: ["location-list"],
});

export const locationApi = apiWithTag.injectEndpoints({
  endpoints: (builder) => ({
    addLocation: builder.mutation({
      query: (data) => ({
        url: "api/location/",
        method: "POST",
        body: data,
        formData: true,
      }),
      invalidatesTags: ["location-list"],
      async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        try {
          // console.log('inside createArticleApi arg = ', arg);
          const result = await queryFulfilled;
          // console.log('inside createArticleApi  result = ', result);
        } catch (error) {
          // console.log('inside createArticleApi  result = ', error);
        }
      },
    }),

    getLocation: builder.query({
      query: ({ keyword, limit, offset }) => ({
        url: `/api/location/?keyword=${keyword}&limit=${limit}&offset=${offset}`,
      }),
      providesTags: (result, error, arg) => [{ type: "location-list" }],
    }),
  }),
});

export const { useAddLocationMutation, useGetLocationQuery } = locationApi;
