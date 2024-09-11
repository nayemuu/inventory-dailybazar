import { successToastMessage } from "../../../utils/toastifyUtils";
import { apiSlice } from "../api/apiSlice";

const apiWithTag = apiSlice.enhanceEndpoints({
  addTagTypes: ["category-list"],
});

export const categoryApi = apiWithTag.injectEndpoints({
  endpoints: (builder) => ({
    addCategory: builder.mutation({
      query: (data) => ({
        url: "api/category/",
        method: "POST",
        body: data,
        formData: true,
      }),
      invalidatesTags: ["category-list"],
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

    getCategory: builder.query({
      query: ({ keyword, limit, offset }) => ({
        url: `/api/category/?keyword=${keyword}&limit=${limit}&offset=${offset}`,
      }),
      providesTags: (result, error, arg) => [{ type: "category-list" }],
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

    editCategory: builder.mutation({
      query: (data) => {
        const object = Object.fromEntries(data.entries());
        console.log(object);

        return {
          url: `api/category/${object.id}`,
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
      invalidatesTags: ["category-list"],
    }),

    deleteCategory: builder.mutation({
      query: (id) => ({
        url: `api/category/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["category-list"],
    }),
  }),
});

export const { useAddCategoryMutation, useGetCategoryQuery } = categoryApi;
