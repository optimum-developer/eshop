import { createSlice } from "@reduxjs/toolkit";

const addToWishlist = createSlice({
  name: "addwishlist",
  initialState: {
    wishlist: [],
  },
  reducers: {
    setWishlistOnload: (state, action) => {
      state.wishlist = action.payload;
    },
  },
});

export const { setWishlistOnload } = addToWishlist.actions;
export default addToWishlist.reducer;
