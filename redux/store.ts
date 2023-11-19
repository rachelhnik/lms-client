"use client";

import { configureStore } from "@reduxjs/toolkit";
import { apiSlice } from "./features/api/apiSlice";
import authSlice from "./features/Auth/authSlice";
import AdminSidebarSlice from "./features/sidebar/AdminSidebarSlice";

export const store = configureStore({
  reducer: {
    auth: authSlice,
    adminSidebar: AdminSidebarSlice,
    [apiSlice.reducerPath]: apiSlice.reducer,
  },
  devTools: false,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiSlice.middleware),
});

//call the refresh token function on every page laod

const initializeApp = async () => {
  await store.dispatch(
    apiSlice.endpoints.loadUser.initiate({}, { forceRefetch: true })
  );
};

initializeApp();
