import { Router } from "express"
import { signup, login, logout } from "../controller/auth.controller.js"

const router = Router()

router
.route("/login")
.post(login)

router
.route("/signup")
.post(signup)

router
.route("/logout")
.post(logout)

export default router