import { CourseModel } from "../../models/courseSchema";
import UserSchemaModel from "../../models/UsersSchema";
/*
------@DESC POST ROUTES---------
@create course
@ACCESS PRIVATE
@ROUTE /api/course/create-course
@ROLE ['publisher','admin']
@ENDPOINT http://www.localhost:3000/api/course/create-course
@CONTENT-TYPE: application/json
*/

export const CreateCourseController = async (req, res, next) => {
  try {
    // const payload = req.body;
    const { course_title, body, avatar } = req.body;

    //fetch id
    let user = await UserSchemaModel.findById(req.user.id).select("-password");
    const course = await CourseModel.create({
      course_title,
      body,
      avatar,
      user,
    });
    res.status(201).json({
      message: "course successfully created",
      responseObject: course,
    });
  } catch (err) {
    console.error(err);
  }
};
