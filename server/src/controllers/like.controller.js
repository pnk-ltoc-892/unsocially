import { Like } from "../models/like.model.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { Post } from "../models/post.model.js";
import { ApiError } from "../utils/ApiError.js";
import { Comment } from "../models/comment.model.js";


// ! Also check if deletion and creating like is successfull or failed - Not Really needed?
const togglePostLike = asyncHandler(async (req, res) => {
    const { postId } = req.params;

    const post = await Post.findById(postId);
    if (!post) {
        throw new ApiError(400, "Post Does Not Exist");
    }

    const isAlreadyLiked = await Like.findOne({ likedBy: req.user?._id, postId });
    if (isAlreadyLiked) {
        await Like.findOneAndDelete({ likedBy: req.user?._id, postId });
        return res
            .status(201)
            .json(new ApiResponse(200, { isLiked: false }, "Post Unliked Succesfully"));
    }

    await Like.create({ likedBy: req.user?._id, postId })
    return res
        .status(201)
        .json(new ApiResponse(200, { isLiked: true }, "Post Liked Successfully"));
});


const toggleCommentLike = asyncHandler(async (req, res) => {
    const { commentId } = req.params;

    const comment = await Comment.findById(commentId);
    if (!comment) {
        throw new ApiError(400, "Comment Does Not Exist");
    }

    const isAlreadyLiked = await Like.findOne({ likedBy: req.user?._id, commentId });
    if (isAlreadyLiked) {
        await Like.findByIdAndDelete(isAlreadyLiked._id);
        return res
            .status(201)
            .json(new ApiResponse(200, { isLiked: false }, "Comment Unliked Succesfully"));
    }

    await Like.create({ likedBy: req.user?._id, commentId })
    return res
    .status(201)
    .json(new ApiResponse(200, { isLiked: true }, "Comment Liked Succesfully"));
});



export {
    togglePostLike,
    toggleCommentLike
}

