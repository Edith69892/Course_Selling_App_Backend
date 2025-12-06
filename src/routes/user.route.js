import { Router } from "express";
import { signUp, signIn } from "../controllers/user.controller.js";

const router = Router()

router.route("/signUp").post(signUp)

router.route("/signIn").post(signIn)
router.route("/purches").get((req, res) => {

})


export default router;