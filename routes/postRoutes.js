const express = require('express');
const router = express.Router();
const postController = require('./../controllers/postController.js')
const authController = require('./../controllers/authController')

router
    .route('/')
    .get(postController.getPosts)
    .post(authController.protect, postController.createPost);

router
    .route('/:id')
    .get(postController.getPost)
    .patch(authController.protect, authController.restrictTo('user','moderator'), postController.verifyUser, postController.updatePost)
    .delete(authController.protect, postController.verifyUser, postController.deletePost);


module.exports = router;