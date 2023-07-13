import React, { useState } from "react";
import {
  AiFillHeart,
  AiFillStar,
  AiOutlineEye,
  AiOutlineHeart,
  AiOutlineShoppingCart,
  AiOutlineStar,
} from "react-icons/ai";
import { Link, useNavigate } from "react-router-dom";
import { backend_url, server } from "../../../server";
import styles from "../../../styles/styles";
import { useDispatch, useSelector } from "react-redux";
import ProductDetailsCard from "../ProductDetailsCard/ProductDetailsCard";
import {
  addToWishlist,
  removeFromWishlist,
} from "../../../redux/actions/wishlist";

import { getProductListFromOrderList } from "../../../redux/actions/order";
import { useEffect } from "react";
import { addTocart } from "../../../redux/actions/cart";
import { toast } from "react-toastify";
import Ratings from "../../Products/Ratings";
import axios from "axios";
import useGetCart from "../../../utils/useGetCart";
import useGetWishlist from "../../../utils/useGetWishlist";

import { setCartOnLoad } from "../../../redux/reducers/addtocart";
import { setWishlistOnload } from "../../../redux/reducers/addtowishlist";

const ProductCard = ({ data, isEvent }) => {
  // const { wishlist } = useSelector((state) => state.wishlist);
  const { isAuthenticated, user } = useSelector((state) => state.user);
  const { productList } = useSelector((state) => state.order);
  const { cart } = useSelector((state) => state.cart);

  const [open, setOpen] = useState(false);
  const dispatch = useDispatch();
  const userId = user?._id;
  const [watch, setWatch] = useState();
  const { items } = useSelector((state) => state.addcart);
  const { wishlist } = useSelector((state) => state.addwishlist);
  const cartProductList = items.map((el) => el.product);
  const wishlistProductName = wishlist.map((el) => el.product);

  const [click, setClick] = useState(false);
  const navigate = useNavigate();

  // console.log({ isAuthenticated });

  const removeFromWishlistHandler = async (data) => {
    setClick(!click);
    console.log("removeFromWishlistHandle data._id,", data._id);
    try {
      const wishlist = await axios.delete(
        `${server}/wishlist/delete-wishlist-item`,
        {
          data: {
            userId: userId,
            productId: data._id,
          },
        }
      );

      const wishlistData = await axios.post(
        `${server}/wishlist/get-wishlist-item`,
        {
          userId: userId,
        }
      );
      dispatch(setWishlistOnload(wishlistData.data.wishlistByUserId));
      toast.success("Item deleted to wishlist successfully!");
    } catch (error) {
      toast.error(error.response.data.message);
    }

    // dispatch(removeFromWishlist(data));
  };

  const addToWishlistHandler = async (data) => {
    if (!isAuthenticated) {
      console.log("not authenticated");
      navigate("/login");
    }
    setClick(!click);
    try {
      const wishlist = await axios.post(`${server}/wishlist/add-to-wishlist`, {
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

  const cartData = useGetCart();
  const wishlistData = useGetWishlist();

  const addToCartHandler = async (id) => {
    if (!isAuthenticated) {
      navigate("/login");
    }
    const isItemExists =
      cartProductList && cartProductList.find((i) => i._id === id);
    if (isItemExists) {
      toast.error("Item already in cart!");
    } else {
      if (data.stock < 1) {
        toast.error("Product stock limited!");
      } else {
        try {
          const cart = await axios.post(`${server}/cart/add-to-cart`, {
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

  useEffect(() => {
    if (
      wishlistProductName &&
      wishlistProductName.find((i) => i._id === data._id)
    ) {
      setClick(true);
    } else {
      setClick(false);
    }
  }, [wishlist]);

  useEffect(() => {
    dispatch(getProductListFromOrderList());
  }, []);

  return (
    <>
      <div className="w-full h-[370px] bg-white rounded-lg shadow-sm p-3 relative cursor-pointer">
        <div className="flex justify-end"></div>
        <Link
          to={`${
            isEvent === true
              ? `/product/${data._id}?isEvent=true`
              : `/product/${data._id}`
          }`}
        >
          <img
            src={`${backend_url}${data.images && data.images[0]}`}
            alt=""
            className="w-full h-[170px] object-contain transition ease-in-out delay-150  hover:scale-110 duration-300"
          />
        </Link>
        <Link to={`/shop/preview/${data?.shop._id}`} target="_blank">
          <h5 className={`${styles.shop_name}`}>{data.shop.name}</h5>
        </Link>
        <Link
          to={`${
            isEvent === true
              ? `/product/${data._id}?isEvent=true`
              : `/product/${data._id}`
          }`}
          target="_blank"
        >
          <h4 className="pb-3 font-[500]">
            {data.name.length > 40 ? data.name.slice(0, 40) + "..." : data.name}
          </h4>

          <div className="flex">
            <Ratings rating={data?.ratings} />
          </div>

          <div className="py-2 flex items-center justify-between">
            <div className="flex">
              <h5 className={`${styles.productDiscountPrice}`}>
                {data.originalPrice === 0
                  ? data.originalPrice
                  : data.discountPrice}
                $
              </h5>
              <h4 className={`${styles.price}`}>
                {data.originalPrice ? data.originalPrice + " $" : null}
              </h4>
            </div>
            <span className="font-[400] text-[17px] text-[#68d284]">
              {productList?.filter((x) => x === data._id).length}
              &nbsp; sold
            </span>
          </div>
        </Link>

        {/* side options */}
        <div>
          {click ? (
            <AiFillHeart
              size={22}
              className="cursor-pointer absolute right-2 top-5"
              onClick={() => removeFromWishlistHandler(data)}
              color={click ? "red" : "#333"}
              title="Remove from wishlist"
            />
          ) : (
            <AiOutlineHeart
              size={22}
              className="cursor-pointer absolute right-2 top-5"
              onClick={() => addToWishlistHandler(data)}
              color={click ? "red" : "#333"}
              title="Add to wishlist"
            />
          )}
          <AiOutlineEye
            size={22}
            className="cursor-pointer absolute right-2 top-14"
            onClick={() => setOpen(!open)}
            color="#333"
            title="Quick view"
          />
          <AiOutlineShoppingCart
            size={25}
            className="cursor-pointer absolute right-2 top-24"
            onClick={() => addToCartHandler(data._id)}
            color="#444"
            title="Add to cart"
          />
          {open ? <ProductDetailsCard setOpen={setOpen} data={data} /> : null}
        </div>
      </div>
    </>
  );
};

export default ProductCard;
