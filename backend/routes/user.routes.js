import { Router } from "express";
import { verifyJWT } from './../middleware/auth.middleware.js';
import { getUsersForSidebar } from "../controller/user.controller.js";

const router = Router()

router.use(verifyJWT)

router
.route("/")
.get(getUsersForSidebar)

export default router