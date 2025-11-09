const express = require("express");
// const Car = require("../Models/Cars");
const { getCars, addCar } = require("../Controlers/CarControllers");
const router = express.Router();

router.get("/", getCars);

module.exports = router;
