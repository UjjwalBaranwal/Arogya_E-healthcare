const patientController = require("./../controller/patientController");
const express = require("express");

const router = express.Router();
router.get("/getAll", patientController.getAll);
router.get("/getPatient/:id", patientController.getOne);
router.post("/signup", patientController.signUp);
module.exports = router;
