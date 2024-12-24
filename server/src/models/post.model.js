import mongoose, { Schema } from "mongoose";


const postSchema = new Schema(
    {
        admin: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
        },
        text: {
            type: String,
        },
        media: {
            type: String,
        },
        public_id: {
            type: String,
        },
        likes: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
        comments: [{ type: mongoose.Schema.Types.ObjectId, ref: "Comment" }],
    },
    { 
        timestamps: true 
    }
);


export const Post = mongoose.model("Post", postSchema);
