const path = require("path");
const morgan = require("morgan");
const express = require("express");
const helmet = require("helmet");
const cookieParser = require("cookie-parser");
const app = express();

// Middleware
app.use(morgan("dev")); // Log HTTP requests
app.use(helmet()); // Secure HTTP headers
app.use(express.json()); // Parse JSON requests
app.use(express.urlencoded({ extended: true })); // Parse URL-encoded requests
app.use(cookieParser()); // Parse cookies

//////////////////////////////////////
// All router import
const patientRouter = require("./routes/patientRoute");
/////////////////////////////////////

/////////////////////////////////////
// Route setting
app.use("/api/v1/patient", patientRouter);

////////////////////////////////////
module.exports = app;
