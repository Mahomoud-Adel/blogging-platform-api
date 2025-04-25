import Comment from "../models/comment.model.js";

export const createComment = async (req, res, next) => {
  const { author } = req.user._id;
  const { postId } = req.params.postId;
  const { content } = req.body;
  try {
    const comment = await Comment.create({
      content,
      author,
      post: postId,
    });
    res.status(201).json({
      success: true,
      message: "Comment created successfully",
      comment,
    });
  } catch (error) {
    next(error);
  }
};

export const getCommentsPost = async (req, res, next) => {
  const { postId } = req.params;
  try {
    const comments = await Comment.find(postId).sort({ createdAt: -1 });
    if (!comments) {
      return res.status(404).json({
        success: false,
        message: "No comments found",
      });
    }
    res.status(200).json({
      success: true,
      message: "Comments fetched successfully",
      comments,
    });
  } catch (error) {
    next(error);
  }
};

export const updateComment = async (req, res, next) => {
  const { commentId } = req.params;
  const { content } = req.body;
  try {
    const comment = await Comment.findByIdAndUpdate(
      commentId,
      { content },
      { new: true, runValidators: true }
    );
    if (!comment) {
      return res.status(404).json({
        success: false,
        message: "Comment not found",
      });
    }
    res.status(200).json({
      success: true,
      message: "Comment updated successfully",
      comment,
    });
  } catch (error) {
    next(error);
  }
};

export const deleteComment = async (req, res, next) => {
  const { commentId } = req.params;
  try {
    const comment = await Comment.findByIdAndDelete(commentId);
    if (!comment) {
      return res.status(404).json({
        success: false,
        message: "Comment not found",
      });
    }
    res.status(200).json({
      success: true,
      message: "Comment deleted successfully",
    });
  } catch (error) {
    next(error);
  }
};

