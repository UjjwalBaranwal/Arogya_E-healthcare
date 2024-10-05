const Admin=require("../models/adminModel");
const express=require("express");
const AppError= require("../utils/appError");
const jwt= require("jsonwebtoken");
const {promisify}=require("util");
const catchAsync= require("../utils/catchAsync");
const {env}=require("process");
const crypto=require("crypto");
const { create } = require("../models/patientModel");


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

exports.signup=catchAsync(async(req,res,next)=>{
    const newAdmin=Admin.create({
        name:req.body.name,
        email:req.body.email,
        password:req.body.password,
        role:req.body.role,
    })
    createAndSendToken(newAdmin,201,res);
})
exports.login=catchAsync(async(req,res,next)=>{
    const {email,password}=req.body;
    if(!email || !password){
        return next(new AppError("Please enter valid input"));
    }
    const admin=await Admin.findOne({email}).select("+password");
    console.log(admin);
    if(!admin || !(await admin.correctPassword(password,admin.password))){
        return next(new AppError("Email or password is not correct"));
    }
    createAndSendToken(admin,201,res);
})
