const doctorController=require("../controller/doctorController");
const express= require('express');
const router= express.Router();

router.post("/signup",doctorController.signup);
router.post("/login",doctorController.login);
router.post("/logout",doctorController.logout);
module.exports=router;


