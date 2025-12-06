import {asyncHandler} from "../utils/asyncHandler.js"
import { ApiError } from "../utils/ApiError.js"
import {z} from "zod"
import bcrypt from "bcryptjs"
import { User } from "../models/user.model.js"

const signUp = asyncHandler(async (req,res,next) => {
    const requiredBody = z.object({
        firstName :  z.string().min(3,"firstName must be at least 3 characters long."),
        lastName :  z.string().min(3,"lastName must be at least 3 characters long."),
        email : z.string().email("Invalid email address."),
        password : z.string().min(8, 'Password must be at least 8 characters long')
    })

    let validateData =  requiredBody.safeParse(req.body);

    if(!validateData.success){
        res.json({
            message: "Invalide input",
            error : validateData.error
        })
        return
    }
    

    const firstName = req.body.firstName
    const lastName = req.body.lastName
    const email = req.body.email
    const password = req.body.password

    const existingUser = User.findOne({
        email : email
    })

    if(existingUser){
        throw new ApiError(400, "User already exist.")
    }

    const hashPassword = await bcrypt.hash(password,10);

    const user = await User.create({
        firstName : firstName,
        lastName : lastName,
        email : email,
        password : hashPassword
    })

    const registeredUser = await User.findById(user._id).select("-password");

    if(!registeredUser){
        throw new ApiError(400, "User not found.")
    }

    return res
    .status(201)
    .json({message: "User registered successfully.", user : registeredUser})
})