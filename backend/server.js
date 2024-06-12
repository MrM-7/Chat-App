import express from "express"
import dotenv from "dotenv"
import cookieParser from "cookie-parser"
import connectDB from "./db/index.js"

const app = express()
dotenv.config()

const PORT = process.env.PORT || 5000

app.use(express.json())  // to parse incoming requests with json payload
app.use(cookieParser())

// routes import 
import authRoutes from "./routes/auth.routes.js"
import messageRoutes from "./routes/message.routes.js"

// routes declaration   
app.use("/api/v1/auth", authRoutes)
app.use("/api/v1/messages", messageRoutes)

connectDB()
.then(() => {
    app.listen(PORT, () => {
        console.log(`⚙️  Server is running at port : ${PORT}`);
    })
})
.catch((err) => {
    console.log("MONGO db connection failed !!! ", err);
})