const Doctor= require("../models/doctorModel");
const {promisify} = require("util");
const catchAsync= require("./../utils/catchAsync");
const AppError=require("./../utils/appError");
const jwt = require("jsonwebtoken");
const crypto=require('crypto');
const {env} = require("process");


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


exports.signup = catchAsync(async(req,res,next)=>{
    const newDoctor= await Doctor.create({
        name:req.body.name,
        email:req.body.email,
        photo:req.body.photo,
        phoneNumber:req.body.phoneNumber,
        password:req.body.password,
        role:req.body.role,
        confirmPassword:req.body.confirmPassword,
        gender:req.body.gender,
        phoneNumber:req.body.phoneNumber,
        website:req.body.website,
        address:req.body.address,
        specialization:req.body.specialization,
        experience:req.body.experience,
        consultationFee:req.body.consultationFee,
        timing:req.body.timing,
        status:req.body.status,
    });
})

  