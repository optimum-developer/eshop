import React, { useEffect, useState } from "react";
import {
  AiFillHeart,
  AiOutlineHeart,
  AiOutlineMessage,
  AiOutlineShoppingCart,
} from "react-icons/ai";
import { RxCross1 } from "react-icons/rx";
import { Link, useNavigate } from "react-router-dom";
import { backend_url } from "../../../server";
import styles from "../../../styles/styles";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";

import axios from "axios";
import { server } from "../../../server";
import { setCartOnLoad } from "../../../redux/reducers/addtocart";
import { setWishlistOnload } from "../../../redux/reducers/addtowishlist";

const ProductDetailsCard = ({ setOpen, data }) => {
  const { wishlist } = useSelector((state) => state.addwishlist);
  const { isAuthenticated, user } = useSelector((state) => state.user);
  const { items } = useSelector((state) => state.addcart);
  const cartProductList = items.map((el) => el.product);
  const wishlistProduct = wishlist.map((el) => el.product);

  const userId = user?._id;
  const dispatch = useDispatch();
  const [count, setCount] = useState(1);
  const [click, setClick] = useState(false);
  const navigate = useNavigate();

  const handleMessageSubmit = () => {};

  const decrementCount = () => {
    if (count > 1) {
      setCount(count - 1);
    }
  };

  const incrementCount = () => {
    setCount(count + 1);
  };

  const addToCartHandler = async (id) => {
    if (!isAuthenticated) navigate("/login");

    const isItemExists =
      cartProductList && cartProductList.find((i) => i._id === id);
    if (isItemExists) {
      toast.error("Item already in cart!");
    } else {
      if (data.stock < 1) {
        toast.error("Product stock limited!");
      } else {
        try {
          await axios.post(`${server}/cart/add-to-cart`, {
            userId: user._id,
            product: { ...data, qty: 1 },
          });

          const cartData = await axios.post(`${server}/cart/get-cart-item`, {
            userId: userId,
          });
          dispatch(setCartOnLoad(cartData.data.cartByUserId));
          toast.success("Item added to cart successfully!");
        } catch (error) {
          toast.error(error.response.data.message);
        }
      }
    }

    // return;
  };

  const removeFromWishlistHandler = async (data) => {
    setClick(!click);
    try {
      await axios.delete(`${server}/wishlist/delete-wishlist-item`, {
        data: {
          userId: user._id,
          productId: data._id,
        },
      });
      toast.success("item deleted from wishlist");
    } catch (error) {
      console.log(error);
    }

    // update redux initial state
    const wishlistData = await axios.post(
      `${server}/wishlist/get-wishlist-item`,
      {
        userId: userId,
      }
    );
    dispatch(setWishlistOnload(wishlistData.data.wishlistByUserId));
    // dispatch(removeFromWishlist(data));
  };

  const addToWishlistHandler = async (data) => {
    if (!isAuthenticated) navigate("/login");
    setClick(!click);
    try {
      await axios.post(`${server}/wishlist/add-to-wishlist`, {
        userId: user._id,
        product: data,
      });

      const wishlistData = await axios.post(
        `${server}/wishlist/get-wishlist-item`,
        {
          userId: userId,
        }
      );
      dispatch(setWishlistOnload(wishlistData.data.wishlistByUserId));
      toast.success("Item added to wishlist successfully!");
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  useEffect(() => {
    if (wishlistProduct && wishlistProduct.find((i) => i._id === data._id)) {
      setClick(true);
    } else {
      setClick(false);
    }
  }, [wishlist]);

  return (
    <div className="bg-[#fff]">
      {data ? (
        <div className="fixed w-full h-screen top-0 left-0 bg-[#00000030] z-40 flex items-center justify-center">
          <div className="w-[90%] 800px:w-[60%] h-[90vh] overflow-y-scroll 800px:h-[75vh] bg-white rounded-md shadow-sm relative p-4">
            <RxCross1
              size={30}
              className="absolute right-3 top-3 z-50"
              onClick={() => setOpen(false)}
            />

            <div className="block w-full 800px:flex">
              <div className="w-full 800px:w-[50%]">
                <img
                  src={`${backend_url}${data.images && data.images[0]}`}
                  alt=""
                />
                <div className="flex">
                  <Link to={`/shop/preview/${data.shop._id}`} className="flex">
                    <img
                      src={`${backend_url}${data?.shop?.avatar}`}
                      alt=""
                      className="w-[50px] h-[50px] rounded-full mr-2"
                    />
                    <div>
                      <h3 className={`${styles.shop_name}`}>
                        {data.shop.name}
                      </h3>
                      <h5 className="pb-3 text-[15px]">(4.5) Ratings</h5>
                    </div>
                  </Link>
                </div>
                <div
                  className={`${styles.button} bg-[#000] mt-4 rounded-[4px] h-11`}
                  onClick={handleMessageSubmit}
                >
                  <span className="text-[#fff] flex items-center">
                    Send Message <AiOutlineMessage className="ml-1" />
                  </span>
                </div>
                <h5 className="text-[16px] text-[red] mt-5">(50) Sold out</h5>
              </div>

              <div className="w-full 800px:w-[50%] pt-5 pl-[5px] pr-[5px]">
                <h1 className={`${styles.productTitle} text-[20px]`}>
                  {data.name}
                </h1>
                <p>{data.description}</p>

                <div className="flex pt-3">
                  <h4 className={`${styles.productDiscountPrice}`}>
                    {data.discountPrice}$
                  </h4>
                  <h3 className={`${styles.price}`}>
                    {data.originalPrice ? data.originalPrice + "$" : null}
                  </h3>
                </div>
                <div className="flex items-center mt-12 justify-between pr-3">
                  <div>
                    <button
                      className="bg-gradient-to-r from-teal-400 to-teal-500 text-white font-bold rounded-l px-4 py-2 shadow-lg hover:opacity-75 transition duration-300 ease-in-out"
                      onClick={decrementCount}
                    >
                      -
                    </button>
                    <span className="bg-gray-200 text-gray-800 font-medium px-4 py-[11px]">
                      {count}
                    </span>
                    <button
                      className="bg-gradient-to-r from-teal-400 to-teal-500 text-white font-bold rounded-l px-4 py-2 shadow-lg hover:opacity-75 transition duration-300 ease-in-out"
                      onClick={incrementCount}
                    >
                      +
                    </button>
                  </div>
                  <div>
                    {click ? (
                      <AiFillHeart
                        size={30}
                        className="cursor-pointer"
                        onClick={() => removeFromWishlistHandler(data)}
                        color={click ? "red" : "#333"}
                        title="Remove from wishlist"
                      />
                    ) : (
                      <AiOutlineHeart
                        size={30}
                        className="cursor-pointer"
                        onClick={() => addToWishlistHandler(data)}
                        title="Add to wishlist"
                      />
                    )}
                  </div>
                </div>
                <div
                  className={`${styles.button} mt-6 rounded-[4px] h-11 flex items-center`}
                  onClick={() => addToCartHandler(data._id)}
                >
                  <span className="text-[#fff] flex items-center">
                    Add to cart <AiOutlineShoppingCart className="ml-1" />
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default ProductDetailsCard;
