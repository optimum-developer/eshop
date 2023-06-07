import { createReducer } from "@reduxjs/toolkit";

const initialState = {
  isLoading: true,
};

export const orderReducer = createReducer(initialState, {
  // get all orders of user by userId
  getAllOrdersUserRequest: (state) => {
    state.isLoading = true;
  },
  getAllOrdersUserSuccess: (state, action) => {
    console.log("reducers");
    state.isLoading = false;
    state.orders = action.payload;
  },
  getAllOrdersUserFailed: (state, action) => {
    state.isLoading = false;
    state.error = action.payload;
  },

  //  get all the user's order details
  getAllUsersOderRequest: (state) => {
    state.isLoading = true;
  },

  getAllUsersOderSuccess: (state, action) => {
    state.isLoading = false;
    state.allOrders = action.payload;
  },
  getAllUsersOderFailed: (state) => {
    state.isLoading = false;
  },

  // get product list from orders

  getProductListFromOrderListRequest: (state) => {
    state.isLoading = true;
  },

  getProductListFromOrderListSuccess: (state, action) => {
    state.isLoading = false;
    state.productList = action.payload;
  },

  getProductListFromOrderListFailed: (state) => {
    state.isLoading = false;
  },

  // get all orders of shop
  getAllOrdersShopRequest: (state) => {
    state.isLoading = true;
  },
  getAllOrdersShopSuccess: (state, action) => {
    state.isLoading = false;
    state.orders = action.payload;
  },
  getAllOrdersShopFailed: (state, action) => {
    state.isLoading = false;
    state.error = action.payload;
  },

  // get all orders for admin
  adminAllOrdersRequest: (state) => {
    state.adminOrderLoading = true;
  },
  adminAllOrdersSuccess: (state, action) => {
    state.adminOrderLoading = false;
    state.adminOrders = action.payload;
  },
  adminAllOrdersFailed: (state, action) => {
    state.adminOrderLoading = false;
    state.error = action.payload;
  },

  clearErrors: (state) => {
    state.error = null;
  },
});
