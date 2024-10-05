const patientController = require("./../controller/patientController");
const express = require("express");

const router = express.Router();
router.post("/signup", patientController.signUp);
router.post("/login", patientController.login);
module.exports = router;

