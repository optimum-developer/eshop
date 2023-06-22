import axios from "axios";
import { server } from "../../server";
// add to cart
export const addTocart = (data) => async (dispatch, getState) => {
  dispatch({
    type: "addToCart",
    payload: data,
  });
  // console.log("cart action data", dispatch);
  // console.log("cart action getState", getState);

  // const {data} = await axios.post(`${server}/cart/add-to-cart`,);
  console.log("cart action data", data);
  console.log("cart action getState", JSON.stringify(getState().cart.cart));

  localStorage.setItem("cartItems", JSON.stringify(getState().cart.cart));
  return data;
};

// remove from carterror
export const removeFromCart = (data) => async (dispatch, getState) => {
  console.log("data from aciton redux", data);
  dispatch({
    type: "removeFromCart",
    payload: data._id,
  });
  localStorage.setItem("cartItems", JSON.stringify(getState().cart.cart));
  return data;
};
