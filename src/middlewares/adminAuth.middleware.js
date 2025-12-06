import { Admin } from "../models/admin.model";
import { User } from "../models/user.model";
import { ApiError } from "../utils/ApiError";
import { asyncHandler } from "../utils/asyncHandler";
import jwt from "jsonwebtoken"

export const adminAuth = asyncHandler(async(req,_,next) => {
    const token = req.headers.token;

    if(!token){
        throw new ApiError(401, "Invalid Token Please check it.")
    }

    try {
        const decodeToken =  jwt.verify(token, process.env.JWT_ADMIN_SECRET)
    
        const admin = await Admin.findById(decodeToken._id).select("-password");
    
        if(!admin){
            throw new ApiError(401, "Admin not found");
        }
        req.admin = admin
        next()
    } catch (error) {
         throw new ApiError(401, "Invalid or expired token");
    }
}) 