const mongoose = require("mongoose")

// create Schema

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: "A user must have a name",
        unique: true,
        trim: true
    },
    email: {
        type: String,
        required: "A user must have an email",
        unique: true,
        trim: true
    },
    photo: {
        type: String,
        required: "A user must have a photo",
        unique: true,
        trim: true
    },
    password: {
        type: String,
        required: "A user must have a password",
        unique: true,
        trim: true
    },
    passwordConfirm: {
        type: String,
        required: "user must have confirm password",
        unique: true,
        trim: true
    }
})

// use Schema to make the Model
const User = mongoose.model("User", userSchema);

module.exports = User;