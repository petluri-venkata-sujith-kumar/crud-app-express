import express from "express";
import { login, register } from "../controller/auth.js";

const router = express.Router();

router.route("/auth/register").post(register);
router.route("/auth/login").post(login);

export { router as authRouter };
