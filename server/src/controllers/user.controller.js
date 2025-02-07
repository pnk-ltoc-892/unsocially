import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { User } from "../models/user.model.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { cookieOptions } from "../config/index.js";
import { UploadOnCloudinary } from "../service/cloudinary.js";
import mongoose from "mongoose";
import { Follow } from "../models/follow.model.js";
import { getMongoosePaginationOptions } from "../utils/helpers.js";


// ! User - Authentication Controllers
const registerUser = asyncHandler(async (req, res) => {
    const { username, email, password } = req.body;
    if (!username || !email || !password) {
        throw new ApiError(400, "All fields are required !");
    }

    const existingUser = await User.findOne({
        $or: [{ username }, { email }]
    });
    if (existingUser) {
        throw new ApiError(409, "User Already Exists");
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    if (!hashedPassword) {
        throw new ApiError(409, "Error Hashing Passowrd");
    }

    const user = await User.create({
        username,
        email,
        password: hashedPassword,
    });

    const createdUser = await User.findById(user._id).select("-password");
    if (!createdUser) {
        throw new ApiError(500, "Error Registering User");
    }

    return res
        .status(201)
        .json(new ApiResponse(201, { user: createdUser }, "User Registered Successfully !"));

});


const loginUser = asyncHandler(async (req, res) => {
    const { username, email, password } = req.body;
    if ((!username && !email) || !password) {
        throw new ApiError(400, "Email Or Username and Password are required !");
    }

    const user = await User.findOne({
        $or: [{ username }, { email }]
    });
    if (!user) {
        throw new ApiError(400, "User Doesn't Exist !");
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
        throw new ApiError(400, "Invalid Credentials !");
    }

    const accessToken = jwt.sign(
        {
            id: user._id
        },
        process.env.ACCESS_TOKEN_SECRET,
        { expiresIn: process.env.ACCESS_TOKEN_EXPIRY }
    );
    if (!accessToken) {
        throw new ApiError(500, "Error Generating Access Token");
    }

    const loggedUser = await User.findById(user._id).select("-password");

    return res
        .status(200)
        .cookie("accessToken", accessToken, cookieOptions)
        .json(
            new ApiResponse(
                200,
                {
                    user: loggedUser,
                },
                "User logged in successfully !"
            )
        )
});


const logoutUser = asyncHandler(async (req, res) => {
    return res
        .status(200)
        .clearCookie("accessToken", cookieOptions)
        .json(new ApiResponse(200, {}, "User logged out successfully"));
});


// ! Profile Data Routes

const getSocialProfile = async (userId, req) => {
    const user = await User.findById(userId);
    if (!user) {
        throw new ApiError(404, "User Does Not Exist");
    }

    const socialProfile = await User.aggregate(
        [
            {
                $match: {
                    _id: new mongoose.Types.ObjectId(userId)
                }
            },
            {
                $project: {
                    username: 1,
                    fullname: 1,
                    avatar: 1,
                    bio: 1
                }
            },
            {   // Users followed by current user
                $lookup: {
                    from: "follows",
                    localField: "_id",
                    foreignField: "followerId",
                    as: "Following"
                }
            },
            {   // Users following current user
                $lookup: {
                    from: "follows",
                    localField: "_id",
                    foreignField: "followeeId",
                    as: "Followers"
                }
            },
            {
                $lookup: {
                    from: "posts",
                    localField: "_id",
                    foreignField: "author",
                    as: "Posts"
                }
            },
            {
                $addFields: {
                    following: { $size: "$Following" },
                    followers: { $size: "$Followers" },
                    posts: { $size: "$Posts" },
                }
            },
            {
                $project: {
                    Followers: 0,
                    Following: 0,
                    Posts: 0
                }
            }
        ]
    );
    // ! Check if profile is not of the current user => add a isFollowing Field
    let isFollowing = false;
    let isCurrentUserProfile = false;

    if (req.user?._id && userId.toString() !== req.user?._id?.toString()) {
        // Check IF follow Insatnce Exists
        const followInstance = await Follow.findOne({
            followerId: req.user?._id,
            followeeId: userId
        });
        isFollowing = followInstance ? true : false;
    }
    // ! Check if we are on current logged in user profile
    else if (req.user?._id && userId.toString() === req.user?._id?.toString()) {
        isCurrentUserProfile = true;
    }

    const userProfile = socialProfile[0];
    if (!userProfile) {
        throw new ApiError(404, "User Does Not Exist");
    }

    return { ...userProfile, isFollowing, isCurrentUserProfile };
}


const getMyProfile = asyncHandler(async (req, res) => {

    const profile = await getSocialProfile(req.user?._id, req);

    return res
        .status(200)
        .json(new ApiResponse(200, { profile }, "Profile Fetched Succesfully"));
});


const getProfileByUsername = asyncHandler(async (req, res) => {
    const { username } = req.params;
    const user = await User.findOne({ username });
    if (!user) {
        throw new ApiError(404, "User Does Not Exist");
    }

    const profile = await getSocialProfile(user._id, req);

    return res
        .status(200)
        .json(new ApiResponse(200, { profile }, "Profile Fetched Succesfully"));
});


const getProfileCardByUsername = asyncHandler(async (req, res) => {
    const { username } = req.params;
    const user = await User.findOne({ username });
    if (!user) {
        throw new ApiError(404, "User Does Not Exist");
    }

    const profile = await getSocialProfile(user._id, req);

    return res
        .status(200)
        .json(new ApiResponse(200, { profile }, "Profile Card Fetched Succesfully"));
});


//  ! User - Profile fetching
/*
    - Current User Profile Is Returned In Search Result
*/
const searchUsers = asyncHandler(async (req, res) => {
    const { keyword="", page = 1, limit = 5 } = req.query;

    const regExp = new RegExp(keyword, "i");
    // const users = await User.find({
    //     $or: [
    //         {username: regExp},
    //         {fullname: regExp},
    //         // {bio: regExp},
    //     ]
    // })
    const usersAggregation = User.aggregate(
        [
            {
                $match: {
                    $or: [
                        { username: regExp },
                        { fullname: regExp },
                    ]
                }
            },
            {
                $project: {
                    username: 1,
                    fullname: 1,
                    avatar: 1,
                    bio: 1
                }
            },
            {
                $lookup: {
                    from: "follows",
                    localField: "_id",
                    foreignField: "followeeId",
                    as: "Followers"
                }
            },
            // ! Need to workout this isFollowing and current User thingy - Card is already sorted
            {
                $lookup: {
                    from: "follows",
                    localField: "_id",
                    foreignField: "followeeId",
                    as: "isFollowing",
                    pipeline: [
                        {
                            $match:{
                                followerId: new mongoose.Types.ObjectId(req.user?._id)
                            }
                        }
                    ]
                }
            },
            {
                $addFields: {
                    Followers: { $size: "$Followers" }
                }
            }
        ]);
    
    const users = await User.aggregatePaginate(
        usersAggregation,
        getMongoosePaginationOptions(
            {
                page,
                limit,
                customLabels: {
                    totalDocs: "totalUsers",
                    docs: "users"
                }
            }
        )
    )

    return res
        .status(200)
        // .json(new ApiResponse(200, { data: [users, req.user?._id, users._id] }, "Fetched User With Given Keyword"));
        .json(new ApiResponse(200, { users }, "Fetched User With Given Keyword"));
})



// ! User - Profile Controllers

const updateProfile = asyncHandler(async (req, res) => {
    const { username, fullname, bio } = req.body;

    const users = await User.find({ username });

    // TODO: Separate route - check while user is entering info for username - Should be unique
    if (users.length) {
        throw new ApiError(400, "username already taken, Try a different username");
    }

    // Find User, Update local Copy , Save it in DB & Finally Fetch updatedUser
    const user = await User.findById(req.user?._id);
    user.username = username || user.username;
    user.fullname = fullname || user.fullname;
    user.bio = bio || user.bio;
    await user.save();

    const profile = await getSocialProfile(user._id, req);

    return res
        .status(200)
        .json(new ApiResponse(200, { profile }, "Profile Updated Sucessfully"));
});


const updateProfileAvatar = asyncHandler(async (req, res) => {
    const avatarLocalPath = req.file?.path;
    if (!avatarLocalPath) {
        throw new ApiError(400, "Profile Avatar File Is Missing");
    }

    const uploadResponse = await UploadOnCloudinary(avatarLocalPath);
    if (!uploadResponse) {
        throw new ApiError(500, "Error Uploading File On Server");
    }

    const profileAvatarUrl = uploadResponse.secure_url
    let user = await User.findByIdAndUpdate(
        req.user?._id,
        {
            $set: {
                avatar: profileAvatarUrl
            }
        },
        { new: true }
    );

    const profile = await getSocialProfile(user._id, req);

    return res
        .status(200)
        .json(new ApiResponse(200, { profile }, "Profile Avatar Updated Sucessfully"));
});



export {
    registerUser,
    loginUser,
    logoutUser,

    getMyProfile,
    getProfileByUsername,
    getProfileCardByUsername,

    searchUsers,

    updateProfileAvatar,
    updateProfile,
};
