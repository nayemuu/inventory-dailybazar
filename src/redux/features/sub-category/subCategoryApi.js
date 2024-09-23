import { successToastMessage } from "../../../utils/toastifyUtils";
import { apiSlice } from "../api/apiSlice";

const apiWithTag = apiSlice.enhanceEndpoints({
  addTagTypes: ["sub-category-list"],
});

export const subCategoryApi = apiWithTag.injectEndpoints({
  endpoints: (builder) => ({
    addSubCategory: builder.mutation({
      query: (data) => ({
        url: "api/sub-category/",
        method: "POST",
        body: data,
        formData: true,
      }),
      invalidatesTags: ["sub-category-list"],
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

    getSubCategory: builder.query({
      query: ({ keyword, limit, offset }) => ({
        url: `api/sub-category/?keyword=${keyword}&limit=${limit}&offset=${offset}`,
      }),
      providesTags: (result, error, arg) => [{ type: "sub-category-list" }],
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

    updateSubCategory: builder.mutation({
      query: (data) => {
        const object = Object.fromEntries(data.entries());
        console.log(object);

        return {
          url: `api/sub-category/${object.id}`,
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
      invalidatesTags: ["sub-category-list"],
    }),

    deleteSubCategory: builder.mutation({
      query: (id) => ({
        url: `api/sub-category/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["sub-category-list"],
    }),
  }),
});

export const {
  useAddSubCategoryMutation,
  useGetSubCategoryQuery,
  useUpdateSubCategoryMutation,
  useDeleteSubCategoryMutation,
} = subCategoryApi;
