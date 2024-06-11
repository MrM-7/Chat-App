import { User } from "../models/user.model.js"
import bcrypt from "bcrypt"

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

        const createdUser = await User.findById(newUser._id).select("-password")
    
        return res
        .status(201)
        .json({ data: createdUser, success: "User created successfully"})
    } catch (error) {
        console.log("Error in signup controller: ", error.message);
        return res.status(500).json({error: "Internal server error"})
    }
}

const login = (req, res) => {
    res.send("logged in")
}

const logout = (req, res) => {
    res.send("logout")
}

export {
    signup,
    login,
    logout
}