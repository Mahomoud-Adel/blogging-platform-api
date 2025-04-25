import User from "../models/user.model.js";

export const getAllUsers = async (req, res, next) => {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (error) {
    next(error);
  }
};

export const getUser = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      const error = new Error("User not found");
      error.statusCode = 404;
      throw error;
      // return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json({ success: true, user });
  } catch (error) {
    next(error);
  }
};

export const updateUser = async (req, res, next) => {
  const { id } = req.user;
  try {
    const user = await User.findByIdAndUpdate(
      id,
      {
        username: req.body.username,
        email: req.body.email,
        profilePicture: req.body.profilePicture,
      },
      { new: true }
    );
    if (!user) {
      const error = new Error("User not found");
      error.statusCode = 404;
      throw error;
      // return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json({ success: true, user });
  } catch (error) {
    next(error);
  }
};

export const createUser = async (req, res, next) => {
  const { username, email, password, profilePicture } = req.body;
  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      const error = new Error("User already exists");
      error.statusCode = 400;
      throw error;
      // return res.status(400).json({ message: "User already exists" });
    }
    const newUser = new User({
      username,
      email,
      password,
      profilePicture,
    });
    const user = await newUser.save();
    res.status(201).json({ success: true, user });
  } catch (error) {
    next(error);
  }
};

export const deleteUser = async (req, res, next) => {
  const { id } = req.params;
  try {
    const user = await User.findByIdAndDelete(id);
    if (!user) {
      const error = new Error("User not found");
      error.statusCode = 404;
      throw error;
      // return res.status(404).json({ message: "User not found" });
    }
    res
      .status(200)
      .json({ success: true, message: "User deleted successfully" });
  } catch (error) {
    next(error);
  }
};

export const followers_following = async (req, res, next) => {
  const authUserId = req.user._id;
  const { userId } = req.params;

  try {
    if (authUserId.toString() === userId) {
      const error = new Error("You can't follow yourself");
      error.statusCode = 400;
      throw error;
    }

    const currentUser = await User.findById(authUserId);
    const targetUser = await User.findById(userId);

    if (!currentUser || !targetUser) {
      const error = new Error("User not found");
      error.statusCode = 404;
      throw error;
    }

    let isFollowing = false;

    if (!currentUser.following.includes(userId)) {
      currentUser.following.push(userId);
      targetUser.followers.push(authUserId);
      isFollowing = true;
    } else {
      currentUser.following.pull(userId);
      targetUser.followers.pull(authUserId);
    }

    await currentUser.save();
    await targetUser.save();

    res.status(200).json({
      success: true,
      message: isFollowing ? "User followed" : "User unfollowed",
      following: isFollowing,
    });
  } catch (error) {
    next(error);
  }
};

export const savePost = async (req, res, next) => {
  const { postId } = req.params;
  try {
    const user = await User.findById(req.user._id);

    if (!user) {
      const error = new Error("User not found");
      error.statusCode = 404;
      throw error;
    }

    let postSaved = false;

    if (user.savedPosts.includes(postId)) {
      user.savedPosts.pull(postId);
      postSaved = true;
    } else {
      user.savedPosts.push(postId);
    }
    res.status(200).json({
      success: true,
      message: postSaved ? "Post unsaved" : "Post saved",
      saved: !postSaved,
    });
  } catch (error) {
    next(error);
  }
};
