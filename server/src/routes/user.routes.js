import { Router } from "express";

import { verifyJWT } from "../middlewares/auth.middleware.js";
import { 
        followUser, 
        getCurrentUser,
        loginUser, 
        logoutUser, 
        myInfo, 
        registerUser, 
        searchUser, 
        updateProfile} from "../controllers/user.controller.js";

// import { upload } from "../middlewares/multer.middleware.js"


const router = Router();


// ! User Auth Routes
router.route("/register").post(registerUser);

router.route("/login").post(loginUser);

router.route("/logout").post(verifyJWT, logoutUser);

router.get("/check-auth", verifyJWT, async (req, res) => {
    res.status(201).json({user: req.user});
})


// ! User Profile Routes
router.route("/update-profile").put(verifyJWT, updateProfile)

router.route("/my-profile").post(verifyJWT, myInfo)

router.route("/user/:id").get(verifyJWT, getCurrentUser)

// ! Important Route - Need Searching And Further Optimizations
router.route("/search/:query").get(verifyJWT, searchUser)


router.route("/follow/:id").put(verifyJWT, followUser)


export default router;