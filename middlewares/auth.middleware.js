import jwt from "jsonwebtoken";
import User from "../models/user.model.js";
import { JWT_SECRET } from "../config/env.js";

export const authMiddleware = async (req, res, next) => {
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    token = req.headers.authorization.split(" ")[1];
    if (token) {
      try {
        const decoded = jwt.verify(token, JWT_SECRET);
        console.log(decoded);
        const user = await User.findById(decoded.id);
        if (!user) {
          const error = new Error(
            "the user that belong to this token dose not longer exist"
          );
          error.statusCode = 404;
          throw error;
        }
        // if (user.isBlocked) {
        //   const error = new Error("User is blocked");
        //   error.statusCode = 403;
        //   throw error;
        // }
        req.user = user;
        console.log(req.user);
        next();
      } catch (error) {
        next(error);
      }
    }
  } else {
    const error = new Error("Not authorized, no token");
    error.statusCode = 401;
    throw error;
  }
};

export const isAdmin = async (req, res, next) => {
  try {
    const {id} = req.user;
    const user = await User.findById(id);
    if (!user) {
      const error = new Error("User not found");
      error.statusCode = 404;
      throw error;
    }
    if (user.role !== "admin") {
      const error = new Error("Not authorized as an admin");
      error.statusCode = 403;
      throw error;
    }
    next();
  } catch (error) {
    next(error);
  }
};
