import express from "express";
import { Protect } from "../middleware/auth-middleware.js";
import { CreateCourseController } from "../controller/courses/coursesController.js";

const router = express.Router();

router.route("/course/create-course").post(Protect, CreateCourseController);

export { router as courseRouter };
