import { Router } from "express";
import { verifyJWT } from "../middlewares/auth.middleware.js";
import {
    toggleCommentLike,
    togglePostLike
} from "../controllers/like.controller.js";

const router = Router();

// Check if the routes are working
router.get("/", (req, res) => {
    res.json({ hey: "Hello Routes" });
})

router.use(verifyJWT);

router.post("/post/:postId", togglePostLike)

router.post("/comment/:commentId", toggleCommentLike)


export default router;