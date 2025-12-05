import app from "./app.js"
import mongoose from "mongoose";

mongoose.connect(`${process.env.MONGO_URI}${process.env.DB_NAME}`)


