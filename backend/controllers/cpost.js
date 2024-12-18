const Post = require("../models/Post");
const User = require("../models/User");
const cloudinary = require("cloudinary");
exports.createPost = async (req, res) => {
  try {
    // const myCloud = await cloudinary.v2.uploader(req.body.image,{
    const myCloud =  await cloudinary.uploader.upload(req.body.image,{
      folder:"posts"
      // folder:"home/posts"
    })
    const newpostData = {
      caption: req.body.caption,
      image: {
        public_id: myCloud.public_id,
        url: myCloud.secure_url,
      },
      owner: req.user._id,
      isPrivate: req.body.isPrivate || false, // Handle privacy status

    };
    const newPost = await Post.create(newpostData);

    const user = await User.findById(req.user._id);
    user.post.unshift(newPost._id);
    await user.save();

    res.status(201).json({
      success: true,
      message:"post created",
    });
  } catch (error) {
    console.error("Error creating post: ", error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
/////////////////DELETING A POST //////////////////////////////////

exports.deletePost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) {
      return res.status(500).json({
        success: false,
        message: "Post not Found",
      });
    }
    if (post.owner.toString() !== req.user._id.toString()) {
      return res.status(500).json({
        success: false,
        message: "This is not your post, you idiot",
      });
    }
     else {
      await post.deleteOne();
      const user = await User.findById(req.user._id);
      const index = user.post.indexOf(req.params.id);
      user.post.splice(index, 1);
      await user.save();
      return res.status(200).json({
        success: true,
        message: "Post Deleted",
      });
      
     
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

/////////////////LIKING A POST //////////////////////////////////

exports.likedAndUnliked = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) {
      return res.status(404).json({
        sucess: false,
        message: "Post not founds",
      });
    }
    if (post.likes.includes(req.user._id)) {
      const index = post.likes.indexOf(req.user._id);
      post.likes.splice(index, 1);
      await post.save();
      return res.status(200).json({
        sucess: true,
        message: "Post Unliked",
      });
    } else {
      post.likes.push(req.user._id);
      post.save();
      return res.status(200).json({
        sucess: true,
        message: "Post Liked",
      });
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

exports.getPostOfFollowing = async (req, res) => {
try {
  // const user = await User.findById(req.user._id).populate("following","post");
  const user = await User.findById(req.user._id);
  const posts = await Post.find({
    owner:{
      $in:user.following,
    },
  }).populate("owner likes comments.user");

  res.status(200).json({
    success: true,
    posts:posts.reverse(),
  });
} catch (error) {
  res.status(500).json({
    success: false,
    message: error.message,
  });
}
}

exports.updateCaption = async (req, res) => {
try {
  const post = await Post.findById(req.params.id); 
  if (!post) {
    return res.status(404).json({
      success: false,
      message: "Post not founds",
    });
  }
  if (post.owner.toString() !== req.user._id.toString()) {
  return res.status(500).json({
    success: false,
    message: "you are not the owner",
  });
  }
  post.caption = req.body.caption;
  await post.save();
  res.status(200).json({
    success: true,
    message:"post updated",
  });
} 
catch (error) {
  res.status(500).json({
    success: false,
    message: error.message,
  });
}
}
exports.comment = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
if(!post){
  res.status(500).json({
    success: false,
    message: "post not found",
  });
}
let commentExist = -1;
post.comments.forEach((item,index) => {
  if(item.user.toString() == req.user._id.toString()){
    commentExist = index;
  }
});

if (commentExist!= -1) {
  post.comments[commentExist].comment = req.body.comment;
  await post.save();
  return res.status(200).json({
    success: true,
    message: "comment uipdated",
  });
}
 else {
  post.comments.push({
    user:req.user._id,
    comment:req.body.comment,
  })
}
await post.save();
res.status(200).json({
  success: true,
  message: req.body.comment,
});

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }

}

exports.deleteComment = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) {
      res.status(500).json({
        success: false,
        message: "Post not found",
      });
    }

    if (post.owner.toString() === req.user._id) {
      if (req.body.commentId ==undefined) {
        res.status(400).json({
          success:false,
          message:"comment id is required"
        })
      }
      post.comments.forEach((item,index) => {
        if(item._id.toString() == req.body.commentId.toString()){
       return  post.comments.splice(index,1)  
        }
      });
      await post.save();
      res.status(200).json({
        success: true,
        message: "Comment removed",
      });
    } 
    else {
      post.comments.forEach((item,index) => {
        if(item.user.toString() == req.user._id.toString()){
       return  post.comments.splice(index,1)  
        }
      });
      await post.save();
      res.status(200).json({
        success: true,
        message: "Comment deleted",
      });
    }
  } 
  catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
}


