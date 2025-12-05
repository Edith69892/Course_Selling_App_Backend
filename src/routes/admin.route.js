import { Router } from "express";

const router = Router()

router.route("/updateCourse").put((req,res) => {
    res.json({
        message : "Sign Up success"
    })
})

router.route("/bulkCourse").get((req,res) => {
    res.json({
        message : ""
    })
})



export default router;