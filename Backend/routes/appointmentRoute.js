const appointmentController=require('../controller/appointmentController')
const express= require("express");
const router=express.Router();
// router.post("/login",adminController.login);
router.post("/bookAppointment",appointmentController.bookAppointment);

module.exports=router;