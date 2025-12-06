import { Router } from "express";

const router = Router()

router.route("/signUp").post((req, res) => {
    res.json({
        message: "Sign Up success"
    })
})

router.route("/signIn").post((req, res) => {
    res.json({
        message: ""
    })
})
router.route("/").post((req, res) => {
    res.json({
        message : "Buy course"
    })
})

router.route("/").put((req, res) => {
    res.json({
        message: "Sign Up success"
    })
})

router.route("/bulk").get((req, res) => {
    res.json({
        message: ""
    })
})



export default router;