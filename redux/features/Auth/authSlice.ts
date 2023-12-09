import { createSlice } from "@reduxjs/toolkit";
import { stat } from "fs";

const initialState = {
  token: "",
  user: "",
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    userRegistration: (state, action) => {
      state.token = action.payload.acivationToken;
    },
    userLoggedIn: (state, action) => {
      state.token = action.payload.accessToken;
      state.user = action.payload.user;
    },
    userLoggedOut: (state) => {
      state.token = "";
      state.user = "";
    },
    updateUser: (state, action) => {
      state.user = action.payload.user;
    },
  },
});

export const { userRegistration, userLoggedIn, userLoggedOut, updateUser } =
  authSlice.actions;

export default authSlice.reducer;
