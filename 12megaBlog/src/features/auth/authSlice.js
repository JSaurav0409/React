// * Slice for verifying if the user is authenticated or not using store.

import { createSlice } from "@reduxjs/toolkit";

// ? Step 1: Define the initial state
const initialState = {
  status: false,
  userData: null,
};

// ? Step 2: Create the auth slice
const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    // ? Step 3: Define actions

    login: (state, action) => {
      state.status = true;
      state.userData = action.payload.userData;
    },
    logout: (state) => {
      state.status = false;
      state.userData = null;
    },
  },
});

// ? Step 4: Export actions and reducer
export const { login, logout } = authSlice.actions;
export default authSlice.reducer;
