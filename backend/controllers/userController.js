const User = require("../models/userModel");
const ErrorHandler = require("../utils/errorHandler");
const catchAsyncError = require("../middleware/catchAsyncErrors");
const sendToken = require("../utils/jwtToken");
const crypto = require('crypto');

// Register a user

exports.register = catchAsyncError(async(req, res, next) => {

    const { fren, email, password } = req.body
    const user = await User.create({
        fren,
        email,
        password
    })
    sendToken(user, 201, res);
})


// login user

exports.loginUser = catchAsyncError(async(req, res, next) => {
    const { email, password } = req.body;

    // checking if user given password and email

    if (!email || !password) {
        return next(new ErrorHandler("Please Email and password", 400));
    }

    const user = await User.findOne({ email }).select("+password");

    if (!user) {
        return next(new ErrorHandler("Invalid email or password", 401));
    }

    const isPasswordMatched = await user.comparePassword(password);

    if (!isPasswordMatched) {
        return next(new ErrorHandler("Invalid email or password", 401));
    }
    sendToken(user, 200, res);
});

// logout

exports.logout = catchAsyncError(async(req, res, next) => {

    res.cookie("token", null, {
        expires: new Date(Date.now()),
        httpOnly: true
    })
    res.status(200).json({
        success: true,
        message: "Logged Out"
    })
})

// get users of any one FRENCHISE
exports.getUsers = catchAsyncError(async(req, res, next) => {
    const { fren } = req.params;
    const users = await User.find({ fren: fren });

    res.send(users);
});
exports.getAllUsers = catchAsyncError(async(req, res, next) => {
    const users = await User.find();
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
    // res.setHeader(
    //     "Access-Control-Allow-Headers",
    //     "Content-Type, Authorization"
    // );

    // const userMap = {};
    // users.forEach((user) => {
    //     userMap[user._id] = user;
    // });

    res.send(users);
});

// get user detail
exports.getUserDetail = catchAsyncError(async(req, res, next) => {
    const { email } = req.params;
    const user = await User.find({ email: email });

    res.send(user);
});