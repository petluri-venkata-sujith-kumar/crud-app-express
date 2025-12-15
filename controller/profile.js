import UserSchemaModel from "../models/UsersSchema.js";

/*
------@DESC GET ROUTES---------
@profile
@ACCESS PRIVATE
@ROUTE /api/user/profile
@ENDPOINT http://www.localhost:3000/api/user/profile
@CONTENT-TYPE: application/json
*/

export const profile = async (res, req, next) => {
  try {
    let profileData = await UserSchemaModel.findOne({ _id: req.user.id });
    res.status(200).json({
      success: true,
      message: "profile fetched successfully",
      payload: profileData,
    });
  } catch (err) {
    console.error(err);
  }
};
