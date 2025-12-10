import UserSchemaModel from "../models/UsersSchema.js";

// @desc POst routes
// @access public
// @route /api/auth/register
// @endpoint http://localhost:3000/api/auth/register
// it has request payload

export const register = async (req, res, next) => {
  try {
    const payload = req.body;
    const user = await UserSchemaModel.create(payload);
    res.status(201).json({
      message: "user successfully registered",
      responseObject: user,
    });
  } catch (err) {
    console.error(err);
  }
};
