import connectDB from "../src/db/index.js";
import { User } from "../src/models/user.model.js";
import { Follow } from "../src/models/follow.model.js";
import { Post } from "../src/models/post.model.js";
import { Comment } from "../src/models/comment.model.js";
import { Like } from "../src/models/like.model.js";
import { Bookmark } from "../src/models/bookmark.model.js";
import { Repost } from "../src/models/repost.model.js";

const dryRun = process.argv.includes("--dry-run");

const uniqueIds = (docs, field = "_id") => [
    ...new Map(docs.map((doc) => [String(doc[field]), doc[field]])).values(),
];

const run = async () => {
    await connectDB();

    const zeroFollowerUsers = await User.aggregate([
        {
            $lookup: {
                from: "follows",
                localField: "_id",
                foreignField: "followeeId",
                as: "Followers",
            },
        },
        { $match: { Followers: { $size: 0 } } },
        { $project: { username: 1, email: 1, createdAt: 1 } },
    ]);

    const userIds = zeroFollowerUsers.map((user) => user._id);
    const posts = await Post.find({ author: { $in: userIds } }).select("_id").lean();
    const postIds = posts.map((post) => post._id);

    const comments = await Comment.find({
        $or: [
            { author: { $in: userIds } },
            { postId: { $in: postIds } },
        ],
    }).select("_id").lean();
    const commentIds = uniqueIds(comments);

    const counts = {
        users: userIds.length,
        posts: postIds.length,
        comments: commentIds.length,
        likes: await Like.countDocuments({
            $or: [
                { likedBy: { $in: userIds } },
                { postId: { $in: postIds } },
                { commentId: { $in: commentIds } },
            ],
        }),
        bookmarks: await Bookmark.countDocuments({
            $or: [
                { bookmarkedBy: { $in: userIds } },
                { postId: { $in: postIds } },
            ],
        }),
        reposts: await Repost.countDocuments({
            $or: [
                { repostedBy: { $in: userIds } },
                { postId: { $in: postIds } },
            ],
        }),
        follows: await Follow.countDocuments({
            $or: [
                { followerId: { $in: userIds } },
                { followeeId: { $in: userIds } },
            ],
        }),
    };

    console.log(dryRun ? "DRY RUN — no documents will be deleted" : "DELETING zero-follower users and related data");
    console.log(JSON.stringify(counts, null, 2));
    console.log("usernames:", zeroFollowerUsers.map((user) => user.username).join(", ") || "(none)");

    if (dryRun || userIds.length === 0) {
        process.exit(0);
    }

    await Like.deleteMany({
        $or: [
            { likedBy: { $in: userIds } },
            { postId: { $in: postIds } },
            { commentId: { $in: commentIds } },
        ],
    });
    await Bookmark.deleteMany({
        $or: [
            { bookmarkedBy: { $in: userIds } },
            { postId: { $in: postIds } },
        ],
    });
    await Repost.deleteMany({
        $or: [
            { repostedBy: { $in: userIds } },
            { postId: { $in: postIds } },
        ],
    });
    await Comment.deleteMany({
        $or: [
            { author: { $in: userIds } },
            { postId: { $in: postIds } },
        ],
    });
    await Post.deleteMany({ author: { $in: userIds } });
    await Follow.deleteMany({
        $or: [
            { followerId: { $in: userIds } },
            { followeeId: { $in: userIds } },
        ],
    });
    await User.deleteMany({ _id: { $in: userIds } });

    console.log("Cleanup complete.");
    process.exit(0);
};

run().catch((error) => {
    console.error(error);
    process.exit(1);
});
