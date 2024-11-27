const { promisify } = require("util");
const Patient = require("./../models/patientModel");
const catchAsync = require("./../utils/catchAsync");
const jwt = require("jsonwebtoken");
const AppError = require("./../utils/appError");
const crypto = require("crypto");
const {correctPassword} = require("../")
const { env } = require("process");

const signToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES,
  });
};

const createAndSendToken = (user, statusCode, res) => {
  token = signToken(user._id);
  const cookiOption = {
    expires: new Date(
      Date.now() + process.env.JWT_COOKIE_EXPIRES * 24 * 60 * 60 * 1000
    ),
    httpOnly: true,
  };
  ///// remove the  user password from the output
  user.password = undefined;
  res.cookie("jwt", token, cookiOption);
  res.status(statusCode).json({
    status: "success",
    token,
    data: {
      user,
    },
  });
};

exports.signUp = catchAsync(async (req, res, next) => {
  const newPatient = await Patient.create({
    name: req.body.name,
    email: req.body.email,
    phoneNumber: req.body.phoneNumber,
    password: req.body.password,
    gender: req.body.gender,
  });

  createAndSendToken(newPatient, 201, res);
});

exports.login = catchAsync(async (req, res, next) => {
  const { email, password } = req.body;
  if (!email || !password)
    return next(new AppError("pls provide valid email or password", 400));
  const patient = await Patient.findOne({ email }).select("+password");

  console.log(patient);
  if (
    !patient ||
    !(await patient.correctPassword(password, patient.password))
  ) {
    return next(new AppError("Email id or password is incorrect"));
  }
  createAndSendToken(patient, 200, res);
});

exports.getAll = catchAsync(async (req, res, next) => {
  const data = await Patient.find();
  res.status(200).json({
    status: "success",
    data
  });
});

exports.getOne = catchAsync(async (req, res, next) => {
  console.log(req.params);
  const patient = await Patient.findById(req.params.id);
  if (!patient) {
    return next(new AppError("No patient find with the search id"));
  }
  res.status(200).json({
    status: "success",
    data: {
      data: patient,
    },
  });
});

exports.logout = catchAsync(async (req, res, next) => {
  // Clear the JWT cookie by setting it with an expired date
  res.cookie("jwt", "loggedOut", {
    expires: new Date(Date.now() + 10 * 1000),  // Expires in 10 seconds
    httpOnly: true,
  });
  
  res.status(200).json({
    status: "success",
    message: "Successfully logged out",
  });
});

