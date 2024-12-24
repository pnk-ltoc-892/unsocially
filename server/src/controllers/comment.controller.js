// import { isValidObjectId } from "mongoose";
// import { ApiError } from "../utils/ApiError.js";
// import { ApiResponse } from "../utils/ApiResponse.js";
// import { asyncHandler } from "../utils/asyncHandler.js";

import { Comment } from "../models/comment.model.js";
import { User } from "../models/user.model.js";
import { Post } from "../models/post.model.js";
import mongoose from "mongoose";


const addComment = async (req, res) => {
    try {
        const { id } = req.params; // Post
        const { text } = req.body;
        if (!id) {
            return res.status(400).json({ msg: "id is required !" });
        }
        if (!text) {
            return res.status(400).json({ msg: "No comment is added !" });
        }
        const postExists = await Post.findById(id);
        if (!postExists) {
            return res.status(400).json({ msg: "No such post !" });
        }
        const comment = new Comment({
            text,
            admin: req.user._id,
            post: postExists._id,
        });
        const newComment = await comment.save();
        await Post.findByIdAndUpdate(
            id,
            {
                $push: { comments: newComment._id },
            },
            { new: true }
        );
        await User.findByIdAndUpdate(
            req.user._id,
            {
                $push: { replies: newComment._id },
            },
            { new: true }
        );
        res.status(201).json({ msg: "Commented !" });
    } catch (err) {
        res.status(400).json({ msg: "Error in addComment !", err: err.message });
    }
};

const deleteComment = async (req, res) => {
    try {
        const { postId, id } = req.params;
        if (!postId || !id) {
            return res.status(400).json({ msg: "Error in deleteComment !" });
        }
        const postExists = await Post.findById(postId);
        if (!postExists) {
            return res.status(400).json({ msg: "No such post !" });
        }
        const commentExists = await Comment.findById(id);
        if (!commentExists) {
            return res.status(400).json({ msg: "No such comment !" });
        }
        const newId = new mongoose.Types.ObjectId(id);
        if (postExists.comments.includes(newId)) {
            const id1 = commentExists.admin._id.toString();
            const id2 = req.user._id.toString();
            if (id1 !== id2) {
                return res
                    .status(400)
                    .json({ msg: "You are not authorized to delete the comment !" });
            }
            await Post.findByIdAndUpdate(
                postId,
                {
                    $pull: { comments: id },
                },
                { new: true }
            );
            await User.findByIdAndUpdate(
                req.user._id,
                {
                    $pull: { replies: id },
                },
                { new: true }
            );
            await Comment.findByIdAndDelete(id);
            return res.status(201).json({ msg: "Comment deleted !" });
        }
        res.status(201).json({ msg: "This post does not include the comment !" });
    } catch (err) {
        res.status(400).json({ msg: "Error in deleteComment", err: err.message });
    }
};


export {
    addComment,
    deleteComment
}