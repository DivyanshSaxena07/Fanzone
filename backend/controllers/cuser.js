const User = require("../models/User");
const Post = require("../models/Post");
const { sendEmail } = require("../middlewares/sendEmail");
const cloudinary = require("cloudinary");
const crypto = require("crypto");

exports.register = async (req, res) => {
  try {
    const { name, email, password, avatar,rate,dob } = req.body;
    let user = await User.findOne({ email });
    if (user) {
      return res.status(500).json({
        success: false,
        message: "User already exists",
      });
    }
    const mycloud = await cloudinary.uploader.upload(req.body.avatar, {
      folder: "avatars",
    });
    user = await User.create({
      name,
      email,
      password,
      avatar: { public_id: mycloud.public_id, url: mycloud.secure_url },
      rate,
      dob,
    });

    const token = await user.generateToken();

    const options = {
      expires: new Date(Date.now() + 90 * 24 * 60 * 60 * 1000),
      httpOnly: true,
    };

    res.status(200).cookie("token", token, options).json({
      success: true,
      user,
      token,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "something wrong",
    });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email })
      .select("+password")
      .populate("post followers following");

    if (!user) {
      return res.status(500).json({
        success: false,
        message: "user doen not exists",
      });
    }

    const isMatch = await user.matchPassword(password);
    if (!isMatch) {
      return res.status(500).json({
        success: false,
        message: "incorrect password",
      });
    }

    const token = await user.generateToken();

    const options = {
      expires: new Date(Date.now() + 90 * 24 * 60 * 60 * 1000),
      httpOnly: true,
    };

    res.status(200).cookie("token", token, options).json({
      success: true,
      user,
      token,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

exports.logOut = async (req, res) => {
  try {
    res
      .status(200)
      .cookie("token", null, { expires: new Date(Date.now()), httpOnly: true })
      .json({
        success: true,
        message: "Logged Out",
      });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
exports.followUser = async (req, res) => {
  try {
    const userToFollow = await User.findById(req.params.id);
    const loggedInUser = await User.findById(req.user._id);
    if (!userToFollow) {
      return res.status(500).json({
        success: false,
        message: "User not found to follow",
      });
    }
    if (loggedInUser.following.includes(userToFollow._id)) {
      const index = loggedInUser.following.indexOf(userToFollow._id);
      loggedInUser.following.splice(index, 1);
      await loggedInUser.save();

      const index2 = userToFollow.followers.indexOf(loggedInUser._id);
      userToFollow.followers.splice(index2, 1);
      await userToFollow.save();
      return res.status(200).json({
        success: true,
        message: `Unfollowed ${userToFollow._id}`,
      });
    }
    loggedInUser.following.push(userToFollow._id);
    userToFollow.followers.push(loggedInUser._id);
    await loggedInUser.save();
    await userToFollow.save();
    return res.status(200).json({
      success: true,
      message: `followed ${userToFollow._id}`,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

//   try {
//     const user = await User.findById(req.user._id).select("+password");
//     const { oldPassword, newPassword } = req.body;
//     if (!oldPassword || !newPassword) {
//       return res.status(500).json({
//         success: false,
//         message: "please provide old and new password ",
//       });
//     }
//     const isMatch = await user.matchPassword(oldPassword);
//     if (!isMatch) {
//       res.status(200).json({
//         success: false,
//         message: "incorrect old password",
//       });
//     }
//     user.password = newPassword;
//     await user.save();
//     res.status(200).json({
//       success: false,
//       message: "Password Updated Succesfully",
//     });
//   } catch (error) {
//     res.status(400).json({
//       success: false,
//       message: "kuch to gadbad hy",
//     });
//   }
// };

exports.updatePassword = async (req, res) => {
  try {
    const user = await User.findById(req.user._id).select("+password");
    const { oldPassword, newPassword } = req.body;

    console.log("User:", user);
    console.log("Provided Old Password:", oldPassword);
    console.log("Stored Password Hash:", user.password);
    console.log("new:", newPassword);

    const isMatch = await user.matchPassword(oldPassword);

    if (newPassword.length < 6) {
      return res.status(401).json({
        success: false,
        message: "password must be atleat 6 characters long",
      });
    }
    if (!isMatch) {
      return res.status(401).json({
        success: false,
        message: "Incorrect old password",
      });
    }

    user.password = newPassword;
    await user.save();

    res.status(200).json({
      success: true,
      message: "Password updated successfully",
    });
  } catch (error) {
    console.error("Error updating password:", error); // Log the error for debugging

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

exports.myProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user._id).populate(
      "post followers following"
    );
    res.status(200).json({
      success: true,
      user,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "internal server error! ",
    });
  }
};
exports.updateProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    const { name, email, avatar } = req.body;
    if (name) {
      user.name = name;
    }
    if (email) {
      user.email = email;
    }
    if (avatar) {
      await cloudinary.uploader.destroy(user.avatar.public_id);
      const mycloud = await cloudinary.uploader.upload(avatar, {
        folder: "avatars",
      });
      user.avatar.public_id = mycloud.public_id;
      user.avatar.url = mycloud.secure_url;
    }

    await user.save();
    res.status(200).json({
      success: true,
      message: "Profile Updated Successfully",
    });
  } catch (error) {
    console.error("error is  " + error);
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

exports.deleteProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    const post = user.post;
    const userId = user._id;
    const followers = user.followers;
    const following = user.following;
    await cloudinary.uploader.destroy(user.avatar.public_id);

    await user.deleteOne();
    res.cookie("token", null, {
      expires: new Date(Date.now()),
      httpOnly: true,
    });

    for (let index = 0; index < post.length; index++) {
      const post = await Post.findById(post[index]);
      console.log("post == " + post);
      await cloudinary.uploader.destroy(post.image.public_id);
      await post.remove();
    }

    for (let i = 0; i < followers.length; i++) {
      const follower = await User.findById(followers[i]);
      console.log("follower == " + followers);

      if (follower) {
        const index = follower.following.indexOf(userId);
        if (index !== -1) follower.following.splice(index, 1);
        await follower.save();
      }

      // const index = followers.following.indexOf(userId);
      // followers.following.splice(index, 1);
      // await followers.save();
    }
    //removing user from following's follower////

    for (let i = 0; i < following.length; i++) {
      const follow = await User.findById(following[i]);
      console.log("following == " + follow);

      if (follow) {
        const index = follow.followers.indexOf(userId);
        if (index !== -1) follow.followers.splice(index, 1);
        await follow.save();
      }

      // const index = follows.followers.indexOf(userId);
      // follows.followers.splice(index, 1);
      // await follows.save();
    }

    //removing all coments of user////
    const posts = await Post.find();

    for (let i = 0; i < posts.length; i++) {
      const post = await Post.findById(post[i]._id);

      for (let j = 0; j < post.comments.length; j++) {
        if (post.comments[j].user === userId) {
          post.comments.splice(j, 1);
        }
      }
      await post.save();
    }

    //removing all likes of user////

    for (let i = 0; i < posts.length; i++) {
      const post = await Post.findById(post[i]._id);

      for (let j = 0; j < post.likes.length; j++) {
        if (post.likes[j].user === userId) {
          post.likes.splice(j, 1);
        }
      }
      await post.save();
    }

    res.status(200).json({
      success: true,
      message: "Profile Deleted Successfully",
    });
  } catch (error) {
    console.log("error is here " + error);
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

exports.getUserProfile = async (req, res) => {
  try {
    const user = await User.findById(req.params.id).populate(
      "post followers following avatar"
    );
    const post = user.post;
    const userId = user._id;
    // const followers = user.followers;
    if (!user) {
      res.status(500).json({
        success: false,
        message: "user not found",
      });
    }
    // let visiblePosts = [];
    // const isFollowing = user.followers.some(followerId =>
    //   followerId.equals(loggedInUser._id)
    // );

    //  visiblePosts = isFollowing ? user.post : user.post.filter(post => !post.isPrivate);

    // for (let i = 0; i < followers.length; i++) {
    //   const follower = await User.findById(followers[i]);
    //   console.log("follower == " + follower)

    //   if (follower._id === loggedInUser._id) {
    //     visiblePosts = post;
    //     break;
    //   }
    //   else{
    //     visiblePosts = post.filter(post => !post.isPrivate);
    //     break;
    //   }
    // }

    res.status(200).json({
      success: true,
      user,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.find({
      name: { $regex: req.query.name, $options: "i" },
    });
    res.status(200).json({
      success: true,
      users,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

exports.forgotPassword = async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (!user) {
      console.log("email doesnt exists");

      return res.status(404).json({
        success: false,
        message: "email doesnt exists",
      });
    }

    const resetPasswordToken = await user.getResetPasswordToken();
    await user.save();
    const reseturl = `${req.protocol}://${req.get(
      "host"
    )}/password/reset/${resetPasswordToken}`;
    const message = `Reset your password by clicking on the link below: \n${reseturl}`;
    try {
      await sendEmail({
        email: user.email,
        subject: "reset Password",
        message,
      });
      res.status(200).json({
        success: true,
        message: `Email send to ${user.email}`,
      });
    } catch (error) {
      console.log("this error = " + error);

      user.resetPasswordToken = undefined;
      user.resetPasswordExpire = undefined;
      await user.save();
      res.status(500).json({
        success: false,
        message: "this err = " + error.message,
      });
    }
  } catch (error) {
    console.log("this error = " + error);
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

exports.resetPassword = async (req, res) => {
  try {
    const resetPasswordToken = crypto
      .createHash("sha256")
      .update(req.params.token)
      .digest("hex");
    // const user = User.findOne({resetPasswordToken:req.params.token});
    const user = await User.findOne({
      resetPasswordToken,
      // resetPasswordExpire:{$gt:Date.now()},
    });

    // const user = await User.findById(req.user._id);
    // console.log("Received Token:", req.params.token);
    // console.log("Hashed Received Token:", resetPasswordToken);
    // console.log("Stored Token:", user.resetPasswordToken);

    if (!user) {
      return res.status(401).json({
        success: false,
        message: "token is invalid ",
      });
    }
    user.password = req.body.password;
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;
    await user.save();
    res.status(200).json({
      success: true,
      message: "password reset successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

exports.getMyPosts = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    const posts = [];

    for (let i = 0; i < user.post.length; i++) {
      const post = await Post.findById(user.post[i]).populate(
        "likes comments.user owner"
      );
      posts.push(post);
    }

    res.status(200).json({
      success: true,
      posts,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
exports.getUserPosts = async (req, res) => {
  try {
    // Fetch the user and the logged-in user
    const user = await User.findById(req.params.id);
    const loggedInUser = await User.findById(req.user.id);
    const posts = [];

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

     // Check if the loggedInUser is following the user
     const isFollowing = user.followers.some(followerId =>
      followerId.equals(loggedInUser._id)
    );

    for (let i = 0; i < user.post.length; i++) {
      const post = await Post.findById(user.post[i]).populate(
        "likes comments.user owner"
      );
      if (isFollowing || !post.isPrivate) {
        posts.push(post);
      }
    }

    res.status(200).json({
      success: true,
      posts,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

//---------------------Controller to create razorpay order -----------------------

/*const razorpay = require("../razorpay"); // import the razorpay instance

exports.createOrder = async (req, res) => {
  try {
    const { amount } = req.body; // Amount in smallest currency unit (e.g., paise)

    // Create an order using Razorpay API
    const options = {
      amount: amount * 100, // Convert amount to smallest currency unit (paise)
      currency: "INR", // Currency type
      receipt: crypto.randomBytes(10).toString("hex"),
      payment_capture: 1, // Capture payment immediately
    };

    const order = await razorpay.orders.create(options);

    res.status(200).json({
      success: true,
      order,
    });
  } catch (error) {
    console.error("Error creating Razorpay order:", error);
    res.status(500).json({
      success: false,
      message: "Failed to create Razorpay order",
    });
  }
};*/



//-------------Controller to update user funds after successful payment-----------

/*exports.updateFunds = async (req, res) => {
  try {
    const { userId, amount, razorpayPaymentId } = req.body;

    // Validate request data
    
    if (!userId || !amount || !razorpayPaymentId) {
      return res.status(400).json({
        success: false,
        message: "Missing required fields: userId, amount, or paymentId",
      });
    }

    // Fetch the user from the database
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    // Update user's funds
    user.funds = (user.funds || 0) + Number(amount);

    // Save the updated user
    await user.save();

    res.status(200).json({
      success: true,
      message: "Funds updated successfully",
      funds: user.funds, // Return updated funds for confirmation
      paymentId: razorpayPaymentId, // Optional, just for tracking
    });
  } catch (error) {
    console.error("Error updating funds:", error);
    res.status(500).json({
      success: false,
      message: "An error occurred while updating funds",
    });
  }
};*/
