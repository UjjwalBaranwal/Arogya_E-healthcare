const Doctor = require("../models/doctorModel");
const { promisify } = require("util");
const catchAsync = require("./../utils/catchAsync");
const AppError = require("./../utils/appError");
const jwt = require("jsonwebtoken");
const crypto = require('crypto');
const { env } = require("process");
const Admin = require("../models/adminModel");

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


exports.signup = catchAsync(async (req, res, next) => {
  const newDoctor = await Doctor.create({
    name: req.body.name,
    email: req.body.email,
    photo: req.body.photo,
    phoneNumber: req.body.phoneNumber,
    password: req.body.password,
    role: req.body.role,
    confirmPassword: req.body.confirmPassword,
    gender: req.body.gender,
    website: req.body.website,
    address: req.body.address,
    location: req.body.location,
    specialization: req.body.specialization,
    experience: req.body.experience,
    consultationFee: req.body.consultationFee,
    timing: req.body.timing,
    status: req.body.status,
    ratingsAverage: req.body.ratingsAverage,
    ratingQuantity: req.body.ratingQuantity,
  });
  const adminUser = await Admin.findOne({isAdmin: true });
  if (adminUser) {
    const notification = adminUser.notification;
    notification.push({
      type: "apply-doctor-request",
      message: `${newDoctor.name} Has applied as a doctor for serving`,
      data: {
        doctorId: newDoctor._id,
        newDoctor,
      }
    })
    await adminUser.save();
  } else {
    console.log("Admin is not found ");
  }

  createAndSendToken(newDoctor, 201, res);

})

exports.login = catchAsync(async (req, res, next) => {
  console.log(req.body);
  const { email, password } = req.body;
  if (!email || !password) {
    return new AppError("Please enter the correct credentials");
  }

  // here an error was occures because of the find and findOne Method in this project
  const doctor = await (Doctor.findOne({ email })).select("+password");
  console.log(doctor);
  if (!doctor || !(await doctor.correctPassword(password, doctor.password))) {
    return next(new AppError("Email id or Password is incorrect"));
  };
  createAndSendToken(doctor, 200, res);

})

exports.logout = (req, res) => {
  res.cookie("jwt", "loggedout", {
    expires: new Date(Date.now() + 10 * 1000),
    httpsOnly: true,
  })

  res.status(200).json({
    status: "success",
    message: "Logged out successfully",
  })
}



