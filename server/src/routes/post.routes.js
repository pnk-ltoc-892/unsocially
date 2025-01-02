import { Router } from "express";
import { verifyJWT } from "../middlewares/auth.middleware.js";
import { addPost, allPost, deletePost, likePost, repost, singlePost, uploadPostImage } from "../controllers/post.controller.js";
import { upload } from "../middlewares/multer.middleware.js";


const router = Router();

// Check if the routes are working
router.get("/", (req, res) => {
    res.json({hey: "Hello Routes"});
})

// All Post Routes Needs To Be Authenticated
router.use(verifyJWT)

router.route("/post-image").post(upload.single("imageFile"), uploadPostImage)

router.route("/post").post(addPost)

router.route("/post/:id").get(singlePost)

router.route("/").get(allPost)

router.route("/post/:id").delete(deletePost)

router.route("/post/like/:id").put(likePost)

router.route("/repost/:id").put(repost)


export default router
