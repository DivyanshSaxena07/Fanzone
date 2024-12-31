const express = require("express");
const multer = require("multer");
const Post = require("../models/Post");
const {createPost, likedAndUnliked, deletePost, getPostOfFollowing, updateCaption, comment, deleteComment} = require("../controllers/cpost");
const { isAuthenticated } = require("../middlewares/auth");
const router = express.Router();

// const upload = multer();
// Multer Storage (using memory storage)
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });


router.route("/post/upload").post(isAuthenticated,upload.single("file"), createPost)
router.route("/post/:id").get(isAuthenticated, likedAndUnliked).put(isAuthenticated,updateCaption).delete(isAuthenticated ,deletePost)
router.route("/posts").get(isAuthenticated, getPostOfFollowing)
router.route("/posts/comment/:id").put(isAuthenticated, comment).delete(isAuthenticated, deleteComment)

router.put('/post/:id/view', async (req, res) => {
    try {
      const post = await Post.findByIdAndUpdate(
        req.params.id,
        { $inc: { views: 1 } },
        { new: true }
      );
      res.status(200).json({ success: true, views: post.views });
    } catch (error) {
      console.log("error yaha hai put views me  = " + error)
      res.status(500).json({ success: false, message: error.message });
    }
  });

  router.get('/post/:id/views', async (req, res) => {
    try {
      const post = await Post.findById(req.params.id);
      if (!post) {
        return res.status(404).json({ success: false, message: "Post not found" });
      }
      res.status(200).json({ success: true, views: post.views || 0 });
    } catch (error) {
      console.log("error yaha hai get views me  = " + error)
      res.status(500).json({ success: false, message: error.message });
    }
  });

module.exports = router;
