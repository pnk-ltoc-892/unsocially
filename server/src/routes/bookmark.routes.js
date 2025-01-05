import { Router } from "express";
import { togglePostBookmark } from "../controllers/bookmark.controller.js";


const router = Router();

// Check if the routes are working
router.get("/", (req, res) => {
    res.json({hey: "Hello Routes"});
})


router
    .route("/:postId")
    .post(togglePostBookmark);


export default router;
