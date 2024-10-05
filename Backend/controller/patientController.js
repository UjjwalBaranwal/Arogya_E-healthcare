const { promisify } = require("util");
const Patient = require("./../models/patientModel");
const catchAsync = require("./../utils/catchAsync");
const jwt = require("jsonwebtoken");
const AppError = require("./../utils/appError");
const crypto = require("crypto");

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
  const patient = await Patient.find({ email }).select("+password");

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
  const allData = await Patient.find();
  res.status(200).json({
    status: "success",
    token,
    data: {
      allData,
    },
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
