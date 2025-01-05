import { Router } from "express";
import { togglePostBookmark } from "../controllers/bookmark.controller.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";


const router = Router();

// Check if the routes are working
router.get("/", (req, res) => {
    res.json({hey: "Hello Routes"});
})


router
    .route("/:postId")
    .post(verifyJWT, togglePostBookmark);


export default router;
