const crypto = require("crypto"); //built-in module for generating token
const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs");

const adminSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Please enter your name"]
    },
    email: {
        type: String,
        required: [true, "Please Enter your email"],
        unique: true,
    },
    password: {
        type: String,
        required: [true, "Please enter your password"],
        select: false,
    },
    role: {
        type: String,
    }

})


adminSchema.pre("save", async function (next) {
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
adminSchema.methods.correctPassword = async function (
    candidatePassword,
    userPassword
) {
    return await bcrypt.compare(candidatePassword, userPassword);
};


const Admin = mongoose.model("Admin", adminSchema);
module.exports = Admin;


