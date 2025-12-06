import { asyncHandler } from "../utils/asyncHandler.js"
import { ApiError } from "../utils/ApiError.js"
import { z } from "zod";
import jwt from "jsonwebtoken"
import bcrypt from "bcryptjs"
import { User } from "../models/user.model.js"
import { Admin } from "../models/admin.model.js";

const signUp = asyncHandler(async (req, res, next) => {
    const signupSchema = z.object({
        firstName: z.string().min(3, "firstName must be at least 3 characters long."),
        lastName: z.string().min(3, "lastName must be at least 3 characters long."),
        email: z.string().email("Invalid email address."),
        password: z.string().min(8, 'Password must be at least 8 characters long')
    })

    let validateData = signupSchema.safeParse(req.body);

    if (!validateData.success) {
        console.error(validateData.error.issues)
        res.json({
            message: "Invalide input",
            error: validateData.error
        })
        return
    }


    const firstName = req.body.firstName
    const lastName = req.body.lastName
    const email = req.body.email
    const password = req.body.password

    const existingAdmin = await Admin.findOne({
        email: email
    })

    if (existingAdmin) {
        throw new ApiError(400, "User already exist.")
    }

    const hashPassword = await bcrypt.hash(password, 10);

    const admin = await Admin.create({
        firstName: firstName,
        lastName: lastName,
        email: email,
        password: hashPassword
    })

    const registeredAdmin = await Admin.findById(admin._id).select("-password");

    if (!registeredAdmin) {
        throw new ApiError(400, "Admin not found.")
    }

    return res
        .status(201)
        .json({ message: "Admin registered successfully.", admin: registeredAdmin })
})

const signIn = asyncHandler(async (req, res, next) => {

    const signInSchema = z.object({
        email: z.string().email("Invalid email address format"),
        password: z.string().min(1, "Password cannot be empty")
    });

    let validateData = signInSchema.safeParse(req.body);

    if (!validateData.success) {
        res.json({
            message: "Invalide input",
            error: validateData.error
        })
        return
    }

    const email = req.body.email;
    const password = req.body.password;

    const admin = await Admin.findOne({
        email: email
    })

    if (!admin) {
        throw new ApiError(400, "Admin not found.");
    }

    //check password

    const verifyPassword = await bcrypt.compare(password, admin.password);

    if (!verifyPassword) {
        throw new ApiError(401, "Unauthorized access , password incoorect.")
    }

    const token = jwt.sign(
        {
            _id: admin._id
        },
        process.env.JWT_ADMIN_SECRET
    );

    res.status(200).json({ message: "Login successfully.", token: token })
})

export { signUp, signIn }