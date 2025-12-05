import express from "express";
import cors from "cors"
import userRouter from "./src/routes/user.route.js";
import courseRouter from "./src/routes/course.route.js";


const app = express();

app.use(
    cors({
        origin:process.env.CORS_ORIGIN,
        credentials: true,
    })
)

//user Routes

app.use("/user", userRouter)
app.use("/course", courseRouter)

export default app