const adminController=require("../controller/adminController");
const express= require("express");
const router=express.Router();
// router.post("/login",adminController.login);
router.post("/signup",adminController.signup);
router.post("/login",adminController.login);
module.exports=router;




