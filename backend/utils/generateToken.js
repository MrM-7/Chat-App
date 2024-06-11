import jwt from "jsonwebtoken"

const generateAccessToken = (userId, res) => {
    const accessToken = jwt.sign({ userId }, process.env.ACCESS_TOKEN_SECRET,
        { expiresIn: process.env.ACCESS_TOKEN_EXPIRY }
    )

    res.cookie("accessToken", accessToken, {
        httpOnly: true, // prevent XSS attacks
        maxAge: 10 * 24 * 60 * 60 * 1000,
        sameSite: "strict",
        secure: process.env.NODE_ENV !== "development"
    })
}

export default generateAccessToken