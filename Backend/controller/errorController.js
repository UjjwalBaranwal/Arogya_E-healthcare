const AppError = require("../utils/appError");

const handleCastErrorDB = (err) => {
  const msg = `Invalid ${err.path}: ${err.value}.`;
  return new AppError(msg, 400);
};

const handleDuplicateNameErrorDB = (err) => {
  const key = Object.keys(err.keyValue).join("");
  const msg = `The key '${key}' has a duplicate value of '${err.keyValue[key]}'`;
  return new AppError(msg, 400);
};

const handleValidationErrorDB = (err) => {
  const errors = Object.values(err.errors).map((el) => el.message);
  const msg = `Invalid input data. ${errors.join(". ")}`;
  return new AppError(msg, 400);
};

const handleErrorJWT = () => {
  return new AppError("Invalid token, please log in again", 401);
};

const handleTokenExpireError = () => {
  return new AppError("Your token has expired. Please log in again", 401);
};

const sendErrorDev = (res, err) => {
  return res.status(err.statusCode).json({
    status: err.status,
    message: err.message,
    stack: err.stack,
    error: err,
  });
};

const sendErrorProd = (res, err) => {
  if (err.isOperational) {
    // Send operational, trusted error to client
    return res.status(err.statusCode).json({
      status: err.status,
      message: err.message,
    });
  }

  // Log the error for debugging
  console.error("ERROR 💣", err);

  // Send generic message for unknown errors
  return res.status(500).json({
    status: "error",
    message: "Something went wrong. Please try again later.",
  });
};

module.exports = (err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.status = err.status || "error";

  if (process.env.NODE_ENV === "development") {
    sendErrorDev(res, err);
  } else {
    let error = { ...err };
    error.message = err.message;

    if (error.name === "CastError") error = handleCastErrorDB(error);
    if (error.code === 11000) error = handleDuplicateNameErrorDB(error);
    if (error._message === "Validation failed")
      error = handleValidationErrorDB(error);
    if (error.name === "JsonWebTokenError") error = handleErrorJWT();
    if (error.name === "TokenExpiredError") error = handleTokenExpireError();

    sendErrorProd(res, error);
  }
};
