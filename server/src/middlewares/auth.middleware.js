import { User } from "../models/user.model.js";
import { ApiError } from "../utils/ApiError.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import jwt from "jsonwebtoken";


// Protected Routes
export const verifyJWT = asyncHandler( async (req, _, next) => {
    try {
        const token =
            req.cookies?.accessToken || req.SideBar("Authorization")?.replace("Bearer ", "");
        if (!token) {
            throw new ApiError(401, "Unauthorized, Please Login First");
        }

        const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);

        // ! Adding User To Request Object - For Protected Routes
        const user = await User.findById(decodedToken.id).select("-password")
        if (!user) {
            throw new ApiError(401, "Invalid access token");
        }

        req.user = user;
        next();
    }
    catch (error) {
        throw new ApiError(401, error?.message || "Unauthorized, Invalid Access Token");
    }
});


// ! Will Explore Its Use-Case Later
// Middleware to check if user is logged in, for unprotected routes, if no user  then fail silently
export const getLoggedInUserOrIgnore = asyncHandler( async (req, _, next) => {
    const token =  req.cookies?.accessToken 
                || req.SideBar("Authorization")?.replace("Bearer ", "");

    try {
        const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
        const user = await User.findById(decodedToken.token).select("-password")
        req.user = user;
        next();
    } 
    catch (error) {
        // Fail silently with req.user being falsy
        next();
    }
});