const User = require("../models/userModel")
const catchAsyncError = require("../utils/catchAsyncError")

exports.signup = catchAsyncError(async (req, res) => {
    const newUser = await User.create({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
        passwordConfirm: req.body.passwordConfirm
    })

    res.status(201).json({
        status: "success",
        data: {
            user: newUser
        }
    })
})