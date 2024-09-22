import { successToastMessage } from "../../../utils/toastifyUtils";
import { apiSlice } from "../api/apiSlice";

const apiWithTag = apiSlice.enhanceEndpoints({
  addTagTypes: ["supplier-list", "supplier"],
});

export const supplierApi = apiWithTag.injectEndpoints({
  endpoints: (builder) => ({
    addSupplier: builder.mutation({
      query: (data) => ({
        url: "api/supplier/",
        method: "POST",
        body: data,
        formData: true,
      }),
      invalidatesTags: ["supplier-list"],
      async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        try {
          // console.log('inside createArticleApi arg = ', arg);
          const result = await queryFulfilled;
          successToastMessage("Supplier created successfully");
          // console.log('inside createArticleApi  result = ', result);
        } catch (error) {
          // console.log('inside createArticleApi  result = ', error);
        }
      },
    }),

    getSuppliers: builder.query({
      query: ({ keyword, limit, offset }) => ({
        url: `api/supplier/?keyword=${keyword}&limit=${limit}&offset=${offset}`,
      }),
      providesTags: (result, error, arg) => [{ type: "supplier-list" }],
      async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        try {
          // console.log("inside getsuppliers arg = ", arg);
          // const result = await queryFulfilled;
          // console.log("inside getsuppliers result = ", result);
        } catch (error) {
          // console.log('inside createArticleApi  result = ', error);
        }
      },
    }),

    getSingleSupplier: builder.query({
      query: (id) => ({
        url: `api/supplier/${id}`,
      }),

      providesTags: (result, error, arg) => {
        // console.log("arg = ", arg);
        return [{ type: "supplier", id: arg }];
      },
      async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        try {
          // console.log("inside getsuppliers arg = ", arg);
          // const result = await queryFulfilled;
          // console.log("inside getsuppliers result = ", result);
        } catch (error) {
          // console.log('inside createArticleApi  result = ', error);
        }
      },
    }),

    updateSupplier: builder.mutation({
      query: (data) => {
        return {
          url: `api/supplier/${data.id}`,
          method: "PATCH",
          body: data,
          formData: true,
        };
      },

      async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        try {
          const result = await queryFulfilled;

          successToastMessage("Supplier updated successfully");
          // console.log("inside editsupplier result = ", result);
          // console.log("result.data.message = ", result.data.message);
          if (result?.data?.message) {
            // console.log("result.data.message = ", result.data.message);
          }
        } catch (error) {
          //
        }
      },

      invalidatesTags: (result, error, arg) => {
        // console.log("arg = ");
        // console.log("arg = ", arg);
        // console.log("result = ", result);
        return [{ type: "supplier", id: arg.id }, "supplier-list"];
      },
    }),

    deleteSupplier: builder.mutation({
      query: (id) => ({
        url: `api/supplier/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["supplier-list"],
    }),
  }),
});

export const {
  useAddSupplierMutation,
  useGetSuppliersQuery,
  useGetSingleSupplierQuery,
  useUpdateSupplierMutation,
  useDeleteSupplierMutation,
} = supplierApi;
