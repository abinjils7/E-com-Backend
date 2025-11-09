const Wishlist = require("../Models/Wishlist");

const deleteFromWishlist = async (req, res) => {
  try {
    const productid = req.body;
    const deleted = await Wishlist.findOneAndDelete(productid);
    res.json({ message: "Deleted successfully", deleted });
  } catch (error) {
    res.status(500).json({ message: "Error deleting", error });
  }
};
const getUserWishlist = async (req, res) => {
  try {
    const { userid } = req.params;
    if (!userid) {
      return res.status(400).json({ message: "userid is required" });
    }
    const userwishlist = await Wishlist.find({ userid: userid }).populate("productid");

    if (!userwishlist) {
      res.json({ message: "no wishlist fount on this user " });
      console.log("no wishlist user");
    }

    // console.log(" Wishlist:", userwishlist);
    res.json({ wishlist: userwishlist });
  } catch (error) {
    res.status(500).json({ message: "Error fetching items", error });
  }
};

const addWishlist = async (req, res) => {
  try {
    console.log("Received data:", req.body);

    const { userid, productid } = req.body;

    if (!userid || !productid) {
      return res.status(400).json({ message: "userid and productid are required" });
    }

    const isInWishlist = await Wishlist.findOne({  productid });
    if (isInWishlist) {
      return res.status(400).json({ message: "Already in wishlist" });
    }

    const wishlistItem = new Wishlist({ userid, productid });
    await wishlistItem.save();

    res.status(201).json({ message: "Added to wishlist", data: wishlistItem });
  } catch (error) {
    console.error("Error adding to wishlist:", error);
    res.status(500).json({
      message: "Error adding to wishlist",
      error: error.message,
    });
  }
};

module.exports = { deleteFromWishlist, getUserWishlist, addWishlist };
