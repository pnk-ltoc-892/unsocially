import mongoose, { Schema } from "mongoose";


const userSchema = new Schema(
    {
        username: {
            type: String,
            required: true,
            unique: true,
            trim: true,
            index: true
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
            required: true,
        },
        fullname: {
            type: String,
            default: ""
        },
        bio: {
            type: String,
            default: "",
        },
        avatar: {
            type: String,
            default: "https://res.cloudinary.com/learn-backend/image/upload/v1735838945/root/ebn3ruluofxovr10zh0u.png",
        }
    },
    {
        timestamps: true
    }
);


export const User = mongoose.model("User", userSchema);