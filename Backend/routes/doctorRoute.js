const doctorController=require("../controller/doctorController");
const express= require('express');
const router= express.router();

router.post("/signup",doctorController.signUp);
router.post("/login",doctorController.login);
module.exports=router;


