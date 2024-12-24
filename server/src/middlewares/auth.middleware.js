import { User } from "../models/user.model.js";
import { ApiError } from "../utils/ApiError.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import jwt from "jsonwebtoken";

export const verifyJWT = asyncHandler(async (req, _, next) => {
    try {
        const token =
        req.cookies?.token || req.header("Authorization")?.replace("Bearer ", "");
        if (!token) {
        throw new ApiError(401, "UnAuthorized request");
        }

    const decodedToken = jwt.verify(token, process.env.JWT_SECRET);

    // const user = await User.findById(decodedToken?._id).select("-password")
    const user = await User.findById(decodedToken.token)
        // .select("-password")
        .populate("followers")
        .populate("posts")
        .populate("replies")
        .populate("reposts");
    if (!user) {
      // TODO: discussion on frontend
        throw new ApiError(401, "Invalid Token");
    }
    // Add Information To req, so that can be used by further controllers
    req.user = user;
    next();
    } 
    catch (error) {
        throw new ApiError(401, error?.message || "Invalid Access Token");
    }
});
