const crypto = require("crypto"); //built-in module for generating token
const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs");

const doctorSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "please entered the name"],
    trim: true,
  },
  email: {
    type: String,
    required: [true, "please entered the email"],
    unique: true,
    trim: true,
    lowercase: true,
    validate: [validator.isEmail, "pls entered valid email"],
  },
  photo: String,
  password: {
    type: String,
    required: [true, "pls entered the password "],
    minlength: 8,
    select: false,
  },
  role: {
    type: String,
    default: "doctor",
  },
  phoneNumber: {
    type: Number,
    required: [true, "pls entered your phone number"],
  },
  website: {
    type: String,
  },
  address: {
    type: String,
    required: [true, "please entered your address"],
  },
  location: {
    type: {
      type: String, // Specifies the type of GeoJSON object
      enum: ["Point"], // Must be 'Point' for a Point type
      required: true,
    },
    coordinates: {
      type: [Number], // Array of numbers [longitude, latitude]
      required: true,
    },
  },
  specialization: {
    type: String,
    enum: [
      "General Practitioner (GP)",
      "Cardiologist",
      "Dermatologist",
      "Neurologist",
      "Endocrinologist",
      "Gastroenterologist",
      "Oncologist",
      "Rheumatologist",
      "other",
    ],
    required: [true, "pls entered your specilization"],
  },
  experience: {
    type: Number,
    required: [true, "enter your expreience year"],
  },
  consultationFee: {
    type: Number,
    required: [true, "enter your consultation fee"],
  },
  timing: {
    type: Object,
    required: [true, "enter your working hrs"],
  },
  status: {
    type: String,
    default: "pending",
  },
  ratingsAverage: {
    type: Number,
    default: 4.5,
    min: [1, "rating should of atleast 1.0"],
    max: [5, "rating should of atmost 5.0"],
    set: (val) => Math.round(val * 10) / 10, // 4.666666-->46.666->47->4.7
  },
  ratingsQuantity: {
    type: Number,
    default: 0,
  },
});

// / creating the encryption of the password
doctorSchema.pre("save", async function (next) {
  // only run in the case when the password was actully modified
  if (!this.isModified("password")) return next();
  // hashing the password with the cpy cost 12
  this.password = await bcrypt.hash(this.password, 12);
  // delete the password confirm field
  this.confirmPassword = undefined;
  next();
});
/// creating the decryption of the password
// this method is instance method its mean its available in whole file
doctorSchema.methods.correctPassword = async function (
  candidatePassword,
  userPassword
) {
  return await bcrypt.compare(candidatePassword, userPassword);
};

const Doctor = mongoose.model("Doctor", doctorSchema);

module.exports = Doctor;
