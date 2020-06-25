const jwt = require('jsonwebtoken');
const catchAsync = require('./../utils/catchAsync')
const User = require('./../models/userModel')
const AppError = require('./../utils/AppError');
const util = require('util');
const Post = require('../models/postModel');
const crypto = require('crypto');
const sendEmail = require('../utils/email');

createSendToken = (user, statusCode, res) => {
    const token = signToken(user._id)
    res.status(statusCode).json({
        status: 'success',
        token,
        data: user
    });
}

const signToken = (id) => {
    return jwt.sign({id: id}, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRES_IN
    });
}

// SIGNUP
exports.signup = catchAsync( async (req, res, next) => {
    const newUser = await User.create({
        username: req.body.username,
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
        passwordConfirm: req.body.passwordConfirm
    })
    createSendToken(newUser, 201, res)
}) 

// LOGIN
exports.login = catchAsync( async (req, res, next) => {
    const username = req.body.username;
    const email = req.body.email
    const password = req.body.password;
    let user = {}
    // 1) check if username/ password is entered (implementing login via username/email)
    if(!(username || email) || !password) {
        return next(new AppError('Please enter username/email and password', 400))
    } 
    // 2) check if username exists and password is correct, YES? send token : send err
    if(email) {
         user = await User.findOne({email: email}).select('+password');
        if(!user || !user.active || !(await user.correctPassword(password, user.password))) {
            return next(new AppError('Incorrect email or password'))
        }
    }
    else if (username) {
        user = await User.findOne({username: username}).select('+password');
        if(!user || !user.active || !(await user.correctPassword(password, user.password))) {
            return next(new AppError('Incorrect username or password'))
        }
    }
    
    createSendToken(user, 201, res);

}); 

// PROTECT
exports.protect = catchAsync(async (req, res, next) => {
    // 1) get token 
    let token;
    if(req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        token = req.headers.authorization.split(' ')[1];
    } 
    if(!token) {
        return next(new AppError('You are not logged in! Please login to get access', 401));
    }

    // 2) verify token
    const decoded = await util.promisify(jwt.verify)(token, process.env.JWT_SECRET);

    // 3) check if the user is not deleted
    const currentUser = await User.findById(decoded.id)
    if(!currentUser || !currentUser.active) {
        return next(new AppError('The user belonging to the token no longer exists', 404))
    }

    // 4) check if password was changed after token was issued
    if(currentUser.changedPasswordAfter(decoded.iat)) {
        return next(new AppError('User Password changed recently', 401))
    }

    if(currentUser.blacklisted) {
        return next(new AppError('Your account is blacklisted, you cannot access this feature', 401))
    }

    // 5) grant access
    req.user = currentUser;
    req.userId = currentUser.id
    next();
})

// RESTRICT
exports.restrictTo = (...roles) => {
    return (req, res, next) => {
        if(!roles.includes(req.user.role)) {
            return next(new AppError('You do not have the permission to do that'))
        }
        next();
    }
}

exports.forgotPassword = catchAsync(async(req, res, next) => {
    // 1) get user email
    const user = await User.findOne({email: req.body.email});
    if(!user || !user.active) {
        return next(new AppError('No user with such email exists', 404));
    }
    // 2) create token
    const resetToken = user.createPasswordResetToken();
    await user.save({validateBeforeSave: false});
    // 3) mail token
    const resetURL = `${req.protocol}://${req.get('host')}/social/users/resetPassword/${resetToken}`
    const message = `Forgot Password? Submit a PATCH request with your new password and passwordConfirm to: ${resetURL}\n If not, ignore the above message.... `

    try{
        await sendEmail({
            email: user.email,
            subject: 'Link for resetting Password (NOTE: Valid for only 10 min)',
            message
        })
        res.status(200).json({
            status: 'success',
            message: 'reset token sent to email'
        })
    } catch {
        user.passwordResetToken = undefined,
        user.passwordResetExpire = undefined,
        await user.save({validateBeforeSave: false});
        
        return next( new AppError('Error sending the mail, please try later', 500))
    }
})

exports.resetPassword = catchAsync(async (req, res, next) => {
    // 1) get user from token
    const hashedToken = crypto.createHash('sha256').update(req.params.token).digest("hex")
     user = await User.findOne({passwordResetToken: hashedToken})
    // 2) check expiry, user existence, then reset password
    if (!user) {
        return next(new AppError('Token is invalid or expired',400));
    }
    user.password = req.body.password;
    user.passwordConfirm = req.body.passwordConfirm;
    user.passwordResetToken = undefined;
    user.passwordResetExpire = undefined;
    // 3) save and update changedPasswordAt
    user.passwordChangedAt = Date.now();
    await user.save();
    // 4) send jwt
    createSendToken(user, 200, res);
})

exports.resetPassword = catchAsync(async (req, res, next) => {
    // 1) get user based on token
    const hashedToken = crypto.createHash('sha256').update(req.params.token).digest('hex');

    const user = await User.findOne({passwordResetToken: hashedToken, passwordResetExpire: {$gt: Date.now()}});

   
    // 2) if token not expired and user exists, set new password
    if (!user || !user.active) {
        return next(new AppError('Token is invalid or expired', 400));
    }
    user.passwordConfirm = req.body.passwordConfirm;
    user.password = req.body.password;
    user.passwordResetToken = undefined;
    user.passwordResetExpire = undefined;
    // 3) update changedPasswordAt property
    await user.save();
    
    // 4) Log user in, send JWT
    createSendToken(user, 200, res);

});

exports.updatePassword =catchAsync(async (req, res, next) => {
    if(!req.user){
        return next(new AppError('You are not logged in!',403));
    }

    // 1) get user
    const user = await User.findById(req.userId).select('+password');
    
    // 2) check if posted password is correct
    const password = req.body.currentPassword;
    if(!user  ||!(await user.correctPassword(password, user.password))) {
       return next(new AppError('WRONG PASSWORD! Please enter the correct password to proceed', 401));
    } else if(req.body.currentPassword === req.body.updatedPassword) {
        return next(new AppError('Your New Password cannot be the same as the older one', 401));
    }     

    // 3) yes? update password
    user.password = req.body.updatedPassword;
    user.passwordConfirm = req.body.passwordConfirm;
    await user.save({validateBeforeSave: true})
    
    // 4) send jwt
    createSendToken(user, 200, res);
})