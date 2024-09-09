import { successToastMessage } from "../../../utils/toastifyUtils";
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

    getLocations: builder.query({
      query: ({ keyword, limit, offset }) => ({
        url: `/api/location/?keyword=${keyword}&limit=${limit}&offset=${offset}`,
      }),
      providesTags: (result, error, arg) => [{ type: "location-list" }],
      async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        try {
          // console.log("inside getLocations arg = ", arg);
          // const result = await queryFulfilled;
          // console.log("inside getLocations result = ", result);
        } catch (error) {
          // console.log('inside createArticleApi  result = ', error);
        }
      },
    }),

    editLocation: builder.mutation({
      query: (data) => {
        const object = Object.fromEntries(data.entries());
        console.log(object);

        return {
          url: `api/location/${object.id}`,
          method: "PATCH",
          body: data,
          formData: true,
        };
      },

      async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        try {
          const result = await queryFulfilled;
          // console.log("inside editLocation result = ", result);
          // console.log("result.data.message = ", result.data.message);
          if (result?.data?.message) {
            // console.log("result.data.message = ", result.data.message);
            successToastMessage(result.data.message);
          }
        } catch (error) {
          //
        }
      },
      invalidatesTags: ["location-list"],
    }),

    deleteLocation: builder.mutation({
      query: (id) => ({
        url: `api/location/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["location-list"],
    }),
  }),
});

export const {
  useAddLocationMutation,
  useGetLocationsQuery,
  useEditLocationMutation,
  useDeleteLocationMutation,
} = locationApi;
