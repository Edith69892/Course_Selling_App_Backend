import mongoose, {Schema} from "mongoose";

const courseSchema = new Schema({
    title: {
        type: String,
        require: true,
        trim: true,
        index: true,
    },

    description: {
        type: String,
        require: true,
        trim: true,
        index: true,
    },

    price: {
        type: Number,
        require: true,
        trim: true,
        unique: true
    },

    imgUrl: {
        url: { type: String, required: true },
      public_id: { type: String, required: true },
    },

    creator :{
        type : Schema.Types.ObjectId,
        ref : "Admin"
    }

}, { timestamps: true })

export const Course = mongoose.model("Course", courseSchema)
