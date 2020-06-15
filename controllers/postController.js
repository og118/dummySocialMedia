const mongoose = require('mongoose');
const Post = require('./../models/postModel')

exports.getPosts = async (req, res, next) => {
    const posts = await Post.find({});
    res.status(404).json({
        status: "success",
        data: posts
    });
}

exports.getPost = async (req, res, next) => {
    const userId = req.params.id;

    const post = await Post.findById(userId)
    res.status(404).json({
        status: "success",
        data: post
    });
}

exports.createPost = async (req, res, next) => {
    const post = await Post.create(req.body)
    res.status(404).json({
        status: "success",
        data: post
    })
}

exports.updatePost = async (req, res, next) => {
    const userId = req.params.id;

    const post = await Post.findByIdAndUpdate(userId, req.body, {
        new: true,
        runValidators: true
    })
    res.status(404).json({
        status: "success",
        data: post
    });
}

exports.deletePost = async (req, res, next) => {
    const userId = req.params.id;

    const post = await Post.findByIdAndDelete(userId)
    res.status(204).json({
        status: "success",
        data: null
    });
}