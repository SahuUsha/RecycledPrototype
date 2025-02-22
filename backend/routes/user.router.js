import { Router } from "express";
import { loginUser, logoutUser, signUp } from "../controllers/user.controller.js";
import { UserDetail } from "../controllers/dashboard.controller.js";
import verifyJWT from "../middleware/auth.middleware.js";


const router = Router()

router.route("/signup").post(signUp)
router.route("/login").post(loginUser)
router.route("/logout").post(logoutUser)
router.route('/dashboard').get(verifyJWT,UserDetail)

export default router;
