import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  status: true,
};

const sidebarSlice = createSlice({
  name: "SideBar",
  initialState,
  reducers: {
    initializeSidebar: (state, action) => {
      // console.log("action.payload = ", action.payload);
      state.status = action.payload;
    },

    changeSidebarStatus: (state, action) => {
      //state.status = action.payload;
      state.status = !state.status;
      localStorage.setItem("sidebar", JSON.stringify({ status: state.status }));
    },
  },
});

export const { initializeSidebar, changeSidebarStatus } = sidebarSlice.actions;
export default sidebarSlice.reducer;
