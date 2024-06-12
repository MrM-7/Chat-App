import { Router } from "express";
import { getMessages, sendMessage } from "../controller/message.controller.js";
import { verifyJWT } from "../middleware/auth.middleware.js";

const router = Router()

router.use(verifyJWT)

router
.route("/:id")
.get(getMessages)

router
.route("/send/:id")
.post(sendMessage)

export default router