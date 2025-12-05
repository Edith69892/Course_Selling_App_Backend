import { Schema } from "mongoose";
import mongoose from "mongoose";

const purchaseSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: "User"
    },

    course: {
        type: Schema.Types.ObjectId,
        ref: "Course"
    }
})