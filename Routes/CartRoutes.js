const express = require("express");
const {
  deleteCartItem,
  addCartItem,
  getUserCartItems,
  updateQuantity,
} = require("../Controlers/CartControler");
const router = express.Router();

router.post("/", addCartItem);

router.get("/:userId", getUserCartItems);

router.delete("/", deleteCartItem);

router.put("/", updateQuantity);

module.exports = router;
