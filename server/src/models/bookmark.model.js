import mongoose, { Schema } from "mongoose";
import mongooseAggregatePaginate from "mongoose-aggregate-paginate-v2";

const bookmarkSchema = new Schema(
    {
        postId: {
            type: Schema.Types.ObjectId,
            ref: "Post",
        },
        bookmarkedBy: {
            type: Schema.Types.ObjectId,
            ref: "User"
        }
    },
    { 
        timestamps: true 
    }
);

bookmarkSchema.plugin(mongooseAggregatePaginate);

export const Bookmark = mongoose.model("Bookmark", bookmarkSchema);
