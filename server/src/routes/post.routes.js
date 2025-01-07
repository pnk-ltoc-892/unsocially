import { Router } from "express";
import { verifyJWT } from "../middlewares/auth.middleware.js";
import {
    uploadPostImage,
    addPost,
    deletePost,
    getPostById,
    updatePost,
    getAllPosts,
    getMyPosts,
    getPostsByUsername,
    getPostsByTag,
    removePostImage
}
    from "../controllers/post.controller.js";
import { upload } from "../middlewares/multer.middleware.js";


const router = Router();

// All Post Routes Needs To Be Authenticated
router.use(verifyJWT);


// ! Add get post by bookmark also - complete at last
// ! While deleting the post - Do cleanup task of deleting bookmarks, comments and routes ?

router
    .route("/")
    .get(getAllPosts)
    .patch(updatePost)
    .delete(deletePost);


router
    .route("/my")
    .get(getMyPosts);


router
    .route("/u/:username")
    .get(getPostsByUsername); // ! Get


router
    .route("/tag/:tag")
    .get(getPostsByTag); // ! Get


router
    .route("/:postId")
    .get(getPostById)
    .patch(updatePost)
    .delete(deletePost);


router
    .route("/post-image")
    .post(upload.single("imageFile"), uploadPostImage);


router
    .route("/post")
    .post(addPost);


router
    .route("/post-image/remove/:postId/:imageId")
    .patch(removePostImage);



export default router;
