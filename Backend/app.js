const path = require("path");
const morgan = require("morgan");
const express = require("express");
const helmet = require("helmet");
const cookieParser = require("cookie-parser");
const app = express();
//////////////////////////////////////
// All router import
const patientRouter = require("./routes/patientRoute");
/////////////////////////////////////

/////////////////////////////////////
// Route setting
app.use("/api/v1/patient", patientRouter);

////////////////////////////////////
module.exports = app;
