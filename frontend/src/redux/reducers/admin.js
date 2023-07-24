import { createReducer } from "@reduxjs/toolkit";

const initialState = {
  isAuthenticated: false,
};

export const adminReducer = createReducer(initialState, {
  LoadAdminRequest: (state) => {
    state.loading = true;
  },
  LoadAdminSuccess: (state, action) => {
    // console.log("action.payload ", action.payload);
    state.isAuthenticated = true;
    state.loading = false;
    state.user = action.payload;
  },
  LoadAdminFail: (state, action) => {
    state.loading = false;
    state.error = action.payload;
    state.isAuthenticated = false;
  },
});
