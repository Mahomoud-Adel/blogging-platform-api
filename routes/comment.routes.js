import { Router } from "express";
import {
  createComment,
  deleteComment,
  getCommentsPost,
  updateComment,
} from "../controllers/comment.controller.js";
import { authMiddleware } from "../middlewares/auth.middleware.js";

const commentRouter = Router();

commentRouter.post("/:postId", authMiddleware, createComment);
commentRouter.get("/:postId", authMiddleware, getCommentsPost);
commentRouter.put("/:id", authMiddleware, updateComment);
commentRouter.delete("/:id", authMiddleware, deleteComment);

export default commentRouter;
