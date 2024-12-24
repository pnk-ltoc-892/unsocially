import { User } from "../models/user.model.js"
import { Post } from "../models/post.model.js";
import { Comment } from "../models/comment.model.js";
import { cloudinary } from "../service/cloudinary.js";
import formidable from "formidable";
import mongoose from "mongoose";
// import {ApiError} from "../utils/ApiError.js"
// import {ApiResponse} from "../utils/ApiResponse.js"
// import {asyncHandler} from "../utils/asyncHandler.js"



const addPost = async (req, res) => {
    try {
        const form = formidable({});
        form.parse(req, async (err, fields, files) => {
            if (err) {
                return res.status(400).json({ msg: "Error in form parse !" });
            }
            const post = new Post();
            if (fields.text) {
                post.text = fields.text;
            }
            if (files.media) {
                const uploadedImage = await cloudinary.uploader.upload(
                    files.media.filepath,
                    { folder: "socap/Posts" }
                );
                if (!uploadedImage) {
                    return res.status(400).json({ msg: "Error while uploading Image !" });
                }
                post.media = uploadedImage.secure_url;
                post.public_id = uploadedImage.public_id;
            }
            post.admin = req.user._id;
            const newPost = await post.save();
            await User.findByIdAndUpdate(
                req.user._id,
                {
                    $push: { posts: newPost._id },
                },
                { new: true }
            );
            res.status(201).json({ msg: "Post created !", newPost });
        });
    } catch (err) {
        res.status(400).json({ msg: "Error in addPost !", err: err.message });
    }
};


const singlePost = async (req, res) => {
    try {
        const { id } = req.params;
        if (!id) {
            return res.status(400).json({ msg: "Id is required !" });
        }
        const post = await Post.findById(id)
            .populate({
                path: "admin",
                select: "-password",
            })
            .populate({ path: "likes", select: '-password' })
            .populate({
                path: "comments",
                populate: {
                    path: "admin",
                },
            });
        res.status(200).json({ msg: "Post Fetched !", post });
    } catch (err) {
        res.status(400).json({ msg: "Error in singlePost !", err: err.message });
    }
};


// TODO: Study This Important Function - OPtimise This Further
const allPost = async (req, res) => {
    try {
        const { page } = req.query;
        let pageNumber = page;
        if (!page || page === undefined) {
            pageNumber = 1;
        }
        const posts = await Post.find({})
            .sort({ createdAt: -1 }) // Get Latest Post
            .skip((pageNumber - 1) * 3) // Skipping Previous Posts
            .limit(3) // Limit Post entries
            .populate({ path: "admin", select: "-password" })
            .populate({ path: "likes", select: "-password" })
            .populate({
                path: "comments",
                populate: {
                    path: "admin",
                    model: "User",
                },
            });
        res.status(200).json({ msg: "Post Fetched !", posts });
    } catch (err) {
        res.status(400).json({ msg: "Error in allPost !", err: err.message });
    }
};


const deletePost = async (req, res) => {
    try {
        const { id } = req.params;
        if (!id) {
            return res.status(400).json({ msg: "Id is required !" });
        }
        const postExists = await Post.findById(id);
        if (!postExists) {
            return res.status(400).json({ msg: "Post not found !" });
        }
        // TODO: Optimize For Frontend
        const userId = req.user._id.toString();
        const adminId = postExists.admin._id.toString();
        if (userId !== adminId) {
            return res
                .status(400)
                .json({ msg: "You are not authorized to delete this post !" });
        }
        // TODO: Do cleanup tasks before deleting
        if (postExists.media) {
            await cloudinary.uploader.destroy(
                postExists.public_id,
                (error, result) => {
                    console.log({ error, result });
                }
            );
        }
        await Comment.deleteMany({ _id: { $in: postExists.comments } });
        await User.updateMany(
            {
                $or: [{ posts: id }, { reposts: id }, { replies: id }],
            },
            {
                $pull: {
                    posts: id,
                    reposts: id,
                    replies: id,
                },
            },
            { new: true }
        );
        await Post.findByIdAndDelete(id);
        res.status(400).json({ msg: "Post deleted !" });
    } catch (err) {
        res.status(400).json({ msg: "Error in deletePost !", err: err.message });
    }
};


const likePost = async (req, res) => {
    try {
        const { id } = req.params;
        if (!id) {
            return res.status(400).json({ msg: "Id is required !" });
        }
        const post = await Post.findById(id);
        if (!post) {
            return res.status(400).json({ msg: "No such Post !" });
        }
        if (post.likes.includes(req.user._id)) {
            await Post.findByIdAndUpdate(
                id,
                { $pull: { likes: req.user._id } },
                { new: true }
            );
            return res.status(201).json({ msg: "Post unliked !" });
        }
        await Post.findByIdAndUpdate(
            id,
            { $push: { likes: req.user._id } },
            { new: true }
        );
        return res.status(201).json({ msg: "Post liked !" });
    } catch (err) {
        res.status(400).json({ msg: "Error in likePost !", err: err.message });
    }
};


// ! ALso good to explore route
const repost = async (req, res) => {
    try {
        const { id } = req.params;
        if (!id) {
            return res.status(400).json({ msg: "Id is needed !" });
        }
        const post = await Post.findById(id);
        if (!post) {
            return res.status(400).json({ msg: "No such post !" });
        }
        const newId = new mongoose.Types.ObjectId(id); // Convert id string to Mongoose ID
        if (req.user.reposts.includes(newId)) {
            return res.status(400).json({ msg: "This post is already reposted !" });
        }
        await User.findByIdAndUpdate(
            req.user._id,
            {
                $push: { reposts: post._id },
            },
            { new: true }
        );
        res.status(201).json({ msg: "Reposted !" });
    } catch (err) {
        res.status(400).json({ msg: "Error in repost !", err: err.message });
    }
};




export {
    addPost,
    singlePost,
    allPost,
    deletePost,
    likePost,
    repost   
}
