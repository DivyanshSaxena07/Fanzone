const express = require("express");
const {createPost, likedAndUnliked, deletePost, getPostOfFollowing, updateCaption, comment, deleteComment} = require("../controllers/cpost");
const { isAuthenticated } = require("../middlewares/auth");
const router = express.Router();

router.route("/post/upload").post(isAuthenticated, createPost)
router.route("/post/:id").get(isAuthenticated, likedAndUnliked).put(isAuthenticated,updateCaption).delete(isAuthenticated ,deletePost)
router.route("/posts").get(isAuthenticated, getPostOfFollowing)
router.route("/posts/comment/:id").put(isAuthenticated, comment).delete(isAuthenticated, deleteComment)

module.exports = router;
