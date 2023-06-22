const mongoose = require("mongoose");

const wishListSchema = new mongoose.Schema({
  userId: {
    type:String,
    required:true,
  },
  product: {
    type:Object,
    required:true,
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
});

module.exports = mongoose.model("Wishlist", wishListSchema);
