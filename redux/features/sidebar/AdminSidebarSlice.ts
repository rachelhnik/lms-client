import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  selected: "Dashboard",
  collapsed: false,
};

const adminSidebarSlice = createSlice({
  name: "adminSidebar",
  initialState,
  reducers: {
    setSelectedName: (state, action) => {
      state.selected = action.payload;
    },
    setIsCollapsed: (state, action) => {
      state.collapsed = action.payload;
    },
  },
});

export const { setSelectedName, setIsCollapsed } = adminSidebarSlice.actions;

export const getSelectedNmae = (state: any) => state.adminSidebar.selected;

export const getIsCollapsed = (state: any) => state.adminSidebar.collapsed;

export default adminSidebarSlice.reducer;
