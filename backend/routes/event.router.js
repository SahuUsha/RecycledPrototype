import { Router } from "express";
import { addEvent, getAllIncompleteEvent, joinEvent, upload } from "../controllers/event.controller.js";
import verifyJWT from "../middleware/auth.middleware.js";
import { toggleVote } from "../controllers/vote.controller.js";


const router = Router()


router.route("/addEvent").post(verifyJWT,upload.single("image"),addEvent)
router.route("/getallEvent").get(verifyJWT,getAllIncompleteEvent)
router.route("/join/:eventId").post(verifyJWT,joinEvent)
router.route("/vote/:eventId").post(verifyJWT,toggleVote)

export default router;