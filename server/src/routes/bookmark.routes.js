import { Router } from "express";
import { getBookMarkedPosts, togglePostBookmark } from "../controllers/bookmark.controller.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";


const router = Router();


router
    .route("/")
    .get(verifyJWT, getBookMarkedPosts);


router
    .route("/:postId")
    .post(verifyJWT, togglePostBookmark);


export default router;
