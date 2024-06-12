import jwt from "jsonwebtoken"
import { User } from "../models/user.model.js"

export const verifyJWT = async (req, res, next) => {
    try {
        const token = req.cookies?.accessToken || req.header("Authorization")?.replace("Bearer ", "")    // Bearer token
        if(!token){
            return res.status(401).json({error: "Unauthorized request"})
        }

        const decodeToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET)

        const user = await User.findById(decodeToken?.userId).select("-password -gender")

        if(!user){
            return res.status(401).json({error: "Invalid Access Token"})
        }

        req.user = user

        next()

    } catch (error) {
        return res.status(401).json({error: "Invalid Access Token"})
    }
}