import mongoose, { Schema } from "mongoose";

const discussionSchema = new Schema(
    {
        content: {
            type: String,
            required: true
        },
        owner: {
            type: Schema.Types.ObjectId,
            ref: "User"
        }
    }, 
    {
        timestamps: true
    }
)

export const Discussion = mongoose.model("Discussion",discussionSchema)