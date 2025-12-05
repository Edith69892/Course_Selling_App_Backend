import mongoose, { Schema } from "mongoose";

const userSchema = new Schema({
    firstName: {
        type: String,
        require: true,
        trim: true,
        index: true,
    },

    lastName: {
        type: String,
        require: true,
        trim: true,
        index: true,
    },

    email: {
        type: String,
        require: true,
        trim: true,
        unique: true
    },

    password: {
        type: String,
        require: true,
        unique: true
    }
}, { timestamps: true })

export const User = mongoose.model("User", userSchema)