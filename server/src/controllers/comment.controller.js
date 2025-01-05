import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";

import { Comment } from "../models/comment.model.js";
import { Post } from "../models/post.model.js";
import mongoose from "mongoose";


const addComment = asyncHandler(async (req, res) => {
    const { postId } = req.params;
    const { content } = req.body;
    if (!content) {
        throw new ApiError(400, "Comment Is Empty");
    }

    const post = await Post.findById(postId);
    if (!post) {
        throw new ApiError(400, "Post Does Not Exist");
    }

    const comment = await Comment.create({
        content,
        postId,
        author: req.user?._id
    });
    if (!comment) {
        throw new ApiError(500, "Error Adding Comment");
    }

    return res
        .status(201)
        .json(new ApiResponse(201, comment, "Comment Added Successfully"));
});


const updateComment = asyncHandler(async (req, res) => {
    const { commentId } = req.params;
    const { content } = req.body;
    if (!content) {
        throw new ApiError(400, "Comment Cannot Be Empty");
    }

    const updatedComment = await Comment.findOneAndUpdate(
        {
            _id: new mongoose.Types.ObjectId(commentId),
            author: req.user?._id
        },
        {
            $set: { content },
        },
        {
            new: true  // Return Updated Comment
        }
    );
    if (!updatedComment) {
        throw new ApiError(404, "Comment Does Not Exist Or Unauthorized Action");
    }

    return res
        .status(200)
        .json(new ApiResponse(200, updatedComment, "Comment Updated Successfully"));
});


const deleteComment = asyncHandler(async (req, res) => {
    const { commentId } = req.params;

    const deletedComment = await Comment.findOneAndDelete(
        {
            _id: new mongoose.Types.ObjectId(commentId),
            author: req.user?._id
        }
    );
    if (!deletedComment) {
        throw new ApiError(404, "Comment Deleted Already Or Unauthorized Action");
    }

    return res
        .status(200)
        .json(
            new ApiResponse(200, { deletedComment }, "Comment Deleted Successfully")
        );
});



export {
    addComment,
    updateComment,
    deleteComment
}