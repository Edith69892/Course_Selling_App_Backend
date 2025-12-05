import { Router } from "express";

const router = Router()

router.route("/signUp").post()
router.route("/signIn").post()
router.route("/purches").get()


export default router;