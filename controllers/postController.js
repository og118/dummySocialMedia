const mongoose = require('mongoose');
const Post = require('./../models/postModel');
const APIFeatures = require('./../utils/APIFeatures');
const catchAsync = require('./../utils/catchAsync');
const AppError = require('../utils/appError');

exports.getPosts = catchAsync(async (req, res, next) => {
    const features = new APIFeatures(Post.find(), req.query).sort().limitFields();
    const posts = await features.query;
    res.status(404).json({
        status: "success",
        data: posts
    });
});

exports.getPost = catchAsync(async (req, res, next) => {
    const postId = req.params.id;

    const post = await Post.findById(postId);
    if(!post) {
        return next(new AppError('Post not found', 404))
    }

    res.status(404).json({
        status: "success",
        data: post
    });
});

exports.createPost = catchAsync(async (req, res, next) => {
    const post = await Post.create(req.body)
    res.status(404).json({
        status: "success",
        data: post
    })
});

exports.updatePost = catchAsync( async (req, res, next) => {
    const postId = req.params.id;

    const post = await Post.findByIdAndUpdate(postId, req.body, {
        new: true,
        runValidators: true
    });
    
    if(!post) {
        return next(new AppError('Post not found', 404))
    }

    res.status(404).json({
        status: "success",
        data: post
    });
})

exports.deletePost = catchAsync(async (req, res, next) => {
    const postId = req.params.id;

    const post = await Post.findByIdAndDelete(postId)
    
    if(!post) {
        return next(new AppError('Post not found', 404))
    }
    
    res.status(204).json({
        status: "success",
        data: null
    });
});