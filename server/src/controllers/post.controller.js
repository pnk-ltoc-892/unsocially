import { User } from "../models/user.model.js"
import { Post } from "../models/post.model.js";
import { Comment } from "../models/comment.model.js";
import { cloudinary, UploadOnCloudinary } from "../service/cloudinary.js";
import formidable from "formidable";
import mongoose from "mongoose";
import { ApiError } from "../utils/ApiError.js"
import { ApiResponse } from "../utils/ApiResponse.js"
import { asyncHandler } from "../utils/asyncHandler.js"
import { getMongoosePaginationOptions } from "../utils/helpers.js";


// ! Common Aggregation For Any Given Post - W.R.T Current User

const postCommonAggregation = (req) => {
    return [
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
                            avatar: 1
                        }
                    }
                ]
            }
        },
        {
            $addFields: {
                author: {$first: "$author"},
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
        },
        {
            $sort: {
                updatedAt: -1
            }
        }
    ]
}



const getAllPosts = asyncHandler(async (req, res) => {
    const { page = 1, limit = 5 } = req.query;

    const postsAggregation = Post.aggregate([...postCommonAggregation(req)]);

    // ! await (Execute Pipeline) - not used as Raw aggregation needs to be passed to pagination
    const posts = await Post.aggregatePaginate(
        postsAggregation,
        getMongoosePaginationOptions(
            {
                page,
                limit,
                customLabels: {
                    totalDocs: "totalPosts",
                    docs: "posts"
                }
            }
        )
    )

    return res
        .status(200)
        .json(new ApiResponse(200, posts, "All Posts Fetched Successfully"));
});


const getPostById = asyncHandler(async (req, res) => {
    const { postId } = req.params;
    if (!postId) {
        throw new ApiError(404, "PostId Is Missing");;
    }

    const postData = await Post.aggregate(
        [
            {
                $match: {
                    _id: new mongoose.Types.ObjectId(postId)
                }
            },
            ...postCommonAggregation(req),
        ]
    )
    if (!postData[0]) {
        throw new ApiError(404, "Post does not exist");
    }

    return res
        .status(200)
        .json(new ApiResponse(200, postData[0], "Post fetched successfully"));
});


const getMyPosts = asyncHandler(async (req, res) => {
    const { page = 1, limit = 5 } = req.query;

    const postsAggregation = Post.aggregate(
        [
            {
                $match: {
                    author: new mongoose.Types.ObjectId(req.user?._id)
                }
            },
            ...postCommonAggregation(req)
        ]
    );

    const posts = await Post.aggregatePaginate(
        postsAggregation,
        getMongoosePaginationOptions({
            page,
            limit,
            customLabels: {
                totalDocs: "totalPosts",
                docs: "posts"
            }
        })
    )

    return res
        .status(200)
        .json(new ApiResponse(200, posts, "All User Posts Fetched Successfully"));
});


const getPostsByUsername = asyncHandler(async (req, res) => {
    const { page = 1, limit = 5 } = req.query;
    const { username } = req.params;

    const user = await User.findOne({ username });
    if (!user) {
        throw new ApiError(404, "User with username '" + username + "' Does Not Exist");
    }

    const postsAggregation = Post.aggregate(
        [
            {
                $match: {
                    author: new mongoose.Types.ObjectId(user._id)
                }
            },
            ...postCommonAggregation(req)
        ]
    );

    const posts = await Post.aggregatePaginate(
        postsAggregation,
        getMongoosePaginationOptions({
            page,
            limit,
            customLabels: {
                totalDocs: "totalPosts",
                docs: "posts"
            }
        })
    )

    return res
        .status(200)
        .json(new ApiResponse(200, posts, `All Posts Fetched For ${username} Successfully`));
});


// !
const getPostsByTag = asyncHandler(async (req, res) => {
    const { page = 1, limit = 5 } = req.query;
    const { tag } = req.params;

    const postsAggregation = Post.aggregate(
        [   // ! See if this does work Out ?
            // {
            //     $match: {
            //         tags: tag
            //     }
            // },
            {
                $redact: {
                    $cond: {
                        if: {
                            $in: [tag, "$tags"]
                        },
                        then: "$$KEEP",
                        else: "$$PRUNE"
                    }
                }
            }
            ,
            ...postCommonAggregation(req)
        ]
    );

    const posts = await Post.aggregatePaginate(
        postsAggregation,
        getMongoosePaginationOptions({
            page,
            limit,
            customLabels: {
                totalDocs: "totalPosts",
                docs: "posts"
            }
        })
    )

    return res
        .status(200)
        .json(new ApiResponse(200, posts, `Posts With #${username} Fetched Successfully`));
});





const uploadPostImage = asyncHandler(async (req, res) => {
    const postImage = req.file?.path;
    if (!postImage) {
        throw new ApiError(400, "Image is required !");
    }
    const result = await UploadOnCloudinary(postImage);
    if (!result) {
        throw new ApiError(500, "Error Uploading Image !");
    }
    res.json(new ApiResponse(200, result, "Post Image Uploaded !"));
});


const addPost = asyncHandler(async (req, res) => {
    // TODO: 'tags', mentions, location, etc. can be added here Skipping for now kept empty by default

    const { content, images } = req.body;
    // ! Checking Done On FrontEnd - Also
    // console.log({ content, images });

    if (!content && !images.length) {
        throw new ApiError(400, "Content or Image is required !");
    }

    // Add Separate Image Upload Functionality Here ?

    const newPost = await Post.create({
        content,
        images,
        author: req.user._id,
    })
    if (!newPost) {
        throw new ApiError(500, "Error Adding a New Post !");
    }

    // TODO: Return result after applying the necessary aggregations
    return res
        .status(201)
        .json(new ApiResponse(201, newPost, "Post Added !"));
});





const updatePost = asyncHandler(async (req, res) => {

})


const removePostImage = asyncHandler(async (req, res) => {

});

const deletePost = asyncHandler(async (req, res) => {
    const { postId } = req.params;
    if (!postId) {
        throw new ApiError(404, "PostId Is Missing");;
    }

    const post = await Post.findOneAndDelete({
        _id: postId,
        author: req.user?._id
    });
    if (!post) {
        throw new ApiError(404, "Post does not exist");
    }

    // ! Delete Post Images From Cloudinary
    // const postImages = [...(post.images) || []];


    // TODO: Optimize - Delete All Likes, Boomarks and commenst associated with Post
    return res
        .status(200)
        .json(new ApiResponse(200, {}, "Post deleted successfully"));
});




export {
    getAllPosts,
    getPostById,
    getMyPosts,
    getPostsByUsername,
    getPostsByTag,

    uploadPostImage,
    addPost,

    updatePost,
    removePostImage,
    deletePost
}
