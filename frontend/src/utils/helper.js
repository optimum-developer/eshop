import { server } from "../server";
import axios from "axios";
import { setCartOnLoad } from "../redux/reducers/addtocart";
import { useDispatch } from "react-redux";
import { setWishlistOnload } from "../redux/reducers/addtowishlist";
import { toast } from "react-toastify";

export const updateCart = async (userId) => {
  const cart = await axios.post(`${server}/cart/get-cart-item`, {
    userId: userId,
  });

  return cart;
};
