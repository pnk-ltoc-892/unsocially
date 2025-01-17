import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";

import { Comment } from "../models/comment.model.js";
import { Post } from "../models/post.model.js";
import mongoose from "mongoose";
import { getMongoosePaginationOptions } from "../utils/helpers.js";


const getPostComment = asyncHandler(async (req, res) => {
    const { page = 1, limit = 5 } = req.query;
    const { postId } = req.params;

    const commentAggregation = Comment.aggregate([
        {
            $match: {
                postId: new mongoose.Types.ObjectId(postId)
            }
        },
        {
            $lookup: {
                from: "users",
                localField: "author",
                foreignField: "_id",
                as: "author",
                pipeline: [
                    {
                        $project: {
                            username: 1,
                            fullname: 1,
                            avatar: 1,
                        }
                    }
                ]
            }
        },
        {
            $lookup: {
                from: "likes",
                localField: "_id",
                foreignField: "commentId",
                as: "Likes",
            }
        },
        {
            $lookup: {
                from: "likes",
                localField: "_id",
                foreignField: "commentId",
                as: "isLiked",
                pipeline: [
                    {
                        $match: {
                            likedBy: new mongoose.Types.ObjectId(req.user?._id)
                        }
                    }
                ]
            }
        },
        {
            $addFields: {
                author: { $first: "$author" },
                Likes: { $size: "$Likes" },
                isLiked: {
                    $cond: {
                        if: {
                            $gte: [
                                {
                                    // if the isLiked key has document in it
                                    $size: "$isLiked",
                                },
                                1,
                            ],
                        },
                        then: true,
                        else: false,
                    },
                },
            }
        },
        {
            $sort: {
                updatedAt: -1
            }
        }
    ]);

    const comments = await Comment.aggregatePaginate(
        commentAggregation,
        getMongoosePaginationOptions(
            {
                page,
                limit,
                customLabels: {
                    totalDocs: "totalComments",
                    docs: "comments"
                }
            }
        )
    )

    return res
        .status(201)
        .json(new ApiResponse(201, comments, "Post Comments Fetched Successfully"));
});


const getUserComments = asyncHandler(async (req, res) => {
    const { page = 1, limit = 5 } = req.query;
    const { userId } = req.params;

    const commentAggregation = Comment.aggregate([
        {
            $match: {
                author: new mongoose.Types.ObjectId(userId)
            }
        },
        {
            $lookup: {
                from: "users",
                localField: "author",
                foreignField: "_id",
                as: "author",
                pipeline: [
                    {
                        $project: {
                            username: 1,
                            fullname: 1,
                            avatar: 1,
                        }
                    }
                ]
            }
        },
        {
            $lookup: {
                from: "likes",
                localField: "_id",
                foreignField: "commentId",
                as: "Comments",
            }
        },
        {
            $lookup: {
                from: "likes",
                localField: "_id",
                foreignField: "commentId",
                as: "isLiked",
                pipeline: [
                    {
                        $match: {
                            author: new mongoose.Types.ObjectId(req.user?._id)
                        }
                    }
                ]
            }
        },
        {
            $addFields: {
                author: { $first: "$author" },
                Likes: { $size: "$Comments" },
                isLiked: {
                    $cond: {
                        if: {
                            $gte: [
                                {
                                    // if the isLiked key has document in it
                                    $size: "$isLiked",
                                },
                                1,
                            ],
                        },
                        then: true,
                        else: false,
                    },
                },
            }
        },
        {
            $project: {
                Comments: 0
            }
        },
        {
            $sort: {
                updatedAt: -1
            }
        }
    ]);

    const comments = await Comment.aggregatePaginate(
        commentAggregation,
        getMongoosePaginationOptions(
            {
                page,
                limit,
                customLabels: {
                    totalDocs: "totalComments",
                    docs: "comments"
                }
            }
        )
    )

    return res
        .status(201)
        .json(new ApiResponse(201, comments, "User Comments Fetched Successfully"));
});


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
    getPostComment,
    getUserComments,

    addComment,
    updateComment,
    deleteComment
}