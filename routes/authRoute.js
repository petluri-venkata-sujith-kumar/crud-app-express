import express from "express";
import { login, register } from "../controller/auth.js";
import { profile } from "../controller/profile.js";
import { Protect, ROLE } from "../middleware/auth-middleware.js";

const router = express.Router();

router.route("/auth/register").post(register);
router.route("/auth/login").post(login);
router.route("/users/profile").get(Protect, ROLE("publisher"), profile);

export { router as authRouter };
