import express from "express"
import cors from "cors"
import cookieParser from "cookie-parser"

const app = express()

const allowedOrigins = ["https://prototype-recycled.vercel.app"];  // Your frontend URL

app.use(cors({
    origin: allowedOrigins,  // Set explicit frontend URL
    credentials: true,  // Allow cookies
    methods: ["GET", "POST", "PUT", "DELETE"],  // Allowed HTTP methods
    allowedHeaders: ["Content-Type", "Authorization"],  // Allowed headers
}));
app.use(express.json())

app.use(express.urlencoded({ extended: true }));

app.use(express.static("public"))

app.use(cookieParser())

import userRouter from './routes/user.router.js'
import eventRouter from './routes/event.router.js'


app.use("/api/users",userRouter)
app.use("/api/event",eventRouter)


export default app;