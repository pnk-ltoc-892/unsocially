import { Router } from "express";
import { toggleUserFollow } from "../controllers/follow.controller.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";


const router = Router();

// Check if the routes are working
router.get("/", (req, res) => {
    res.json({hey: "Hello Routes"});
})

// ! Get Route for getting user followers and following users - Aggregation

router
    .route("/:toBeFollowedUserId")
    .post(verifyJWT, toggleUserFollow)

export default router;