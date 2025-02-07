import { Router } from "express";

import { verifyJWT } from "../middlewares/auth.middleware.js";
import {
        registerUser,
        loginUser,
        logoutUser,

        updateProfileAvatar,
        updateProfile,

        getProfileByUsername,
        getMyProfile,
        searchUsers,
        getProfileCardByUsername
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
    .route("/")
    .get(getMyProfile);


router
    .route("/u/:username")
    .get(getProfileByUsername);

router
    .route("/card/:username")
    .get(getProfileCardByUsername);


router
    .route("/update-avatar")
    .patch(upload.single("imageFile"), updateProfileAvatar);


router
    .route("/update-profile")
    .patch(updateProfile);


// ! User Profile Searching
router
    .route("/search")
    .get(searchUsers);



export default router;