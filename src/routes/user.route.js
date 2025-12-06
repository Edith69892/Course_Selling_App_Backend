import { Router } from "express";
import { signUp, signIn , getPurches } from "../controllers/user.controller.js";
import { userAuth } from "../middlewares/userAuth.middleware.js";

const router = Router()

router.route("/signUp").post(signUp)

router.route("/signIn").post(signIn)
router.route("/purches").get(userAuth,getPurches)


export default router;