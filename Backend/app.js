const path = require("path");
const morgan = require("morgan");
const express = require("express");
const helmet = require("helmet");
const cookieParser = require("cookie-parser");
const app = express();
app.use(express.json());

// All router import
const patientRouter = require("./routes/patientRoute");
const doctorRouter=require("./routes/doctorRoute");
const adminRouter=require("./routes/adminRouter");
// Route setting
app.use("/api/v1/patient", patientRouter);
app.use("/api/v1/doctor",doctorRouter);
app.use("/api/v1/admin",adminRouter);
module.exports = app;
