import React from "react";
import { backend_url } from "../../server";
import styles from "../../styles/styles";
import CountDown from "./CountDown";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { setCartOnLoad } from "../../redux/reducers/addtocart";
import { server } from "../../server";
import axios from "axios";

const EventCard = ({ active, data }) => {
  const { isAuthenticated, user } = useSelector((state) => state.user);
  const { items } = useSelector((state) => state.addcart);
  const cartProductList = items.map((el) => el.product);
  const navigate = useNavigate();

  const dispatch = useDispatch();

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
          await axios.post(`${server}/cart/add-to-cart`, {
            userId: user._id,
            product: { ...data, qty: 1 },
          });

          const cartData = await axios.post(`${server}/cart/get-cart-item`, {
            userId: user._id,
          });
          dispatch(setCartOnLoad(cartData.data.cartByUserId));
          toast.success("Item added to cart successfully!");
        } catch (error) {
          toast.error(error.response.data.message);
        }
      }
    }
  };
  return (
    <div
      className={`w-full block bg-white rounded-lg ${
        active ? "unset" : "mb-12"
      } lg:flex p-2`}
    >
      {data && (
        <div className="flex flex-wrap justify-evenly p-6">
          <div className="" style={{ maxWidth: "400px" }}>
            <img src={`${backend_url}${data?.images[0]}`} alt="" />
          </div>
          <div className="basis-1/2 flex flex-col justify-center px-6 py-6">
            <h2 className={`${styles.productTitle}`}>{data?.name}</h2>
            <p>{data?.description}</p>
            <div className="flex py-2 justify-between">
              <div className="flex">
                <h5 className="font-[500] text-[18px] text-[#d55b45] pr-3 line-through">
                  {data?.originalPrice}$
                </h5>
                <h5 className="font-bold text-[20px] text-[#333] font-Roboto">
                  {data?.discountPrice}$
                </h5>
              </div>
              <span className="pr-3 font-[400] text-[17px] text-[#44a55e]">
                {data?.sold_out} sold
              </span>
            </div>
            <CountDown data={data} key={data.name} />
            <br />
            <div className="flex items-center">
              <Link to={`/product/${data?._id}?isEvent=true`}>
                <div className={`${styles.button} text-[#fff]`}>
                  See Details
                </div>
              </Link>
              <div
                className={`${styles.button} text-[#fff] ml-5`}
                onClick={() => addToCartHandler(data)}
              >
                Add to cart
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default EventCard;
