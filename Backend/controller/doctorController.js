const Doctor = require("../models/doctorModel");
const { promisify } = require("util");
const catchAsync = require("./../utils/catchAsync");
const AppError = require("./../utils/appError");
const jwt = require("jsonwebtoken");
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
    phoneNumber: req.body.phoneNumber,
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
  createAndSendToken(newDoctor, 201, res);
});


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
  const doctor = await Doctor.findOne({ email }).select("+password");
  console.log(doctor);
  if (!doctor || !(await doctor.correctPassword(password, doctor.password))) {
    return next(new AppError("Email id or Password is incorrect"));
  }
  createAndSendToken(doctor, 200, res);
});

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

exports.getAll = catchAsync(async (req, res, next) => {
  const data = await Doctor.find();
  if (!data) return next(new AppError("No doctor is found"));
  res.status(200).json({
    status: "success",
    data,
  });
});

exports.getOne = catchAsync(async (req, res, next) => {
  const data = await Doctor.findById(req.params.id);
  if (!data) return next(new AppError("no data found"));
  res.status(200).json({
    status: "success",
    data,
  });
});

exports.getSpecialist = catchAsync(async (req, res, next) => {
  const data = await Doctor.findOne({ specialization: req.params.specialist });
  if (!data) return next(new AppError("no doctor found "));
  res.status(200).json({
    status: "success",
    data,
  });
});

exports.getDoctorWithin = catchAsync(async (req, res, next) => {
  const { distance, latlng } = req.params;
  const [lat, lng] = latlng.split(",");
  if (!lat || !lng)
    next(new AppError("pls provide in the format lat,lng", 204));
  console.log(distance, lat, lng);
  // Radius of the Earth in kilometers
  const EARTH_RADIUS = 6378.1;
  // Calculate the radius in radians
  const radius = distance / EARTH_RADIUS;
  const data = await Doctor.find({
    location: {
      $geoWithin: {
        $centerSphere: [[lng, lat], radius],
      },
    },
  });
  if(!data)return next(new AppError("no doctor found within the range"))
  console.log(data);
  res.status(200).json({
    status: "success",
    data,
  });
});
