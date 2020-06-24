const User = require('./../models/userModel');
const catchAsync = require('../utils/catchAsync');
const AppError = require('./../utils/AppError');
const { expectCt } = require('helmet');

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

exports.getMe = (req, res, next) => {
    req.params.id = req.user.id;
    next();
}

const filterObj = (obj, ...fields) => {
    const newObj = {}
    Object.keys(obj).forEach(el => {
        if(fields.includes(el)) newObj[el] = obj[el]
    })
    return newObj
}

exports.updateMe = catchAsync(async (req, res, next) => {
    // 1) if password is there, throw error
    if(req.body.password) {
        return next(new AppError(`Please update password in the ${req.protocol}://${req.get('host')}/api/v1/users/updateMyPassword `))
    }
    else {
        const filteredBody = filterObj(req.body, "name", "email", "username")
        const updatedUser = await User.findByIdAndUpdate(req.user.id, filteredBody, {
            runValidators: true,
            new: true
        });

        res.status(200).json({
            status: "success",
            data: updatedUser
        })
         
    }
})

exports.deleteMe = catchAsync(async (req, res, next) => {
    await User.findByIdAndUpdate(req.user.id, {active: false})

    res.status(204).json({
        status: 'success',
        data: null
    })
})