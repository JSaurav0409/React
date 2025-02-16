// File for Redux Toolkit (RTK)

import { configureStore } from "@reduxjs/toolkit";
import authSlice from "../features/auth/authSlice";

const store = configureStore({
  reducer: {
    auth: authSlice,
    //TODO: Add more slices here for posts.
  },
});

export default store;
