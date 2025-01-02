import mongoose, { Schema } from "mongoose";
import mongooseAggregatePaginate from "mongoose-aggregate-paginate-v2";

const postSchema = new Schema(
    {
        content: {
            type: String,
            index: true,
        },
        images: {
            type: [String],
            default: [],
        },
        tags: {
            type: [String],
            default: [],
        },
        author: {
            type: Schema.Types.ObjectId,
            ref: "User"
        }
    },
    { 
        timestamps: true 
    }
);

postSchema.plugin(mongooseAggregatePaginate);

export const Post = mongoose.model("Post", postSchema);
