import { Bookmark } from "../models/bookmark.model.js";
import { Post } from "../models/post.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";


const togglePostBookmark = asyncHandler(async (req, res) => {
    const { postId } = req.params;
    const post = await Post.findById(postId);
    if (!post) {
        throw new ApiError(400, "Post Does Not Exist");
    }

    const isBookmarkedAlready = await Bookmark.findOne(
        { postId, bookmarkedBy: req.user?._id }
    );
    if (isBookmarkedAlready) {
        await Bookmark.findOneAndDelete({ postId, bookmarkedBy: req.user?._id })
        return res
            .status(200)
            .json(new ApiResponse(200, { isBookmarked: false }, "Post Bookmark Removed"))
    }

    await Bookmark.create({ postId, bookmarkedBy: req.user?._id });

    return res
        .status(200)
        .json(new ApiResponse(200, { isBookmarked: true }, "Post Bookmarked Succesfully"));
})



export {
    togglePostBookmark
}