import axios from "axios";
import {useDispatch } from "react-redux";
import { setWishlistOnload } from "../redux/reducers/addtowishlist";
import { server } from "../server";
import { useEffect,useState } from "react";

const useGetWishlist = (e) => {
  const [wishlist, setWishlist] = useState([]);
  const dispatch = useDispatch();

  const getUser = async () => {
    try {
      const userData = await axios.get(`${server}/user/getuser`, {
        withCredentials: true,
      });
      return userData.data.user._id;
    } catch (error) {
      // console.log("homepage", error);
    }
  };

  useEffect(() => {
    const fetchWishlist = async () => {
      try {
        const user = await getUser();
        const wishlist = await axios.post(
          `${server}/wishlist/get-wishlist-item`,
          {
            userId: user,
          }
        );
        setWishlist(wishlist.data.wishlistByUserId);
        dispatch(setWishlistOnload(wishlist.data.wishlistByUserId));
      } catch (error) {
        // console.log(error);
      }
    };
    fetchWishlist();
  }, []);
};

export default useGetWishlist;
