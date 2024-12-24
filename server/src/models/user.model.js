import mongoose, { Schema } from "mongoose";


const userSchema = new Schema(
    {
        username: {
            type: String,
            required: true,
            unique: true,
            trim: true,
            index: true     // DB Searching - Optimization, :Explore It...
        },
        email: {
            type: String,
            required: true,
            unique: true,
            lowercase: true,
            trim: true,
        },
        password: {
            type: String,
            required: [true, "Password Is Required"],
            // select: false, // Password Will Not Be Shown In Response
        },
        bio: {
            type: String,
            default: "",
        },
        profilePic: {
            type: String,
            default: "https://www.pngall.com/wp-content/uploads/5/User-Profile-PNG-Clipart.png",
        },
        public_id: {
            type: String,
            default: "",
        },
        followers: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
        posts: [{ type: mongoose.Schema.Types.ObjectId, ref: "Post" }],
        replies: [{ type: mongoose.Schema.Types.ObjectId, ref: "Comment" }],
        reposts: [{ type: mongoose.Schema.Types.ObjectId, ref: "Post" }],
    },
    {
        timestamps: true
    }
)


export const User = mongoose.model("User", userSchema);