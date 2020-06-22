const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcrypt')

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        unique: [true, 'The username is already taken'],
        required: [true, 'Please enter an username']
    },
    name: {
        type: String,
        required: [true, 'Please enter your name']
    },
    email: {
        type: String,
        required: true,
        unique: [true, 'The email belongs to another user'],
        lowercase: true,
        validate: [validator.isEmail, 'Please provide a valid email']
    },
    password: {
        type: String,
        required: [true, 'Please enter a Password'],
        minlength: [8, 'A password must be atleast 8 characters long'],
        validate: {
            validator: function(el) {
                var a=0, b=0;
                for (var i=0; i<el.length; i++) {
                    if( el[i] === el[i].toUpperCase() ) {
                        a++;
                    };
                    if (el[i] >= '0' && el[i] <= '9'){
                        b++;
                    }
                }
                return a*b;
            },
            message: 'Password must contain atleast 1 uppercase character and atleast 1 number'
        },
        select: false
    },
    passwordConfirm: {
        type: String,
        required: [true, 'Please Confirm your password'],
        validate: {
            validator: function(el) {
                return el === this.password
            },
            message: 'both passwords do not match'
        },
        select: false
    },
    role: {
        type: String,
        default: 'user',
        enum: ['user', 'admin', 'moderator']
    },
    passwordChangedAt: Date,
    active: {
        type: Boolean,
        default: true,
        select: false
    }
});

userSchema.pre('save', async function(next) {
    if(!this.isModified('password')) return next();

    this.password = await bcrypt.hash(this.password, 12);
    this.passwordConfirm = undefined;
    next();
})

const User = mongoose.model('User', userSchema);
module.exports = User;