import Post from "../models/post.model.js";

export const cretePost = async (req, res, next) => {
  const { content, coverImage, title, tags } = req.body;
  const author = req.user._id;
  try {
    let cloudinaryResponse = null;

    if (coverImage) {
      cloudinaryResponse = await cloudinary.uploader.upload(coverImage, {
        folder: "posts",
      });
    }

    const post = await Post.create({
      content,
      coverImage: cloudinaryResponse ? cloudinaryResponse.secure_url : "",
      title,
      tags,
      author,
    });
    return res.status(201).json({
      success: true,
      message: "Post created successfully",
      post,
    });
  } catch (error) {
    return next(error);
  }
};

export const getAllPosts = async (req, res, next) => {
  const { page = 1, limit = 10, search = "" } = req.query;
  try {
    const query = {
      $or: [
        { title: { $regex: search, $options: "i" } },
        { content: { $regex: search, $options: "i" } },
        { tags: { $regex: search, $options: "i" } },
      ],
    };

    const totalPosts = Post.countDocuments(query);
    const posts = await Post.find(query)
      .sort({ createdAt: -1 })
      .skip((page - 1) * +limit)
      .limit(+limit)
      .populate("auther");

    res.status(200).json({
      success: true,
      message: "Posts fetched successfully",
      posts,
      totalPosts,
      page: +page,
    });
  } catch (error) {
    next(error);
  }
};

export const getPost = async (req, res, next) => {
  const { id } = req.params;
  try {
    const post = await Post.findById(id).populate("author");
    if (!post) {
      const error = new Error("Post not found");
      error.statusCode = 404;
      throw error;
    }
    res.status(200).json({
      success: true,
      message: "Post fetched successfully",
      post,
    });
  } catch (error) {
    next(error);
  }
};

export const updatePost = async (req, res, next) => {
  const author = req.user._id;
  const { content, coverImage, title, tags } = req.body;
  try {
    const post = await Post.findById(req.params.id);

    if (!post) {
      const error = new Error("Post not found");
      error.statusCode = 404;
      throw error;
    }
    // console.log(author.toString(), post.author.toString());
    if (author.toString() !== post.author.toString()) {
      const error = new Error("You are not creator");
      error.statusCode = 400;
      throw error;
    }
    let cloudinaryResponse = null;

    if (coverImage) {
      cloudinaryResponse = await cloudinary.uploader.upload(coverImage, {
        folder: "posts",
      });
    }
    const newPost = await Post.findByIdAndUpdate(
      req.params.id,
      {
        content,
        coverImage: cloudinaryResponse?.secure_url
          ? cloudinaryResponse.secure_url
          : "",
        title,
        tags,
      },
      { new: true }
    );
    res.status(200).json({
      success: true,
      message: "Post updated successfully",
      newPost,
    });
  } catch (error) {
    next(error);
  }
};

export const deletePost = async (req, res, next) => {
  const { id } = req.params;
  try {
    const post = await Post.findById(req.params.id);

    if (!post) {
      const error = new Error("Post not found");
      error.statusCode = 404;
      throw error;
    }
    if (author !== post.author) {
      const error = new Error("You are not creator");
      error.statusCode = 400;
      throw error;
    }
    await Post.findByIdAndDelete(id);
    res.status(200).json({
      success: true,
      message: "Post deleted successfully",
    });
  } catch (error) {
    next(error);
  }
};

export const likePost = async (req, res, next) => {
  const { id } = req.user;
  try {
    const post = await Post.findById(req.params.postId);
    if (!post) {
      const error = new Error("Post not found");
      error.statusCode = 404;
      throw error;
    }
    let isLiked = false;
    if (post.likes.includes(id)) {
      post.likes.pull(id);
      isLiked = true;
    } else {
      post.likes.push(id);
    }
    await post.save();
    res.status(200).json({
      success: true,
      message: isLiked
        ? "Post unliked successfully"
        : "Post liked successfully",
      post,
    });
  } catch (error) {
    next(error);
  }
};

export const getUserPosts = async (req, res, next) => {
  const { id } = req.params;
  try {
    const posts = await Post.find({ author: id }).populate("author");
    if (!posts) {
      const error = new Error("Posts not found");
      error.statusCode = 404;
      throw error;
    }
    res.status(200).json({
      success: true,
      message: "Posts fetched successfully",
      posts,
    });
  } catch (error) {
    next(error);
  }
};
