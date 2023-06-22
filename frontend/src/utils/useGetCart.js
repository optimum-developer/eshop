import { useEffect, useState } from "react";
import axios from "axios";
import { server } from "../server";
import { setCartOnLoad } from "../redux/reducers/addtocart";
import { useSelector, useDispatch } from "react-redux";

const useGetCart = () => {
  const [cart, setCart] = useState([]);
  const dispatch = useDispatch();

  const getUser = async () => {
    try {
      const userData = await axios.get(`${server}/user/getuser`, {
        withCredentials: true,
      });
      return userData.data.user._id;
    } catch (error) {
      console.log("homepage", error);
    }
  };

  useEffect(() => {
    const fetch = async () => {
      try {
        const userId = await getUser();
        const cart = await axios.post(`${server}/cart/get-cart-item`, {
          userId: userId,
        });
        setCart(cart.data.cartByUserId);
        dispatch(setCartOnLoad(cart.data.cartByUserId));
      } catch (error) {
        console.log("Error :", error);
      }
    };
    fetch();
  }, []);

  return cart;
};

export default useGetCart;
