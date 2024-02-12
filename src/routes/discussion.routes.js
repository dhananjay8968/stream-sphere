import { Router } from "express";
import { verifyJWT } from "../middlewares/auth.middleware.js";
import {
    createDiscussion,
    deleteDiscussion,
    updateDiscussion,
    getUserDiscussions,
} from "../controllers/discussion.controller.js";
import { upload } from "../middlewares/multer.middleware.js";

const router = Router();

router.use(verifyJWT, upload.none());
router.route("/").post(createDiscussion);
router.route("/user/:userId").get(getUserDiscussions);
router.route("/:discussionId").patch(updateDiscussion).delete(deleteDiscussion);

export default router;