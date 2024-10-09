const express=require("express");
// const router=express.Router();
const router = express.Router();
const reportController= require("../controller/reportContorller")


router.post("/createReport",reportController.createReport);
router.get("/getAllReports/:id",reportController.getAllReports);
router.get("/getReportById/:id",reportController.getReportById);
router.get("/getReportsByDoctor/:id",reportController.getReportsByDoctor);
router.delete("/deleteReport/:id",reportController.deleteReport);
router.patch("/updateReport/:id",reportController.updateReport);

// git add .
// git commit 
// git fetch
// git merge 
// git push
module.exports=router;