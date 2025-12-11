import { JWT_COOKIES_EXPIRE, NODE_ENV } from "../config/config.js";
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

/*
------@DESC POST ROUTES---------
@LOGIN
@ACCESS PUBLIC
@ROUTE /api/auth/LOGIN
@ENDPOINT http://www.localhost:3000/api/auth/LOGIN
@IT HAS REQ PAYLOAD
@CONTENT-TYPE: application/json
*/
export const login = async (req, res, next) => {
  try {
    let { email, password } = req.body;
    //custom validation check fields are empty or not
    if (!email || !password) {
      // return new Error("email and password are required");
      return res
        .status(400)
        .json({ message: "email and password are required" });
    }
    //check email exist or not in the db
    //in select +password is includes if -password is exlude it
    let user = await UserSchemaModel.findOne({ email }).select("+password");
    if (!user) {
      return res.status(400).json({
        message: "Email not exists in our database please create an account",
      });
    }
    //check password
    //fetdch password from database
    const isMatch = await user.matchPassword(password);
    if (!isMatch) {
      return res.status(400).json({
        message: "Invalid Password",
      });
    }
    //send response to user and store token
    sendTokenResponse(user, 201, res);
  } catch (error) {
    console.error(error);
  }
};
const sendTokenResponse = (user, statusCode, res) => {
  //create a token
  const token = user.getSignedJwtToken();
  const options = {
    expires: new Date(
      Date.now() + JWT_COOKIES_EXPIRE * 1 * 24 * 60 * 60 * 1000
    ),
    httpOnly: true,
  };
  if (NODE_ENV === "production") {
    options.secure = true;
  }
  res
    .status(statusCode)
    .cookie("token", token, options)
    .json({ success: true, token });
};
