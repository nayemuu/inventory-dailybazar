/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  name: '',
  email: '',
};

const profileSlice = createSlice({
  name: 'profile',
  initialState,
  reducers: {
    initiateProfileInfo: (state, action) => {
      // console.log('authSlice.reducer, userLoggedIn action.payload = ', action.payload)
      state.name = action.payload.name;
      state.email = action.payload.email;
    },

    clearProfileInfo: () => {
      state.name = '';
      state.email = '';
    },
  },
});

export const { initiateProfileInfo, clearProfileInfo } = profileSlice.actions;
export default profileSlice.reducer;
