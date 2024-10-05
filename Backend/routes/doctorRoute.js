const doctorController = require("../controller/doctorController");
const express = require("express");
const router = express.Router();

router.get("/getOne/:id", doctorController.getOne);//cotrrect
router.get("/getAll", doctorController.getAll); //correct
router.get("/getSpecialist/:specialist", doctorController.getSpecialist);
router.get("/doctor-within/:distance/:latlng", doctorController.getDoctorWithin);
router.post("/signup", doctorController.signup);
router.post("/login", doctorController.login);
router.post("/logout", doctorController.logout);
module.exports = router;
