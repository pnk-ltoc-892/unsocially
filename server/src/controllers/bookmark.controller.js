import mongoose from "mongoose";
import { Bookmark } from "../models/bookmark.model.js";
import { Post } from "../models/post.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { getMongoosePaginationOptions } from "../utils/helpers.js";


const togglePostBookmark = asyncHandler(async (req, res) => {
    const { postId } = req.params;
    const post = await Post.findById(postId);
    if (!post) {
        throw new ApiError(400, "Post Does Not Exist");
    }

    const isBookmarkedAlready = await Bookmark.findOne(
        { postId, bookmarkedBy: req.user?._id }
    );
    if (isBookmarkedAlready) {
        await Bookmark.findOneAndDelete({ postId, bookmarkedBy: req.user?._id })
        return res
            .status(200)
            .json(new ApiResponse(200, { isBookmarked: false }, "Post Bookmark Removed"))
    }

    await Bookmark.create({ postId, bookmarkedBy: req.user?._id });

    return res
        .status(200)
        .json(new ApiResponse(200, { isBookmarked: true }, "Post Bookmarked Succesfully"));
});


const getBookMarkedPosts = asyncHandler(async (req, res) => {
    const { page = 1, limit = 10 } = req.query;

    const postAggregation = Bookmark.aggregate(
        [
            {
                $match: {
                    bookmarkedBy: new mongoose.Types.ObjectId(req.user?._id),
                },
            },
            {
                $lookup: {
                    from: "posts",
                    localField: "postId",
                    foreignField: "_id",
                    as: "Post",
                    pipeline: [
                        {
                            $lookup: {
                                from: "comments",
                                localField: "_id",
                                foreignField: "postId",
                                as: "Comments"
                            }
                        },
                        {
                            $lookup: {
                                from: "likes",
                                localField: "_id",
                                foreignField: "postId",
                                as: "Likes"
                            }
                        },
                        {
                            $lookup: {
                                from: "likes",
                                localField: "_id",
                                foreignField: "postId",
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
                            $lookup: {
                                from: "bookmarks",
                                localField: "_id",
                                foreignField: "postId",
                                as: "isBookmarked",
                                pipeline: [
                                    {
                                        $match: {
                                            bookmarkedBy: new mongoose.Types.ObjectId(req.user?._id)
                                        }
                                    }
                                ]
                            }
                        },
                        {
                            $addFields: {
                                likes: { $size: "$Likes" },
                                comments: { $size: "$Comments" },
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
                                isBookmarked: {
                                    $cond: {
                                        if: {
                                            $gte: [
                                                {
                                                    // if the isBookmarked key has document in it
                                                    $size: "$isBookmarked",
                                                },
                                                1,
                                            ],
                                        },
                                        then: true,
                                        else: false,
                                    },
                                }
                            }
                        }
                    ]
                },
            },
            {
                $addFields: {
                    Post: { $first: "$Post" },
                },
            },
            {
                $project: {
                    _id: 0,
                    Post: 1,
                },
            },
            // {
            //     $replaceRoot: {
            //         newRoot: "$Post",
            //     },
            // },
        ]
    );

    const posts = await Bookmark.aggregatePaginate(
        postAggregation,
        getMongoosePaginationOptions({
            page,
            limit,
            customLabels: {
                totalDocs: "totalBookmarkedPosts",
                docs: "bookmarkedPosts",
            },
        })
    );

    return res
        .status(200)
        .json(new ApiResponse(200, posts, "Bookmarked posts fetched successfully"));
});



export {
    togglePostBookmark,
    getBookMarkedPosts
}