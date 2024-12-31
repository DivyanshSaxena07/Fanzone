const Post = require("../models/Post");
const User = require("../models/User");
const cloudinary = require("cloudinary");
const { Readable } = require("stream"); // Import the stream module

// ====================creating a post for images only ======================

// exports.createPost = async (req, res) => {
//   try {
//     // const myCloud = await cloudinary.v2.uploader(req.body.image,{
//     const myCloud =  await cloudinary.uploader.upload(req.body.image,{
//       folder:"posts"
//       // folder:"home/posts"
//     })
//     const newpostData = {
//       caption: req.body.caption,
//       image: {
//         public_id: myCloud.public_id,
//         url: myCloud.secure_url,
//       },
//       owner: req.user._id,
//       isPrivate: req.body.isPrivate || false, // Handle privacy status

//     };
//     const newPost = await Post.create(newpostData);

//     const user = await User.findById(req.user._id);
//     user.post.unshift(newPost._id);
//     await user.save();

//     res.status(201).json({
//       success: true,
//       message:"post created",
//     });
//   } catch (error) {
//     console.error("Error creating post: ", error);

//     res.status(500).json({
//       success: false,
//       message: error.message,
//     });
//   }
// };

// ====================creating a post for images & videos ======================

// exports.createPost = async (req, res) => {
//   try {
   

//     // =======================METHOD 1 (WITH MULTER)==========================

//     let uploadResult; //COMMENT OUT--------

//     const fileBuffer = req.file.buffer.toString("base64");
//     const fileType = req.body.fileType;
//     console.log("File: ", req.file);
//     console.log("Body: ", req.body);

//     if (fileType === "image") {
//       uploadResult = await cloudinary.uploader.upload(
//         `data:${req.file.mimetype};base64,${fileBuffer}`,
//         {
//           folder: "posts",
//           resource_type: "auto",
//           timeout: 320000,
//         }
//       );
//     } else if (fileType === "video") {
//       uploadResult = await cloudinary.uploader.upload(
//         `data:${req.file.mimetype};base64,${fileBuffer}`,
//         {
//           folder: "posts",
//           resource_type: "auto",
//           timeout: 120000,
//         }
//       );
//     } else {
//       return res
//         .status(400)
//         .json({ success: false, message: "Invalid file type" });
//     }

//     const newpostData = {
//       caption: req.body.caption,
//       owner: req.user._id,
//       isPrivate: req.body.isPrivate || false,
//     };

//     if (req.body.fileType === "image") {
//       newpostData.image = {
//         public_id: uploadResult.public_id,
//         url: uploadResult.secure_url,
//       };
//     } else if (req.body.fileType === "video") {
//       newpostData.video = {
//         public_id: uploadResult.public_id,
//         url: uploadResult.secure_url,
//       };
//     }

//     const newPost = await Post.create(newpostData);

//     const user = await User.findById(req.user._id);
//     user.post.unshift(newPost._id);
//     await user.save();

//     res.status(201).json({
//       success: true,
//       message: "Post created",
//     }); // COMMENT OUT--------------
//   } catch (error) {
//     console.error("Error creating post: ", error);

//     res.status(500).json({
//       success: false,
//       message: error.message,
//     });
//   }
// };

// ===============ANOTHER METHOD TO CREATE POST ==============================

// exports.createPost = async (req, res) => {
//   try {
//     const fileType = req.body.fileType;

//     // Validate the file type
//     if (!["image", "video"].includes(fileType)) {
//       return res.status(400).json({
//         success: false,
//         message: "Invalid file type",
//       });
//     }

//     // Function to convert buffer to a readable stream
//     const bufferToStream = (buffer) => {
//       const stream = new Readable();
//       stream.push(buffer);
//       stream.push(null);
//       return stream;
//     };

//     // Upload file to Cloudinary using upload_stream
//     const uploadStream = cloudinary.uploader.upload_stream(
//       {
//         resource_type: fileType === "video" ? "video" : "image",
//         folder: "posts",
//         timeout: 600000, // 10-minute timeout for large files
//       },
//       async (error, result) => {
//         if (error) {
//           console.error("Cloudinary Upload Error: ", error);
//           return res.status(500).json({
//             success: false,
//             message: "Failed to upload file to Cloudinary",
//           });
//         }

//         // Prepare new post data
//         const newpostData = {
//           caption: req.body.caption,
//           owner: req.user._id,
//           isPrivate: req.body.isPrivate || false,
//         };

//         // Attach file details based on type
//         if (fileType === "image") {
//           newpostData.image = {
//             public_id: result.public_id,
//             url: result.secure_url,
//           };
//         } else if (fileType === "video") {
//           newpostData.video = {
//             public_id: result.public_id,
//             url: result.secure_url,
//           };
//         }

//         // Save the new post
//         const newPost = await Post.create(newpostData);

//         // Update user data with the new post
//         const user = await User.findById(req.user._id);
//         user.post.unshift(newPost._id);
//         await user.save();

//         res.status(201).json({
//           success: true,
//           message: "Post created successfully",
//         });
//       }
//     );

//     // Pipe the file buffer as a readable stream to Cloudinary's upload_stream
//     bufferToStream(req.file.buffer).pipe(uploadStream);
//   } catch (error) {
//     console.error("Error creating post: ", error);
//     res.status(500).json({
//       success: false,
//       message: error.message,
//     });
//   }
// };


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
    const publicId = post.image?.public_id || post.video?.public_id; 
    if (publicId) {
      await cloudinary.uploader.destroy(publicId); // Deletes the media (image/video) from Cloudinary
    }
      await post.deleteOne();
      const user = await User.findById(req.user._id);
      const index = user.post.indexOf(req.params.id);
      user.post.splice(index, 1);
      await user.save();
      return res.status(200).json({
        success: true,
        message: "Post Deleted",
      });
    
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
      owner: {
        $in: user.following,
      },
    }).populate("owner likes comments.user");

    res.status(200).json({
      success: true,
      posts: posts.reverse(),
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

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
      message: "post updated",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
exports.comment = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) {
      res.status(500).json({
        success: false,
        message: "post not found",
      });
    }
    let commentExist = -1;
    post.comments.forEach((item, index) => {
      if (item.user.toString() == req.user._id.toString()) {
        commentExist = index;
      }
    });

    if (commentExist != -1) {
      post.comments[commentExist].comment = req.body.comment;
      await post.save();
      return res.status(200).json({
        success: true,
        message: "comment uipdated",
      });
    } else {
      post.comments.push({
        user: req.user._id,
        comment: req.body.comment,
      });
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
};

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
      if (req.body.commentId == undefined) {
        res.status(400).json({
          success: false,
          message: "comment id is required",
        });
      }
      post.comments.forEach((item, index) => {
        if (item._id.toString() == req.body.commentId.toString()) {
          return post.comments.splice(index, 1);
        }
      });
      await post.save();
      res.status(200).json({
        success: true,
        message: "Comment removed",
      });
    } else {
      post.comments.forEach((item, index) => {
        if (item.user.toString() == req.user._id.toString()) {
          return post.comments.splice(index, 1);
        }
      });
      await post.save();
      res.status(200).json({
        success: true,
        message: "Comment deleted",
      });
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

 // ====================METHOD 1 (WITHOUT MULTER)======================

    // let uploadResult;

    // if (req.body.fileType === "image") {
    //   uploadResult = await cloudinary.uploader.upload(req.body.file, {
    //     folder: "posts",
    //     resource_type: "auto",
    //   });
    //   console.log("image = "+ uploadResult)
    // } else if (req.body.fileType === "video") {
    //   uploadResult = await cloudinary.uploader.upload(req.body.file, {
    //     folder: "posts",
    //     resource_type: "auto",
    //   });
    //   console.log("video = "+ uploadResult)

    // } else {
    //   console.log("error create post me hai");
    //   return res.status(400).json({

    //     success: false,
    //     message: "Invalid file type",
    //   });
    // }
    exports.createPost = async (req, res) => {
      try {
        const fileType = req.body.fileType;
        const file = req.file;
        
        if (!file) {
          return res.status(400).json({
            success: false,
            message: "No file provided",
          });
        }
    
        console.log("File: ", file);
        console.log("Body: ", req.body);
    
        // Cloudinary Upload
        let uploadResult;
    
        if (fileType === "image") {
          uploadResult = await cloudinary.uploader.upload(`data:${file.mimetype};base64,${file.buffer.toString("base64")}`, {
            folder: "posts",
            resource_type: "image",
          });
        } else if (fileType === "video") {
          uploadResult = await new Promise((resolve, reject) => {
            const uploadStream = cloudinary.uploader.upload_stream(
              {
                folder: "posts",
                resource_type: "video",
                timeout: 600000, // 10-minute timeout
              },
              (error, result) => {
                if (error) {
                  console.error("Cloudinary Upload Error: ", error);
                  return reject(error);
                }
                resolve(result);
              }
            );
            // Pipe the file buffer to the upload stream
            const stream = require("stream");
            const bufferStream = new stream.PassThrough();
            bufferStream.end(file.buffer);
            bufferStream.pipe(uploadStream);
          });
        } else {
          return res.status(400).json({
            success: false,
            message: "Invalid file type",
          });
        }
    
        // Prepare Post Data
        const newpostData = {
          caption: req.body.caption,
          owner: req.user._id,
          isPrivate: req.body.isPrivate || false,
        };
    
        if (fileType === "image") {
          newpostData.image = {
            public_id: uploadResult.public_id,
            url: uploadResult.secure_url,
          };
        } else if (fileType === "video") {
          newpostData.video = {
            public_id: uploadResult.public_id,
            url: uploadResult.secure_url,
          };
        }
    
        // Save Post
        const newPost = await Post.create(newpostData);
    
        // Update User's Posts
        const user = await User.findById(req.user._id);
        user.post.unshift(newPost._id);
        await user.save();
    
        return res.status(201).json({
          success: true,
          message: "Post created successfully",
        });
      } catch (error) {
        console.error("Error creating post: ", error);
    
        return res.status(500).json({
          success: false,
          message: error.message || "Internal Server Error",
        });
      }
    };
    