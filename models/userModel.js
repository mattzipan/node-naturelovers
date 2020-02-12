const mongoose = require("mongoose")
const validator = require("validator")
const bcrypt = require("bcryptjs")

// create Schema

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: "A user must have a name",
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

// middleware to ecrypt password
userSchema.pre("save", async function (next) {

    // // if password hasnt changed, dont encrypt it again
    if (!this.isModified("password")) return next();

    // encrypt
    this.password = await bcrypt.hash(this.password, 12)

    // prevent the unencrypted confirm password from being stored
    this.passwordConfirm = undefined

    next();
})

// use Schema to make the Model
const User = mongoose.model("User", userSchema);

module.exports = User;