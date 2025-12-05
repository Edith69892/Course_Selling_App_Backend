import express from "express";
import cors from "cors"
import userRouter from "./src/routes/user.route.js";
import courseRouter from "./src/routes/course.route.js";
import adminRouter from "./src/routes/admin.route.js";


const app = express();

app.use(
    cors({
        origin:process.env.CORS_ORIGIN,
        credentials: true,
    })
)

//user Routes

app.use("/api/v1/user", userRouter)
app.use("/api/v1/course", courseRouter)
app.use("/api/v1/admin", adminRouter)

export default app