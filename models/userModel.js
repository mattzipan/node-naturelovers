const mongoose = require("mongoose")
const validator = require("validator")

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
        trim: true,
        lowercase: true,
        validate: [validator.isEmail, "Please provide a valid email."]
    },
    photo: {
        type: String,
        trim: true
    },
    password: {
        type: String,
        required: "A user must have a password",
        trim: true,
        minlength: 8
    },
    passwordConfirm: {
        type: String,
        required: "user must have confirm password",
        trim: true,
        // this only works on User.save and User.create
        validate: {
            validator: function (item) {
                return item === this.password
            },
            message: "Passwords have to match!"
        }
    }
})

// use Schema to make the Model
const User = mongoose.model("User", userSchema);

module.exports = User;