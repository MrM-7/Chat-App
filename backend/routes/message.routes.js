import { Router } from "express";
import { sendMessage } from "../controller/message.controller.js";
import { verifyJWT } from "../middleware/auth.middleware.js";

const router = Router()

router.use(verifyJWT)

router
.route("/send/:id")
.post(sendMessage)

export default router