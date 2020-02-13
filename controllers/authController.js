const User = require("../models/userModel")
const jwt = require("jsonwebtoken")
const catchAsyncError = require("../utils/catchAsyncError")
const AppError = require("../utils/appError")

const signToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRES_IN
    })
}

exports.signup = catchAsyncError(async (req, res) => {
    const newUser = await User.create({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
        passwordConfirm: req.body.passwordConfirm
    })

    const token = signToken(newUser._id)


    res.status(201).json({
        status: "success",
        token,
        data: {
            user: newUser
        }
    })
})

exports.login = catchAsyncError(async (req, res, next) => {
    const { email, password } = req.body

    // check if email and password were sent with request
    if (!email || !password) {
        return next(new AppError("Please provide Email and password!", 400))
    }

    // check if user and password are in DB
    const user = await User.findOne({ email }).select("+password")

    // the instance method is available on user, because they're available on all documents
    if (!user || !(await user.correctPassword(password, user.password))) {
        return next(new AppError("Incorrect Email or password", 401))
    }

    const token = signToken(user._id)

    res.status(200).json({
        status: "success",
        token
    })
})