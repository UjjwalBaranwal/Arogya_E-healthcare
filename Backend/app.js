const path = require("path");
const morgan = require("morgan");
const express = require("express");
const helmet = require("helmet");
const cookieParser = require("cookie-parser");
const app = express();
const globalErrorHandler = require("./controller/errorController");

const cors = require("cors");
app.use(cors({ credentials: true, origin: true }));
app.use(express.json());
app.use(morgan());
app.use(cookieParser());
app.use(
  express.urlencoded({
    extended: true,
    limit: "10kb",
  })
); //for parsing the data that come with url post request
// All router import
const patientRouter = require("./routes/patientRoute");
const doctorRouter = require("./routes/doctorRoute");
const adminRouter = require("./routes/adminRouter");
const appointmentRouter = require("./routes/appointmentRoute");
const reportRoute = require("./routes/reportRoute");
const AppError = require("./utils/appError");
const errorController = require("./controller/errorController");
// Route setting
app.use("/api/v1/patient", patientRouter);
app.use("/api/v1/doctor", doctorRouter);
app.use("/api/v1/admin", adminRouter);
app.use("/api/v1/appointment", appointmentRouter);
// console.log(!reportRoute);
app.use("/api/v1/report", reportRoute);
app.all("*", (req, res, next) => {
  next(new AppError("No route found"));
});

app.use(globalErrorHandler);
module.exports = app;
