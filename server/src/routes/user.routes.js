import { Router } from "express";

import { verifyJWT } from "../middlewares/auth.middleware.js";
import {
        registerUser,
        loginUser,
        logoutUser,

        updateProfileAvatar,
        updateProfile,
        myProfile
} from "../controllers/user.controller.js";

import { upload } from "../middlewares/multer.middleware.js";

const router = Router();


// ! User Auth Routes
router.route("/register").post(registerUser);

router.route("/login").post(loginUser);

router.route("/logout").post(verifyJWT, logoutUser);

router.get("/check-auth", verifyJWT, async (req, res) => {
    res.status(201).json({ user: req.user });
})

router.use(verifyJWT);

// ! User Profile Routes
router
    .route("/update-avatar")
    .post(upload.single("imageFile"), updateProfileAvatar);


router.route("/update-profile").patch(updateProfile);


router.get("/my-profile", myProfile);


export default router;