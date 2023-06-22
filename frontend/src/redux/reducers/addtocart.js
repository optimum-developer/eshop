import { createSlice } from "@reduxjs/toolkit";

const addToCartSlice = createSlice({
  name: "addcart",
  initialState: {
    items: [],
  },
  reducers: {
    addToCart: (state, action) => {
      state.items.push(action.payload);
    },
    removeToCart: (state, action) => {
      state.items.pop();
    },
    setCartOnLoad: (state, action) => {
      state.items = action.payload;
    },
  },
});

export default addToCartSlice.reducer;
export const { addToCart, removeToCart, setCartOnLoad } =
  addToCartSlice.actions;
