import { Follow } from "../models/follow.model.js";
import { User } from "../models/user.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";


const toggleUserFollow = asyncHandler(async (req, res) => {
    const { toBeFollowedUserId } = req.params;
    if(toBeFollowedUserId.toString() === req.user?._id.toString()){
        throw new ApiError(400, "Cannot Follow Yourself");
    }


    const user = await User.findById(toBeFollowedUserId);
    if (!user) {
        throw new ApiError(400, "User Does Not Exist");
    }

    const isAlreadyFollowing = await Follow.find(
        {
            followeeId: toBeFollowedUserId,
            followerId: req.user?._id
        }
    );
    if (isAlreadyFollowing.length) {
        await Follow.findOneAndDelete({
            followeeId: toBeFollowedUserId,
            followerId: req.user?._id
        });
        return res
        .status(200)
        .json(new ApiResponse(200, { isFollowing: false }, 'User Unfollowed Successfully'));
    }

    await Follow.create({
        followeeId: toBeFollowedUserId,
        followerId: req.user?._id
    });

    return res
        .status(200)
        .json(new ApiResponse(200, { isFollowing: true }, 'User Followed Successfully'));
});



export {
    toggleUserFollow
}