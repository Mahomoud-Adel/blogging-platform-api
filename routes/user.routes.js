import { Router } from "express";
import {
  createUser,
  deleteUser,
  followers_following,
  getAllUsers,
  getUser,
  savePost,
  updateUser,
} from "../controllers/user.controller.js";
import { authMiddleware, isAdmin } from "../middlewares/auth.middleware.js";

const userRouter = Router();

userRouter.get("/", authMiddleware, isAdmin, getAllUsers);
userRouter.get("/:id", authMiddleware, getUser);
userRouter.post("/", authMiddleware, isAdmin, createUser);
userRouter.put("/:id", authMiddleware, updateUser);
userRouter.delete("/:id", authMiddleware, isAdmin, deleteUser);

userRouter.put("/followers/:userId", authMiddleware, followers_following);
userRouter.put("/save-post/:postId", authMiddleware, savePost);
export default userRouter;
