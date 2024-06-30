import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  status: true,
};

const sidebarSlice = createSlice({
  name: 'SideBar',
  initialState,
  reducers: {
    changeSidebarStatus: (state, action) => {
      //state.status = action.payload;
      state.status = !state.status;
    },
  },
});

export const { changeSidebarStatus } = sidebarSlice.actions;
export default sidebarSlice.reducer;
