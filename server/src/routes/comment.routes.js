import { Router } from "express";
import { verifyJWT } from "../middlewares/auth.middleware.js";
import { addComment, deleteComment, getPostComment, getUserComments, updateComment } from "../controllers/comment.controller.js";

const router = Router();

// Check if the routes are working
router.get("/", (req, res) => {
    res.json({hey: "Hello Routes"});
})


router.use(verifyJWT);

// ! Aggregate Routes for getting post comments
router
    .route("/post/:postId")
    .post(addComment);

router
    .route("/:postId")
    .get(getPostComment)

router
    .route("/u/:userId")
    .get(getUserComments)

router
    .route("/:commentId")
    .patch(updateComment)
    .delete(deleteComment);


export default router;