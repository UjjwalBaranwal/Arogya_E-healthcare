const patientController = require("./../controller/patientController");
const express = require("express");

const router = express.Router();
router.post("/signup", patientController.signUp);
module.exports = router;
