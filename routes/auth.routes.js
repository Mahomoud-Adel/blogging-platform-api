import { Router } from "express";
import {
  getUserProfile,
  signin,
  signup,
} from "../controllers/auth.controller.js";
import { authMiddleware } from "../middlewares/auth.middleware.js";

const authRouter = Router();

authRouter.post("/sign-in", signin);
authRouter.post("/sign-up", signup);
authRouter.get("/get-user-profile", authMiddleware, getUserProfile);

export default authRouter;
