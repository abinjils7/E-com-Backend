const express = require("express");
// const User = require("../Models/User")
const { getUsers, addUser } = require("../Controlers/Usercontrolers");
const router = express.Router();

router.get("/", getUsers);

router.post("/", addUser);

module.exports = router;
