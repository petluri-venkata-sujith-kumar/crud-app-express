import express from "express";
import { register } from "../controller/auth.js";

const router = express.Router();

router.route("/auth/register").post(register);

export { router as authRouter };
