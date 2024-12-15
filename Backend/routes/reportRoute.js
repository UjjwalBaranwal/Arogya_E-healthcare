const express = require("express");
// const router=express.Router();
const router = express.Router();
const reportController = require("../controller/reportContorller");

router.post("/createReport", reportController.createMedicalReport);
router.get(
  "/getReportforPatient/:patientId",
  reportController.getMedicalReportByPatient
);
// git add .
// git commit
// git fetch
// git merge
// git push
module.exports = router;
