const express = require("express");
// const Authentication = require("../Controlers/Auth");
const {Login,register}=require("../Controlers/Auth")

const router = express.Router();

router.post("/login", Login);
router.post("/Register", register);


// const authroutes=router

module.exports=router