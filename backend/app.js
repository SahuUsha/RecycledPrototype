import express from "express"
import cors from "cors"
import cookieParser from "cookie-parser"

const app = express()

// app.use(cors({
//     origin: process.env.CORS_ORIGIN,  // Frontend URL
//     credentials: true,  // Allow cookies (if using cookies for token)
//     methods: ["GET", "POST", "PUT", "DELETE"],  // Allowed HTTP methods
//     allowedHeaders: ["Content-Type", "Authorization"],  // Allowed headers
//   }));

app.use(cors({
  origin: 'http://localhost:5173',  // Frontend URL
  credentials: true,  // Allow cookies (if using cookies for token)
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