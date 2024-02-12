import asyncHandler from "../utils/asyncHandler.js";
import ApiError from "../utils/piError.js";
import { Discussion } from "../models/discussion.model.js";
import ApiResponse from "../utils/ApiResponse.js";
import mongoose, { isValidObjectId } from "mongoose";

const createDiscussion = asyncHandler(async (req, res) => {
    const { content } = req.body;

    if (!content) {
        throw new ApiError(400, "content is required");
    }

    const discussion = await Discussion.create({
        content,
        owner: req.user?._id,
    });

    if (!discussion) {
        throw new ApiError(500, "failed to create Discussion please try again");
    }

    return res
        .status(200)
        .json(new ApiResponse(200, discussion, "Discussion created successfully"));
});

const updateDiscussion = asyncHandler(async (req, res) => {
    const { content } = req.body;
    const { discussionId } = req.params;

    if (!content) {
        throw new ApiError(400, "content is required");
    }

    if (!isValidObjectId(discussionId)) {
        throw new ApiError(400, "Invalid DiscussionId");
    }

    const discussion = await Discussion.findById(discussionId);

    if (!discussion) {
        throw new ApiError(404, "Discussion not found");
    }

    if (discussion?.owner.toString() !== req.user?._id.toString()) {
        throw new ApiError(400, "only owner can edit thier Discussion");
    }

    const newDiscussion = await Discussion.findByIdAndUpdate(
        DiscussionId,
        {
            $set: {
                content,
            },
        },
        { new: true }
    );

    if (!newDiscussion) {
        throw new ApiError(500, "Failed to edit Discussion please try again");
    }

    return res
        .status(200)
        .json(new ApiResponse(200, newDiscussion, "Discussion updated successfully"));
});

const deleteDiscussion = asyncHandler(async (req, res) => {
    const { discussionId } = req.params;

    if (!isValidObjectId(DiscussionId)) {
        throw new ApiError(400, "Invalid DiscussionId");
    }

    const discussion = await Discussion.findById(DiscussionId);

    if (!discussion) {
        throw new ApiError(404, "Discussion not found");
    }

    if (discussion?.owner.toString() !== req.user?._id.toString()) {
        throw new ApiError(400, "only owner can delete thier Discussion");
    }

    await Discussion.findByIdAndDelete(discussionId);

    return res
        .status(200)
        .json(new ApiResponse(200, {discussionId}, "Discussion deleted successfully"));
});

const getUserDiscussions = asyncHandler(async (req, res) => {
    const { userId } = req.params;

    if (!isValidObjectId(userId)) {
        throw new ApiError(400, "Invalid userId");
    }

    const discussions = await Discussion.aggregate([
        {
            $match: {
                owner: new mongoose.Types.ObjectId(userId),
            },
        },
        {
            $lookup: {
                from: "users",
                localField: "owner",
                foreignField: "_id",
                as: "ownerDetails",
                pipeline: [
                    {
                        $project: {
                            username: 1,
                            "avatar.url": 1,
                        },
                    },
                ],
            },
        },
        {
            $lookup: {
                from: "likes",
                localField: "_id",
                foreignField: "Discussion",
                as: "likeDetails",
                pipeline: [
                    {
                        $project: {
                            likedBy: 1,
                        },
                    },
                ],
            },
        },
        {
            $addFields: {
                likesCount: {
                    $size: "$likeDetails",
                },
                ownerDetails: {
                    $first: "$ownerDetails",
                },
                isLiked: {
                    $cond: {
                        if: {$in: [req.user?._id, "$likeDetails.likedBy"]},
                        then: true,
                        else: false
                    }
                }
            },
        },
        {
            $sort: {
                createdAt: -1
            }
        },
        {
            $project: {
                content: 1,
                ownerDetails: 1,
                likesCount: 1,
                createdAt: 1,
                isLiked: 1
            },
        },
    ]);

    return res
        .status(200)
        .json(new ApiResponse(200, discussions, "Discussions fetched successfully"));
});

export { createDiscussion, updateDiscussion, deleteDiscussion, getUserDiscussions };