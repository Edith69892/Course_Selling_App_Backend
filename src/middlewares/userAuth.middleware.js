import { User } from "../models/user.model";
import { ApiError } from "../utils/ApiError";
import { asyncHandler } from "../utils/asyncHandler";
import jwt from "jsonwebtoken"

export const userAuth = asyncHandler(async(req,res,next) => {
    const token = req.headers.token;

    if(!token){
        throw new ApiError(401, "Invalid Token Please check it.")
    }

    try {
        const decodeToken =  jwt.verify(token, process.env.JWT_USER_SECRET)
    
        const user = await User.findById(decodeToken._id).select("-password");
    
        if(!user){
            throw new ApiError(401, "User not found");
        }
        req.user = user
        next()
    } catch (error) {
         throw new ApiError(401, "Invalid or expired token");
    }
}) 