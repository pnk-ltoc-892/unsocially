import mongoose, { Schema } from "mongoose";


const likeSchema = new Schema(
    {
        likedBy: {
            type: Schema.Types.ObjectId,
            ref: "User"
        },
        postId: {
            type: Schema.Types.ObjectId,
            ref: "Post",
            default: null
        },
        commentId: {
            type: Schema.Types.ObjectId,
            ref: "Comment",
            default: null
        }
    },
    {
        timestamps: true
    }
);


export const Like = mongoose.model("Like", likeSchema);