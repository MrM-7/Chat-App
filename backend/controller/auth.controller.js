import { User } from "../models/user.model.js"
import bcrypt from "bcrypt"
import generateAccessToken from "../utils/generateToken.js"

const signup = async (req, res) => {
    try {
        const { fullName, username, password, confirmPassword, gender } = req.body

        if(password.trim().length < 6){
            return res.status(400).json({error: "Password length must be at least 6 characters"})
        }
    
        if(password !== confirmPassword){
            return res.status(400).json({error: "Password and confirm password must be same"})
        }
    
        const user = await User.findOne({ username })
    
        if(user){
            return res.status(400).json({error: "Username already exists"})
        }
    
        // Hash Password
        const hashedPassword = await bcrypt.hash(password, 10)
    
        const boyProfilePic = `https://avatar.iran.liara.run/public/boy?username=${username}`
        const girlProfilePic = `https://avatar.iran.liara.run/public/girl?username=${username}`
    
        const newUser = await User.create({
            fullName,
            username,   
            gender,
            password: hashedPassword,
            profilePic: gender === "male" ? boyProfilePic : girlProfilePic
        })
    
        if(!newUser){
            return res.status(500).json({error: "Something went wrong while registering the user"})
        }

        generateAccessToken(newUser._id, res)

        const createdUser = await User.findById(newUser._id).select("-password -gender")
    
        return res
        .status(201)
        .json({ data: createdUser, success: "User created successfully"})
    } catch (error) {
        console.log("Error in signup controller: ", error.message);
        return res.status(500).json({error: "Internal server error"})
    }
}

const login = async (req, res) => { 
    try {
        const { username, password } = req.body
    
        if(!username || !password){
            return res.status(400).json({error: "All fields are required"})
        }
    
        const user = await User.findOne({ username })
        const result = await bcrypt.compare(password, user?.password || "")

        if(!user || !result){
            return res.status(400).json({error: "Invalid username or password"})
        }
    
        generateAccessToken(user._id, res)

        const signedInUser = await User.findById(user._id).select("-password -gender")
    
        return res
        .status(200)
        .json({data: signedInUser , success: "User logged in successfully"})
    } catch (error) {
        console.log("Error in login controller: ", error.message);
        return res.status(500).json({error: "Internal serval error"})
    }
}

const logout = (req, res) => {
    try {
        res.cookie("accessToken", "", { maxAge: 0, httpOnly: true })
        res.status(200).json({success: "User logged out successfully"})
    } catch (error) {
        console.log("Error in logout controller: ", error.message);
        return res.status(500).json({error: "Internal serval error"})
    }
}

export {
    signup,
    login,
    logout
}