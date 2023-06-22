import { createReducer } from "@reduxjs/toolkit";
import axios from "axios";
import { server } from "../../server";
import { useDispatch, useSelector } from "react-redux";

const initialState = {
  cart: localStorage.getItem("cartItems")
    ? JSON.parse(localStorage.getItem("cartItems"))
    : [],
};

export const cartReducer = createReducer(initialState, {
  addToCart: async (state, action) => {
    const item = action.payload;
    try {
      const cartItem = await axios.post(`${server}/cart/add-to-cart`, {
        userId: item.userId,
        product: item,
      });
      console.log("cartItem.success:", cartItem.data.success);
      return {
        ...state,
        cart: [...state.cart, item],
      };
    } catch (error) {
      console.log("cartItem ", error.response.data.message);

      // return {
      //   ...state,
      //   cart: state,
      // };
    }
  },

  removeFromCart: async (state, action) => {
    const data = action.payload;
    console.log("data ", data);
    // const cartData = await axios.delete(`${server}/cart/delete-cart-item`, {});

    return {
      ...state,
      cart: state.cart.filter((i) => i._id !== action.payload),
    };
  },
});
