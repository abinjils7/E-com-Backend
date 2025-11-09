const Cart = require("../Models/Cart");

//  Delete a cart item
const deleteCartItem = async (req, res) => {
  try {
    const { userId, productId } = req.body;

    if (!userId || !productId) {
      return res
        .status(400)
        .json({ success: false, message: "userId and productId are required" });
    }

    const deletedItem = await Cart.findOneAndDelete({ userId, productId });
    if (!deletedItem) {
      return res
        .status(404)
        .json({ success: false, message: "Item not found in cart" });
    }

    return res.status(200).json({
      success: true,
      message: "Item deleted successfully",
      data: deletedItem,
    });
  } catch (error) {
    console.error("❌ Error deleting cart item:", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message,
    });
  }
};

//  Get user's cart items (with populated product details)
const getUserCartItems = async (req, res) => {
  try {
    const { userId } = req.params;

    if (!userId) {
      return res
        .status(400)
        .json({ success: false, message: "userId is required" });
    }

    const userCart = await Cart.find({ userId }).populate("productId");

    return res.status(200).json({
      success: true,
      cart: userCart.length ? userCart : [],
      count: userCart.length,
    });
  } catch (error) {
    console.error("❌ Error fetching cart items:", error);
    return res.status(500).json({
      success: false,
      message: "Error fetching cart items",
      error: error.message,
    });
  }
};

const addCartItem = async (req, res) => {
  try {
    console.log(" Received add-to-cart data:", req.body);
    const { userId, productId, quantity = 1 } = req.body;

    if (!userId || !productId) {
      return res
        .status(400)
        .json({ success: false, message: "userId and productId are required" });
    }

    const existingItem = await Cart.findOne({ userId, productId });
    if (existingItem) {
      return res.status(200).json({
        success: true,
        message: "Already in cart",
        data: existingItem,
      });
    }

    const newCartItem = new Cart({ userId, productId, quantity });
    await newCartItem.save();

    const populatedItem = await newCartItem.populate("productId");

    console.log(" Added to cart:", populatedItem);
    return res.status(201).json({
      success: true,
      message: "Added to cart successfully",
      data: populatedItem,
    });
  } catch (error) {
    console.error(" Error adding to cart:", error);
    return res.status(500).json({
      success: false,
      message: "Error adding to cart",
      error: error.message,
    });
  }
};

const updateQuantity = async (req, res) => {
  try {
    const { userId, productId,change } = req.body;

    if (!userId || !productId) {
      return res
        .status(400)
        .json({ message: "userId and productId are required" });
    }

    const cartItem = await Cart.findOne({ userId, productId });

    if (!cartItem) {
      return res.status(404).json({ message: "Cart item not found" });
    }

    cartItem.quantity += change;
    await cartItem.save();

    res.json({ message: "Quantity updated", cartItem });
  } catch (error) {
    console.error("Error updating quantity:", error);
    res.status(500).json({ message: "Error updating quantity", error });
  }
};

module.exports = {
  deleteCartItem,
  getUserCartItems,
  addCartItem,
  updateQuantity,
};
