import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { changeMaintenanceStatus } from '../maintenance/maintenanceSlice';
import { userLoggedOut } from '../auth/authSlice';
import { errorToastMessage } from '../../../utils/toastifyUtils';

const baseQuery = fetchBaseQuery({
  baseUrl: import.meta.env.VITE_REACT_APP_BASE_URL,
  prepareHeaders: (headers, { getState, endpoint }) => {
    const token = getState()?.auth?.accessToken;
    if (token) {
      headers.set('authorization', `Bearer ${token}`);
    }

    return headers;
  },
});

export const apiSlice = createApi({
  reducerPath: 'api',

  baseQuery: async (args, api, extraOptions) => {
    let results = await baseQuery(args, api, extraOptions);
    // console.log("results = ", results);
    if (results?.error?.status === 401) {
      // console.log("results.error.status = ",results.error.status);
      const accessToken = api.getState()?.auth?.accessToken;
      // console.log("accessToken = ", accessToken);
      if (accessToken) {
        // clear your login progile info and accessToken from redux store

        const accessToken = api.getState()?.auth?.accessToken;
        //console.log("accessToken = ", accessToken);
        if (accessToken) {
          errorToastMessage('User Session Expired! Please Login Again.');
        }
        api.dispatch(userLoggedOut());
        localStorage.removeItem('auth');
        localStorage.removeItem('profile');
        api.dispatch(apiSlice.util.resetApiState());

        // clear cookie
      }
    }

    if (results?.error?.status === 'FETCH_ERROR') {
      const underMaintenanceStatus =
        api.getState()?.maintenance?.underMaintenanceStatus;
      console.log('underMaintenanceStatus = ', underMaintenanceStatus);
      if (!underMaintenanceStatus) {
        // console.log("Backend is Down");
        api.dispatch(changeMaintenanceStatus());
      }
    }

    return results;
  },
  endpoints: (builder) => ({}),
});
