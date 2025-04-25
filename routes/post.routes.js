import { Router } from "express";
import { authMiddleware } from "../middlewares/auth.middleware.js";
import {
  cretePost,
  deletePost,
  getAllPosts,
  getPost,
  getUserPosts,
  likePost,
  updatePost,
} from "../controllers/post.controller.js";

const postRouter = Router();

postRouter.get("/", authMiddleware, getAllPosts);
postRouter.get("/:id", authMiddleware, getPost);
postRouter.post("/", authMiddleware, cretePost);
postRouter.put("/:id", authMiddleware, updatePost);
postRouter.delete("/:id", authMiddleware, deletePost);
postRouter.put("like/:postId", authMiddleware, likePost);
postRouter.put("get-user-posts/:id", authMiddleware, getUserPosts);

export default postRouter;
