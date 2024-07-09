/* eslint-disable max-len */
/* eslint-disable no-unused-vars */
/* eslint-disable import/prefer-default-export */
import { apiSlice } from '../api/apiSlice';
import { initiateProfileInfo } from '../profile/profileSlice';
import { userLoggedIn } from './authSlice';

export const authApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (data) => ({
        url: '/api/auth/login',
        method: 'POST',
        body: data,
      }),
      async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        try {
          // console.log('inside authApi arg = ', arg);
          const result = await queryFulfilled;
          // console.log('inside login result = ', result);
          dispatch(
            userLoggedIn({
              accessToken: result.data.accessToken,
              // refreshToken: '',
            })
          );

          dispatch(
            initiateProfileInfo({
              name: result.data.name,
              email: result.data.email,
            })
          );

          localStorage.setItem(
            'auth',
            JSON.stringify({
              accessToken: result.data.accessToken,
            })
          );

          localStorage.setItem(
            'profile',
            JSON.stringify({
              name: result.data.name,
              email: result.data.email,
            })
          );
        } catch (error) {
          //
        }
      },
    }),
  }),
});

export const { useLoginMutation } = authApi;
