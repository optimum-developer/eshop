import { useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { setCartOnLoad } from "../redux/reducers/addtocart";

import { AiOutlineShoppingCart, AiFillStar } from "react-icons/ai";

import Ratings from "./Products/Ratings";
import { backend_url } from "../server";
import { server } from "../server";
import axios from "axios";

const SellerProductListing = () => {
  const { user, isAuthenticated } = useSelector((state) => state.user);
  const { allProducts } = useSelector((state) => state.products);
  const userId = user?._id;

  const { items } = useSelector((state) => state.addcart);
  const cartProductList = items.map((el) => el.product);

  const dispatch = useDispatch();

  const { id } = useParams();

  const product = allProducts.filter((prod) => prod._id === id);
  const navigate = useNavigate();

  const sellerList = allProducts.filter(
    (prod) => prod.asin === product[0].asin
  );

  const addToCartHandler = async (id, data) => {
    if (!isAuthenticated) {
      navigate("/login");
    }
    const isItemExists =
      cartProductList && cartProductList.find((i) => i._id === id);
    if (isItemExists) {
      toast.error("Item already in cart!");
    } else {
      if (data?.stock < 1) {
        console.log("if");
        toast.error("Product stock limited!");
      } else {
        console.log("else");

        try {
          await axios.post(`${server}/cart/add-to-cart`, {
            userId: user._id,
            product: { ...data, qty: 1 },
          });
          const cartData = await axios.post(`${server}/cart/get-cart-item`, {
            userId: userId,
          });
          dispatch(setCartOnLoad(cartData.data.cartByUserId));
          toast.success("Item added to cart successfully new!");
        } catch (error) {
          toast.error(error.response.data.message);
        }
      }
    }

    // return;
  };
  return (
    <>
      {sellerList && (
        <div class="container mx-auto text-center mt-[100px]">
          <div className="flex justify-between">
            <h1 className="text-4xl px-4 text-left">All Sellers</h1>
            <div className="flex  gap-4">
              <div className="flex flex-col gap-2">
                <p className="w-48 truncate">{sellerList[0].name}</p>
                <div className="flex">
                  <span className="w-14 fw-semibold text-sm  text-white bg-[#388e3c] flex justify-center items-center gap-1">
                    <span>
                      {sellerList[0].ratings
                        ? sellerList[0].ratings.toFixed(1)
                        : "0.0"}
                    </span>
                    <AiFillStar color="white" />
                  </span>

                  <span className="text-gray-400 px-2">
                    (&nbsp;&nbsp;{sellerList[0]?.reviews?.length}&nbsp;&nbsp;)
                  </span>
                </div>
              </div>

              {sellerList[0].images[0] && (
                <img
                  src={`${backend_url}/${sellerList[0].images[0]}`}
                  className="w-[50px]"
                  alt="seller-img"
                />
              )}
            </div>
          </div>
          <div class="grid grid-cols-3 gap-4  text-gray-500">
            <div class="col-3 text-left py-4">
              <p>Seller</p>
            </div>
            <div class="col-3 text-left py-4">
              <p>Price</p>
            </div>
            <div class="col-6 text-left py-4">
              <p>Delivery</p>
            </div>
          </div>
          {sellerList.map((product, index) => (
            <div
              class="grid grid-cols-1  sm:gap-4 sm:grid-cols-3 border border-t-slate-50"
              key={index}
            >
              <div class="col  sm:p-4">
                <p className="font-bold text-start mb-1 text-blue-600">
                  {product.shop.name}
                </p>
                <div className="mb-2">
                  <Ratings rating={product.rating} />
                </div>
                <p className="font-semi-bold text-start mb-2 text-grey-300">
                  {product.shop.address}
                </p>
              </div>
              <div class="col  px-2 sm:p-4 text-left">
                <span className="font-medium text-grey-200">
                  ${product.discountPrice}
                </span>
                <span className="font-normal text-slate-500">
                  {" "}
                  <s>${product.originalPrice}</s>
                </span>
                <span className="font-medium text-[#388e3c] text-[13px]">
                  {" "}
                  {Math.round(
                    (product.originalPrice - product.discountPrice) / 100
                  )}
                  % off
                </span>
              </div>
              <div class="col p-4 text-center  sm:text-left">
                <div
                  className={`w-[150px] bg-black h-[50px]  flex  justify-center rounded-xl cursor-pointer`}
                  onClick={() => addToCartHandler(product._id, product)}
                >
                  <span className="text-white flex items-center">
                    Add to cart <AiOutlineShoppingCart className="ml-1" />
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </>
  );
};

export default SellerProductListing;
