const User = require("../models/userModel")
const catchAsyncError = require("../utils/catchAsyncError")

exports.getAllUsers = catchAsyncError(async (req, res) => {

  const users = await User.find()

  res.status(200).json({
    //following JSend formating standard
    status: "success",
    results: users.length,
    data: {
      users
    }
  });
});

exports.createUser = (req, res) => {
  res
    .status(500)
    .json({ status: "error", message: "this route is not defined" });
};

exports.getUser = (req, res) => {
  res
    .status(500)
    .json({ status: "error", message: "this route is not defined" });
};
exports.updateUser = (req, res) => {
  res
    .status(500)
    .json({ status: "error", message: "this route is not defined" });
};
exports.deleteUser = (req, res) => {
  res
    .status(500)
    .json({ status: "error", message: "this route is not defined" });
};
