import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { User } from "../models/user.model.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { cookieOptions } from "../config/index.js";
import { UploadOnCloudinary } from "../service/cloudinary.js";


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


// ! User - Profile Controllers
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
    const user = await User.findByIdAndUpdate(
        req.user?._id,
        {
            $set: {
                avatar: profileAvatarUrl
            }
        },
        { new: true }
    );

    return res
        .status(200)
        .json(new ApiResponse(200, {}, "Profile Avatar Updated Sucessfully"));
});


const updateProfile = asyncHandler(async (req, res) => {
    const { username, fullname, bio } = req.body;
    console.log({ username, fullname, bio });

    const users = await User.find({ username });

    // TODO: Separate route - check while user is entering info
    if (users.length) {
        throw new ApiError(400, "username already taken, Try a different username");
    }

    // Find User, Update local Copy , Save it in DB & Finally Fetch updatedUser
    const user = await User.findById(req.user?._id);
    user.username = username || user.username;
    user.fullname = fullname || user.fullname;
    user.bio = bio || user.bio;
    await user.save();

    const updatedUser = await User.findById(user._id);

    return res
        .status(200)
        .json(new ApiResponse(200, {updatedUser}, "Profile Updated Sucessfully"));
});


export {
    registerUser,
    loginUser,
    logoutUser,

    updateProfileAvatar,
    updateProfile
};
