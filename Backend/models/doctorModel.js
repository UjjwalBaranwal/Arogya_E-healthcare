const crypto = require("crypto");
const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs");

const doctorSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please enter the name"],
    trim: true,
  },
  email: {
    type: String,
    required: [true, "Please enter the email"],
    unique: true,
    trim: true,
    lowercase: true,
    validate: [validator.isEmail, "Please enter a valid email"],
  },
  photo: String,
  phoneNumber: {
    type: String,
    required: [true, "Please enter your phone number"],
    validate: [validator.isMobilePhone, "Please enter a valid phone number"],
  },
  password: {
    type: String,
    required: [true, "Please enter the password"],
    minlength: 8,
    select: false,
  },
  confirmPassword: {
    type: String,
    minlength: 8,
    validate: {
      validator: function (val) {
        return this.password === val;
      },
      message: "Passwords are not the same",
    },
  },
  gender: {
    type: String,
    required: true,
    enum: ["male", "female"],
  },
  role: {
    type: String,
    default: "doctor",
  },
  website: String,
  address: {
    type: String,
    required: [true, "Please enter your address"],
  },
  location: {
    type: {
      type: String,
      enum: ["Point"],
      default: "Point",
    },
    coordinates: {
      type: [Number],
      required: [true, "Please enter coordinates in [longitude, latitude]"],
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
    required: [true, "Please enter your specialization"],
  },
  experience: {
    type: Number,
    required: [true, "Enter your experience year"],
  },
  consultationFee: {
    type: Number,
    required: [true, "Enter your consultation fee"],
  },
  timing: {
    open: {
      type: String,
      required: [true, "Please enter the opening time"],
      validate: {
        validator: (val) => /^([0-1][0-9]|2[0-3]):[0-5][0-9]$/.test(val),
        message: "Opening time must be in HH:MM format",
      },
    },
    close: {
      type: String,
      required: [true, "Please enter the closing time"],
      validate: {
        validator: (val) => /^([0-1][0-9]|2[0-3]):[0-5][0-9]$/.test(val),
        message: "Closing time must be in HH:MM format",
      },
    },
  },
  status: {
    type: String,
    default: "pending",
  },
  ratingsAverage: {
    type: Number,
    default: 4.5,
    min: [1, "Rating should be at least 1.0"],
    max: [5, "Rating should be at most 5.0"],
    set: (val) => Math.round(val * 10) / 10,
  },
  ratingsQuantity: {
    type: Number,
    default: 0,
  },
});

// Index for geospatial queries
doctorSchema.index({ location: "2dsphere" });

// Pre-save hook to hash password
doctorSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  this.password = await bcrypt.hash(this.password, 12);
  this.confirmPassword = undefined; // Remove confirmPassword field
  next();
});

// Compare passwords
doctorSchema.methods.correctPassword = async function (
  candidatePassword,
  userPassword
) {
  return await bcrypt.compare(candidatePassword, userPassword);
};

const Doctor = mongoose.model("Doctor", doctorSchema);

module.exports = Doctor;
