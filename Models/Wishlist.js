const mongoose = require("mongoose");

const wishlistSchema = new mongoose.Schema({
  id: {
    type: String,
    trim: true,
  },
  userid: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User", // allows populate for user details
    required: true,
  },
  productid: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Car", // or "Product" depending on your model
    required: true,
  },
});

module.exports = mongoose.model("Wishlist", wishlistSchema);
