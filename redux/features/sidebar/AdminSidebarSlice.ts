import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  selected: "Dashboard",
};

const adminSidebarSlice = createSlice({
  name: "adminSidebar",
  initialState,
  reducers: {
    setSelectedName: (state, action) => {
      state.selected = action.payload;
    },
  },
});

export const { setSelectedName } = adminSidebarSlice.actions;

export const getSelectedNmae = (state: any) => state.adminSidebar.selected;

export default adminSidebarSlice.reducer;
