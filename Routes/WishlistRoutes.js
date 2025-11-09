const express=require("express");
const {getUserWishlist,addWishlist,deleteFromWishlist}=require("../Controlers/WishlistControlers");
const router=express.Router();


router.get("/:userid",getUserWishlist);
router.post("/",addWishlist);
router.delete("/",deleteFromWishlist);

module.exports=router;