import User from "../models/user.model.js";
import { createToken } from "../utils/jwt.js";

export const signup = async (req, res, next) => {
  const { username, email, password } = req.body;
  try {
    const isUserExists = await User.findOne({ email });
    if (isUserExists) {
      const error = new Error("User already exists");
      error.statusCode = 409;
      throw error;
    }
    const user = await User.create({ username, email, password });
    const token = createToken(user._id);
    res
      .status(201)
      .json({ success: true, user: { id: user._id, username, email }, token });
  } catch (error) {
    next(error);
  }
};

export const signin = async (req, res, next) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) {
      const error = new Error("Invalid credentials");
      error.statusCode = 401;
      throw error;
    }
    const isPasswordMatched = await user.comparePassword(password);
    if (!isPasswordMatched) {
      const error = new Error("Invalid credentials");
      error.statusCode = 401;
      throw error;
    }
    const token = createToken(user._id);
    res.status(200).json({
      success: true,
      user: { id: user._id, username: user.username, email },
      token,
    });
  } catch (error) {
    next(error);
  }
};

export const getUserProfile = async (req, res, next) => {
  const { id } = req.user;
  try {
    const user = await User.findById(id).select(
      "-password -__v -createdAt -updatedAt"
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

// export const signout = async (req, res, next) => {
//   try {
//     res.clearCookie("token");
//     res.status(200).json({ success: true, message: "Signout successful" });
//   } catch (error) {
//     next(error);
//   }
// };
