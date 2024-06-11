import express from "express"
import dotenv from "dotenv"
import connectDB from "./db/index.js"

const app = express()
dotenv.config()

const PORT = process.env.PORT || 5000

app.get("/", (req, res) => {
    res.send("Home world!")
})

// routes import 
import authRoutes from "./routes/auth.routes.js"

// routes declaration   
app.use("/api/v1/auth", authRoutes)

connectDB()
.then(() => {
    app.listen(PORT, () => {
        console.log(`⚙️  Server is running at port : ${PORT}`);
    })
})
.catch((err) => {
    console.log("MONGO db connection failed !!! ", err);
})