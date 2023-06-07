import axios from "axios";
import { server } from "../../server";

// get all orders of user by id
export const getAllOrdersOfUser = (userId) => async (dispatch) => {
  try {
    dispatch({
      type: "getAllOrdersUserRequest",
    });

    const { data } = await axios.get(
      `${server}/order/get-all-orders/${userId}`
    );
    console.log("action");

    dispatch({
      type: "getAllOrdersUserSuccess",
      payload: data.orders,
    });
  } catch (error) {
    dispatch({
      type: "getAllOrdersUserFailed",
      payload: error.response.data.message,
    });
  }
};

// get all the orders of all users
export const getAllOrdersOfAllUsers = () => async (dispatch) => {
  try {
    dispatch({
      type: "getAllUsersOderRequest",
    });

    const { data } = await axios.get(`${server}/order/get-all-orders`);
    dispatch({
      type: "getAllUsersOderSuccess",
      payload: data.orders,
    });
  } catch (error) {
    dispatch({
      type: "getAllUsersOderFailed",
      payload: error.response.data.message,
    });
  }
};

// get all the product from order list
export const getProductListFromOrderList = () => async (dispatch) => {
  try {
    dispatch({
      type: "getProductListFromOrderListRequest",
    });

    const { data } = await axios.get(`${server}/order/get-all-orders`);

    const productListWithQty = data.orders.map((order) => {
      return {
        _id: order.cart[0]._id,
        qty: order.cart[0].qty,
      };
    });

    const productList = [];

    productListWithQty.forEach((element) => {
      let count = 0;
      while (count < element.qty) {
        productList.push(element._id);
        count++;
      }
    });
    dispatch({
      type: "getProductListFromOrderListSuccess",
      payload: productList,
    });
  } catch (error) {
    dispatch({
      type: "getProductListFromOrderListFailed",
      payload: error.response.data.message,
    });
  }
};
// get all orders of seller
export const getAllOrdersOfShop = (shopId) => async (dispatch) => {
  try {
    dispatch({
      type: "getAllOrdersShopRequest",
    });

    const { data } = await axios.get(
      `${server}/order/get-seller-all-orders/${shopId}`
    );

    dispatch({
      type: "getAllOrdersShopSuccess",
      payload: data.orders,
    });
  } catch (error) {
    dispatch({
      type: "getAllOrdersShopFailed",
      payload: error.response.data.message,
    });
  }
};

// get all orders of Admin
export const getAllOrdersOfAdmin = () => async (dispatch) => {
  try {
    dispatch({
      type: "adminAllOrdersRequest",
    });

    const { data } = await axios.get(`${server}/order/admin-all-orders`, {
      withCredentials: true,
    });

    dispatch({
      type: "adminAllOrdersSuccess",
      payload: data.orders,
    });
  } catch (error) {
    dispatch({
      type: "adminAllOrdersFailed",
      payload: error.response.data.message,
    });
  }
};
