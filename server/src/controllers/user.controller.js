import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { User } from "../models/user.model.js";
// import { UploadOnCloudinary } from "../service/cloudinary.js"
import jwt from "jsonwebtoken";
import mongoose from "mongoose";
import bcrypt from "bcrypt";
import formidable from "formidable"
import { cloudinary } from "../service/cloudinary.js"


// ! User-Controller Functions
const registerUser = async (req, res) => {
    try {
        const { username, email, password } = req.body;
        if (!username || !email || !password) {
            return res
                .status(400)
                .json({ msg: "username , email and password are required !" });
        }
        const userExists = await User.findOne({ email });
        if (userExists) {
            return res
                .status(400)
                .json({ msg: "User is already registerd ! Please Login ." });
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        if (!hashedPassword) {
            return res.status(400).json({ msg: "Error in password hashing !" });
        }
        const user = new User({
            username,
            email,
            password: hashedPassword,
        });
        const result = await user.save();
        if (!result) {
            return res.status(400).json({ msg: "Error while saving user !" });
        }
        const accessToken = jwt.sign(
            { token: result._id },
            process.env.JWT_SECRET,
            {
                expiresIn: "7d",
            }
        );
        if (!accessToken) {
            return res
                .status(400)
                .json({ msg: "Error while generating token !" });
        }
        res.cookie("token", accessToken, {
            maxAge: 1000 * 60 * 60 * 24 * 7,
            httpOnly: true,
            sameSite: "none",
            secure: true,
            partitioned: true,
        });
        res.status(201).json({
            msg: `User Signed in successfully ! hello ${result?.username}`,
        });
    } catch (err) {
        res.status(400).json({ msg: "Error in signin !", err: err.message });
    }
};

const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).json({ msg: "Email and Password are required !" });
        }
        const userExists = await User.findOne({ email });
        if (!userExists) {
            return res.status(400).json({ msg: "Please Signin first !" });
        }
        const passwordMatched = await bcrypt.compare(password, userExists.password);
        if (!passwordMatched) {
            return res.status(400).json({ msg: "Incorrect credentials !" });
        }
        const accessToken = jwt.sign(
            { token: userExists._id },
            process.env.JWT_SECRET,
            { expiresIn: "7d" }
        );
        if (!accessToken) {
            return res.status(400).json({ msg: "Token not gemnerated in login !" });
        }
        res.cookie("token", accessToken, {
            maxAge: 1000 * 60 * 60 * 24 * 7,
            httpOnly: true,
            secure: true,
            sameSite: "none",
            partitioned: true,
        });
        res.status(200).json({ msg: "User logged in succcessfully !" });
    } catch (err) {
        res.status(400).json({ msg: "Error in login !", err: err.message });
    }
};


const logoutUser = async (req, res) => {
    try {
        res.cookie("token", "", {
            maxAge: 0,
            httpOnly: true,
            sameSite: "none",
            secure: true,
            partitioned: true,
        });

        res.status(201).json({ msg: "You logged out !" });
    } catch (error) {
        res.status(400).json({ msg: "Error in logout" });
    }
};


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
