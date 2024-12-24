import { Router } from "express";
import { verifyJWT } from "../middlewares/auth.middleware.js";
import { addComment, deleteComment } from "../controllers/comment.controller.js";

const router = Router()


router.use(verifyJWT)

router.route("/post/:id").post(addComment)

router.route("/:postId/:id").delete(deleteComment)


export default router