/* eslint-disable max-len */
/* eslint-disable no-unused-vars */
/* eslint-disable import/prefer-default-export */
import { apiSlice } from '../api/apiSlice';

export const authApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (data) => ({
        // url: "/api/user/login/?version=otp",
        url: '/api/inventory/auth/',
        method: 'POST',
        body: data,
      }),
      async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        try {
          // console.log('inside authApi arg = ', arg);
          const result = await queryFulfilled;
          console.log('inside login result = ', result);
        } catch (error) {
          //
        }
      },
    }),
  }),
});

export const { useLoginMutation } = authApi;
