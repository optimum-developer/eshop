const express = require("express");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const Wishlist = require("../model/wishlist");
const User = require("../model/user");
const ErrorHandler = require("../utils/ErrorHandler");
const router = express.Router();

// create cart
router.post(
  "/add-to-wishlist",
  catchAsyncErrors(async (req, res, next) => {
    const { _id } = req.body.product;
    try {
      const product = await Wishlist.findOne({ "product._id": _id });
      if (product) {
        return next(new ErrorHandler("Item already in wishlist", 400));
      } else {
        wishlistData = req.body;
        const product = await Wishlist.create(wishlistData);

        res.status(201).json({
          success: true,
          message: "item added to wishlist successfully",
          product,
        });
      }
    } catch (error) {
      return next(new ErrorHandler(error, 400));
    }
  })
);

// get all wishlist items by userId
router.post("/get-wishlist-item", async (req, res, next) => {
  const { userId } = req.body;
  try {
    const wishlistByUserId = await Wishlist.find({ userId: userId });
    res.status(201).json({
      success: true,
      wishlistByUserId,
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
  "/update-wishlist-qty",
  catchAsyncErrors(async (req, res, next) => {
    try {
      const { userId, productId, qty } = req.body;
      console.log("userId,productId,qty", userId, productId, qty);

      const result = await Wishlist.updateOne(
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
  "/delete-wishlist-item",
  catchAsyncErrors(async (req, res, next) => {
    try {
      const { productId } = req.body;
      console.log("delete-wishlist-item controller productId",productId);

      const isItemExit = await Wishlist.findOne({ "product._id": productId });

      const wishlist = await Wishlist.deleteOne({ "product._id": productId });

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
