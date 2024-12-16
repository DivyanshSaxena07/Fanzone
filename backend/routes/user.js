const express = require("express");
// const {createPost} = require("../controllers/cpost");
const {register,login, followUser, logOut, updateProfile, updatePassword, deleteProfile, getUserProfile, getAllUsers , myProfile, forgotPassword, resetPassword, getMyPosts, getUserPosts} = require("../controllers/cuser");
const { isAuthenticated } = require("../middlewares/auth");

const router = express.Router();

router.route("/register").post(register);
router.route("/login").post(login);
router.route("/logout").get(logOut);
router.route("/update/profile").put(isAuthenticated,updateProfile);
router.route("/update/password").put(isAuthenticated,updatePassword);
router.route("/follow/:id").get(isAuthenticated ,followUser);
router.route("/delete/me").delete(isAuthenticated,deleteProfile);
router.route("/me").get(isAuthenticated,myProfile);
router.route("/my/posts").get(isAuthenticated,getMyPosts);
router.route("/user/:id").get(isAuthenticated,getUserProfile);
router.route("/userposts/:id").get(isAuthenticated,getUserPosts);
router.route("/users").get(isAuthenticated,getAllUsers);
router.route("/forgot/password").post(forgotPassword);
router.route("/password/reset/:token").put(resetPassword);
module.exports = router;
