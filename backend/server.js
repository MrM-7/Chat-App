import express from "express"
import dotenv from "dotenv"
import cookieParser from "cookie-parser"
import connectDB from "./db/index.js"
import { app, server } from "./socket/socket.js"

import path from "path"

dotenv.config()

const PORT = process.env.PORT || 5000

const __dirname = path.resolve()

app.use(express.json())  // to parse incoming requests with json payload
app.use(cookieParser())

// routes import 
import authRoutes from "./routes/auth.routes.js"
import messageRoutes from "./routes/message.routes.js"
import userRoutes from "./routes/user.routes.js"

// routes declaration   
app.use("/api/v1/auth", authRoutes)
app.use("/api/v1/messages", messageRoutes)
app.use("/api/v1/users", userRoutes)

app.use(express.static(path.join(__dirname, 'frontend', 'dist')));

app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "frontend", "dist", "index.html"))
})

connectDB()
.then(() => {
    server.listen(PORT, () => {
        console.log(`⚙️  Server is running at port : ${PORT}`);
    })
})
.catch((err) => {
    console.log("MONGO db connection failed !!! ", err);
})