/* eslint-disable no-param-reassign */
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  underMaintenanceStatus: false,
};

const maintenanceSlice = createSlice({
  name: "maintenance",
  initialState,
  reducers: {
    changeMaintenanceStatus: (state, action) => {
      // console.log('MaintenanceSlice.reducer, userLoggedIn action.payload = ', action.payload)
      state.underMaintenanceStatus = true;
    },
  },
});

export const { changeMaintenanceStatus } = maintenanceSlice.actions;
export default maintenanceSlice.reducer;
