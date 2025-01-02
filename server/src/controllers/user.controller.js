import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { User } from "../models/user.model.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { cookieOptions } from "../config/index.js";


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
const getCurrentUser = async (req, res) => {
    try {
        const { id } = req.params
        if (!id) {
            return res.status(400).json({ msg: "id is required !" });
        }
        const user = await User.findById(id)
            .select("-password")
            .populate("followers")
            .populate({
                path: "threads",
                populate: [{ path: "likes" }, { path: "comments" }, { path: "admin" }],
            })
            .populate({ path: "replies", populate: { path: "admin" } })
            .populate({
                path: "reposts",
                populate: [{ path: "likes" }, { path: "comments" }, { path: "admin" }],
            });
        res.status(200).json({ msg: "User Details Fetched !", user });

    } catch (error) {
        res.status(400).json({ msg: "Error in userDetails !", err: err.message });
    }
};

// TODO: Fix This Error
// * User Details Updation Controllers - Problem
const updateProfile = async (req, res) => {
    try {
        const userExists = await User.findById(req.user._id);
        if (!userExists) {
            return res.status(400).json({ msg: "No such user !" });
        }

        // Updating Bio And Profile Picture
        // ! Using Formidable Library
        const form = formidable({});

        form.parse(req, async (err, fields, files) => {
            console.log([fields, files]);

            console.log(fields);

            if (err) {
                return res.status(400).json({ msg: "Error in formidable !", err: err });
            }
            if (fields.text) {
                await User.findByIdAndUpdate(
                    req.user._id,
                    { bio: fields.text },
                    { new: true }
                );
            }
            if (files.media) {
                if (userExists.public_id) {
                    await cloudinary.uploader.destroy(
                        userExists.public_id,
                        (error, result) => {
                            console.log({ error, result });
                        }
                    );
                }
                const uploadedImage = await cloudinary.uploader.upload(
                    files.media.filepath,
                    { folder: "socap/Profiles" }
                );
                if (!uploadedImage) {
                    return res.status(400).json({ msg: "Error while uploading pic !" });
                }
                await User.findByIdAndUpdate(
                    req.user._id,
                    {
                        profilePic: uploadedImage.secure_url,
                        public_id: uploadedImage.public_id,
                    },
                    { new: true }
                );
            }
        });
        res.status(201).json({ msg: "Profile updated successfully !" });
    } catch (err) {
        res.status(400).json({ msg: "Error in updateProfile !", err: err.message });
    }
};


// TODO: Add Pagination
const searchUser = async (req, res) => {
    try {
        const { query } = req.params;
        const users = await User.find({
            $or: [ // ! Match anyone of username or email
                { username: { $regex: query, $options: "i" } }, // ! 'i' - case-insensitive
                { email: { $regex: query, $options: "i" } },
            ],
        });
        res.status(200).json({ msg: "Searched !", users });
    } catch (err) {
        res.status(400).json({ msg: "Error in searchUser !", err: err.message });
    }
};


const myInfo = async (req, res) => {
    try {
        res.status(200).json({ me: req.user });
    } catch (err) {
        res.status(400).json({ msg: "Error in myInfo !" });
    }
};

const followUser = async (req, res) => {
    try {
        const { id } = req.params;
        if (!id) {
            return res.status(400).json({ msg: "Id is required !" });
        }
        const userExists = await User.findById(id);
        if (!userExists) {
            return res.status(400).json({ msg: "User don`t Exist !" });
        }
        if (userExists.followers.includes(req.user._id)) {
            await User.findByIdAndUpdate(
                userExists._id,
                {
                    $pull: { followers: req.user._id },
                },
                { new: true }
            );
            return res.status(201).json({ msg: `Unfollowed ${userExists.userName}` });
        }
        await User.findByIdAndUpdate(
            userExists._id,
            {
                $push: { followers: req.user._id },
            },
            { new: true }
        );
        return res.status(201).json({ msg: `Following ${userExists.userName}` });
    } catch (err) {
        res.status(400).json({ msg: "Error in followUser !", err: err.message });
    }
};


export {
    registerUser,
    loginUser,
    logoutUser,
    getCurrentUser,
    updateProfile,
    searchUser,
    myInfo,
    followUser
};
