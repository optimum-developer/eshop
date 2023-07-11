const express = require("express");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const Cart = require("../model/cart");
const User = require("../model/user");
const ErrorHandler = require("../utils/ErrorHandler");
const router = express.Router();

// create cart
router.post(
  "/add-to-cart",
  catchAsyncErrors(async (req, res, next) => {
    const { _id } = req.body.product;
    const { userId } = req.body;
    console.log({ _id });
    console.log({ userId });

    try {
      const product = await Cart.findOne({ userId, "product._id": _id });
      if (product) {
        return next(new ErrorHandler("Item already in cart", 400));
      } else {
        cartData = req.body;
        const product = await Cart.create(cartData);

        res.status(201).json({
          success: true,
          message: "item added to cart successfully",
          product,
        });
      }
    } catch (error) {
      return next(new ErrorHandler(error, 400));
    }
  })
);

// get all carts items by userId
router.post("/get-cart-item", async (req, res, next) => {
  const { userId } = req.body;
  try {
    const cartByUserId = await Cart.find({ userId: userId });
    res.status(201).json({
      success: true,
      cartByUserId,
    });
  } catch (error) {
    return next(new ErrorHandler(error, 400));
  }
});

// get product with correspondance id is exist or not
router.post("/get-product-by-id", async (req, res, next) => {
  //   const { id, userId } = req.body.product;
  //   try {
  //     const cart = await Cart.findOne({
  //       $and: [{ userId: userId }, { "product.id": id }],
  //     });
  //     res.status(201).json({
  //       success: true,
  //       cart,
  //     });
  //   } catch (error) {
  //     return next(new ErrorHandler(error, 400));
  //   }
});

// update cart product by id

router.put(
  "/update-cart-qty",
  catchAsyncErrors(async (req, res, next) => {
    try {
      const { userId, productId, qty } = req.body;
      console.log("userId,productId,qty", userId, productId, qty);

      const result = await Cart.updateOne(
        { "product._id": productId },
        { $set: { "product.qty": qty } }
      );
    } catch (error) {
      return next(new ErrorHandler(error, 400));
    }
  })
);
// delete event of a shop
router.delete(
  "/delete-cart-item",
  catchAsyncErrors(async (req, res, next) => {
    try {
      const { productId } = req.body;

      const isItemExit = await Cart.findOne({ "product._id": productId });

      const cart = await Cart.deleteOne({ "product._id": productId });

      if (!isItemExit) {
        return next(new ErrorHandler("Item not in cart!", 500));
      }

      res.status(201).json({
        success: true,
        message: " Item removed from the cart!",
      });
    } catch (error) {
      return next(new ErrorHandler(error, 400));
    }
  })
);

module.exports = router;
