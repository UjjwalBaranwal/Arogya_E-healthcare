const crypto = require("crypto");
const mongoose = require("mogoose");
const validator = require("validator");
const bcrypt = require("bcryptjs");

const patientSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Pls enter your name"],
    trim: true,
  },
  email: {
    type: String,
    required: [true, "Pls enter your email"],
    unique: true,
    trim: true,
    lowercase: true,
    validate: [validator.isEmail, "pls enterd the valid email"],
  },
  phoneNumber: {
    type: Number,
    required: [true, "Pls enter your phone number"],
    unique: true,
    minlength: 10,
    maxlength: 10,
  },
  password: {
    type: String,
    required: [true, "pls enter the password"],
    minlength: 8,
    select: false,
  },
  role: {
    type: String,
    select: false,
    default: "patient",
  },
  gender: {
    type: String,
    required: true,
    enum: ["male", "female"],
  },
  active: {
    type: Boolean,
    default: true,
    select: false,
  },
});
// / creating the encryption of the password
patientSchema.pre("save", async function (next) {
  // only run in the case when the password was actully modified
  if (!this.isModified("password")) return next();
  // hashing the password with the cpy cost 12
  this.password = await bcrypt.hash(this.password, 12);
  // delete the password confirm field
  this.confirmPassword = undefined;
  next();
});

// creating a method that non active user donot show in the total user
patientSchema.pre(/^find/, function (next) {
  //this is query middleware so this is point current this
  this.find({ active: { $ne: false } });
  next();
});

const Patient = mongoose.model("Patient", patientSchema);

module.exports = Patient;
