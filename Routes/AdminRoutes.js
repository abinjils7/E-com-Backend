const express = require("express");

const {
  blockUser,
  changeOrderStatus,
  fetchuser,
  fetchOrder,
  addCar,
  removeCar,
  removeUser,
  editProduct,
} = require("../Controlers/AdminControlers");

const router = express.Router();

router.get("/", fetchuser);
router.patch("/", changeOrderStatus);
router.patch("/user", blockUser);
router.get("/order", fetchOrder);
router.post("/", addCar);
router.delete("/", removeCar);
router.delete("/user", removeUser);
router.patch("/product", editProduct);

module.exports = router;
