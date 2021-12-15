"use strict";

// import mongoose
const mongoose = require("mongoose");

// Declare schema and assign Schema class
const Schema = mongoose.Schema;

// Create Schema Instance and add schema properties
const userSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    gender: {
        type: String,
        required: true
    },
    phoneNumber: {
        type: String
    },
    email: {
        type: String
    },
    createdOn: {
        type: Date,
        default: Date.now
    }
});

// create and export model
module.exports = mongoose.model("userModel", userSchema);
