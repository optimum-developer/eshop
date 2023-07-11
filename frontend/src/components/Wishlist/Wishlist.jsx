import React, { useState } from "react";
import { RxCross1 } from "react-icons/rx";
import { IoBagHandleOutline } from "react-icons/io5";
import { BsCartPlus } from "react-icons/bs";
import styles from "../../styles/styles";
import { Link } from "react-router-dom";
import { AiOutlineHeart } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { removeFromWishlist } from "../../redux/actions/wishlist";
import { backend_url } from "../../server";
import { addTocart } from "../../redux/actions/cart";
import { toast } from "react-toastify";
import axios from "axios";
import { server } from "./../../server";
import useGetWishlist from "../../utils/useGetWishlist";
import { setWishlistOnload } from "../../redux/reducers/addtowishlist";
import { setCartOnLoad } from "../../redux/reducers/addtocart";

const Wishlist = ({ setOpenWishlist }) => {
  // const { wishlist } = useSelector((state) => state.wishlist);
  const { wishlist } = useSelector((state) => state.addwishlist);
  const { user } = useSelector((state) => state.user);
  const { items } = useSelector((state) => state.addcart);

  const cartProductList = items.map((el) => el.product);
  const wishlistProduct = wishlist.map((el) => el.product);

  const dispatch = useDispatch();
  const wishlistData = useGetWishlist();
  const userId = user._id;

  const removeFromWishlistHandler = async (data) => {
    try {
      const wishlistData = await axios.delete(
        `${server}/wishlist/delete-wishlist-item`,
        {
          data: {
            productId: data._id,
          },
        }
      );
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
  const addToCartHandler = async (data) => {
    const id = data._id;
    const isItemExists =
      cartProductList && cartProductList.find((i) => i._id === id);
    if (isItemExists) {
      toast.error("Item already in cart! wishlist add to cart");
    } else {
      if (data.stock < 1) {
        toast.error("Product stock limited! wishlist add to cart");
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

          // update redux initial state
          const wishlistData = await axios.post(
            `${server}/wishlist/get-wishlist-item`,
            {
              userId: userId,
            }
          );
          dispatch(setWishlistOnload(wishlistData.data.wishlistByUserId));
        } catch (error) {
          toast.error(error.response.data.message);
        }
      }
    }
    console.log("wishlist page");
    return <h1>wishlist</h1>;

    // return;

    // dispatch(removeFromWishlist(data));

    // const newData = { ...data, qty: 1 };
    // dispatch(addTocart(newData));
    // setOpenWishlist(false);
  };

  return (
    <div className="fixed top-0 left-0 w-full bg-[#0000004b] h-screen z-10">
      <div className="fixed top-0 right-0 h-full w-[80%] overflow-y-scroll 800px:w-[25%] bg-white flex flex-col justify-between shadow-sm">
        {wishlist && wishlist.length === 0 ? (
          <div className="w-full h-screen flex items-center justify-center">
            <div className="flex w-full justify-end pt-5 pr-5 fixed top-3 right-3">
              <RxCross1
                size={25}
                className="cursor-pointer"
                onClick={() => setOpenWishlist(false)}
              />
            </div>
            <h5>Wishlist Items is empty!</h5>
          </div>
        ) : (
          <>
            <div>
              <div className="flex w-full justify-end pt-5 pr-5">
                <RxCross1
                  size={25}
                  className="cursor-pointer"
                  onClick={() => setOpenWishlist(false)}
                />
              </div>
              {/* Item length */}
              <div className={`${styles.noramlFlex} p-4`}>
                <AiOutlineHeart size={25} />
                <h5 className="pl-2 text-[20px] font-[500]">
                  {wishlist && wishlist.length} items
                </h5>
              </div>

              {/* cart Single Items */}
              <br />
              <div className="w-full border-t">
                {wishlistProduct &&
                  wishlistProduct.map((i, index) => (
                    <CartSingle
                      key={index}
                      data={i}
                      removeFromWishlistHandler={removeFromWishlistHandler}
                      addToCartHandler={addToCartHandler}
                    />
                  ))}
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

const CartSingle = ({ data, removeFromWishlistHandler, addToCartHandler }) => {
  const [value, setValue] = useState(1);
  const totalPrice = data.discountPrice * value;

  return (
    <div className="border-b p-4">
      <div className="w-full 800px:flex items-center">
        <RxCross1
          size={25}
          className="font-bold cursor-pointer 800px:mb-['unset'] 800px:ml-['unset'] mb-2 ml-2"
          onClick={() => removeFromWishlistHandler(data)}
        />
        <img
          src={`${backend_url}${data?.images[0]}`}
          alt=""
          className="w-[130px] h-min ml-2 mr-2 rounded-[5px]"
        />

        <div className="pl-[5px]">
          <h1>{data.name}</h1>
          <h4 className="font-[600] pt-3 800px:pt-[3px] text-[17px] text-[#d02222] font-Roboto">
            US${totalPrice}
          </h4>
        </div>
        <div>
          <BsCartPlus
            size={20}
            className="cursor-pointer"
            tile="Add to cart"
            onClick={() => addToCartHandler(data)}
          />
        </div>
      </div>
    </div>
  );
};

export default Wishlist;
