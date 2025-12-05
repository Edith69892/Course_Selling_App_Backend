import app from "./app.js"
import mongoose from "mongoose";
import dotenv from "dotenv"

dotenv.config({
    path: ".env"
})

    ; (async () => {

        try {
            await mongoose.connect(`${process.env.MONGO_URI}${process.env.DB_NAME}`)
            console.log("Database connected successfully")
            app.listen(process.env.PORT || 5000, "0.0.0.0", () => {
                console.log("Server is running on port :", process.env.PORT);
            })
        } catch (error) {
            console.log("MongoDB connection Failed:", error);
        }

    })();




