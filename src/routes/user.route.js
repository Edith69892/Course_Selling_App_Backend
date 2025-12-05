import { Router } from "express";

const router = Router()

router.route("/signUp").post((req,res) => {
    res.json({
        message : "Sign Up success"
    })
})

router.route("/signIn").post((req,res) => {
    res.json({
        message : ""
    })
})
router.route("/purches").get((req,res) => {
    
})


export default router;