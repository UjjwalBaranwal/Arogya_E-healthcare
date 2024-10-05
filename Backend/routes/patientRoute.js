const patientController = require("./../controller/patientController");
const express = require("express");

const router = express.Router();
router.get("/getAll", patientController.getAll);
router.get("/getOne/:id", patientController.getOne);
router.post("/signup", patientController.signUp);
router.post("/login", patientController.login);
module.exports = router;

