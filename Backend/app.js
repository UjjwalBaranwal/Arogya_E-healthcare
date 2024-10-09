const path = require("path");
const morgan = require("morgan");
const express = require("express");
const helmet = require("helmet");
const cookieParser = require("cookie-parser");
const app = express();
const cors=require("cors");
app.use(cors());
app.use(express.json());
app.use(morgan())
// All router import
const patientRouter = require("./routes/patientRoute");
const doctorRouter=require("./routes/doctorRoute");
const adminRouter=require("./routes/adminRouter");
const appointmentRouter=require('./routes/appointmentRoute');
const reportRoute=require("./routes/reportRoute");
const AppError = require("./utils/appError");
// Route setting
app.use("/api/v1/patient", patientRouter);
app.use("/api/v1/doctor",doctorRouter);
app.use("/api/v1/admin",adminRouter);
app.use("/api/v1/appointment",appointmentRouter);
// console.log(!reportRoute);
app.use("/api/v1/report",reportRoute);
app.all('*',(req,res,next)=>{
    next(new AppError('No route found'))
})

module.exports = app;
