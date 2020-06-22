const User = require('./../models/userModel');
const catchAsync = require('../utils/catchAsync');
const AppError = require('./../utils/AppError')

exports.getUsers = catchAsync(async (req, res, next) => {
    const users = await User.find({});
    res.status(200).json({
        status: 'success',
        data: users
    })
});

exports.getUser = catchAsync(async (req, res, next) => {
    const userId = req.params.id;

    const user = await User.findById(userId);
    if(!user) {
        return next(new AppError('User not found', 404))
    }

    res.status(404).json({
        status: "success",
        data: user
    });
});

exports.createUser = catchAsync(async (req, res, next) => {
    const user = await User.create(req.body)
    res.status(404).json({
        status: "success",
        data: user
    })
});

exports.updateUser = catchAsync( async (req, res, next) => {
    const userId = req.params.id;

    const user = await User.findByIdAndUpdate(userId, req.body, {
        new: true,
        runValidators: true
    });
    
    if(!user) {
        return next(new AppError('User not found', 404))
    }

    res.status(404).json({
        status: "success",
        data: user
    });
})

exports.deleteUser = catchAsync(async (req, res, next) => {
    const userId = req.params.id;

    const user = await User.findByIdAndDelete(userId)
    
    if(!user) {
        return next(new AppError('User not found', 404))
    }
    
    res.status(204).json({
        status: "success",
        data: null
    });
});