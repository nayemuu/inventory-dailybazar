import { successToastMessage } from "../../../utils/toastifyUtils";
import { apiSlice } from "../api/apiSlice";

const apiWithTag = apiSlice.enhanceEndpoints({
  addTagTypes: ["generic-list"],
});

export const genericApi = apiWithTag.injectEndpoints({
  endpoints: (builder) => ({
    addGeneric: builder.mutation({
      query: (data) => ({
        url: "api/generic/",
        method: "POST",
        body: data,
        formData: true,
      }),
      invalidatesTags: ["generic-list"],
      async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        try {
          // console.log('inside createArticleApi arg = ', arg);
          const result = await queryFulfilled;
          successToastMessage("Generic Created successfully");

          console.log("uoo");
          // console.log('inside createArticleApi  result = ', result);
        } catch (error) {
          // console.log('inside createArticleApi  result = ', error);
        }
      },
    }),

    getGenerics: builder.query({
      query: ({ keyword, limit, offset }) => ({
        url: `api/generic/?keyword=${keyword}&limit=${limit}&offset=${offset}`,
      }),
      providesTags: (result, error, arg) => [{ type: "generic-list" }],
      async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        try {
          // console.log("inside getGenerics arg = ", arg);
          // const result = await queryFulfilled;
          // console.log("inside getGenerics result = ", result);
        } catch (error) {
          // console.log('inside createArticleApi  result = ', error);
        }
      },
    }),

    updateGeneric: builder.mutation({
      query: (data) => {
        return {
          url: `api/generic/${data.id}`,
          method: "PATCH",
          body: data,
          formData: true,
        };
      },

      async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        try {
          const result = await queryFulfilled;
          // console.log("inside editGeneric result = ", result);
          // console.log("result.data.message = ", result.data.message);
          if (result?.data?.message) {
            // console.log("result.data.message = ", result.data.message);
            successToastMessage("Generic updated successfully");
          }
        } catch (error) {
          //
        }
      },
      invalidatesTags: ["generic-list"],
    }),

    deleteGeneric: builder.mutation({
      query: (id) => ({
        url: `api/generic/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["generic-list"],
    }),
  }),
});

export const {
  useAddGenericMutation,
  useGetGenericsQuery,
  useUpdateGenericMutation,
  useDeleteGenericMutation,
} = genericApi;
