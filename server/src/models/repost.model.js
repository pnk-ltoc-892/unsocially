import mongoose, { Schema } from "mongoose";
import mongooseAggregatePaginate from "mongoose-aggregate-paginate-v2";


const repostSchema = new Schema(
    {
        postId: {
            type: Schema.Types.ObjectId,
            ref: "Post"
        },
        repostedBy: {
            type: Schema.Types.ObjectId,
            ref: "User"
        }
    },
    {
        timestamps: true
    }
);

repostSchema.plugin(mongooseAggregatePaginate);

export const Repost = mongoose.model("Repost", repostSchema);