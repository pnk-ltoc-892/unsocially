import { Router } from "express";
import { verifyJWT } from "../middlewares/auth.middleware.js";
import { addPost, allPost, deletePost, likePost, repost, singlePost } from "../controllers/post.controller.js";


const router = Router()

// All Post Routes Needs To Be Authenticated
router.use(verifyJWT)

router.route("/post").post(addPost)

router.route("/post/:id").get(singlePost)

router.route("/").get(allPost)

router.route("/post/:id").delete(deletePost)

router.route("/post/like/:id").put(likePost)

router.route("/repost/:id").put(repost)


export default router
