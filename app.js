import express from "express";
import cors from "cors";
import morgan from "morgan";
import helmet from "helmet";

import { PORT } from "./config/env.js";
import errorHandler from "./middlewares/err.middleware.js";
import { connectDB } from "./database/mongodb.js";

import authRoute from "./routes/auth.routes.js";
import userRoute from "./routes/user.routes.js";
import postRoute from "./routes/post.routes.js";
import commentRoute from "./routes/comment.routes.js";

const app = express();

app.use(cors());
app.use(helmet());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(morgan("dev"));

app.use("/api/v1/auth", authRoute);
app.use("/api/v1/users", userRoute);
app.use("/api/v1/posts", postRoute);
app.use("/api/v1/comments", commentRoute);

app.use(errorHandler);

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(PORT, async () => {
  console.log("Server is running on http://localhost:" + PORT);
  await connectDB();
});
