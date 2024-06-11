import mongoose, { Schema } from "mongoose";

const userSchema = new Schema(
    {
        username: {
            type: String,
            required: true,
            unique: true
        },
        fullName: {
            type: String,
            required: true
        },
        profilePic: {
            type: String,
            default: ""
        },
        password: {
            type: String,
            required: true,
            minlength: 6
        },
        gender: {
            type: String,
            required: true,
            enum: ["male", "female"]
        }
    },
    { timestamps: true }
)

export const User = mongoose.model("User", userSchema)