import verify from "jsonwebtoken";
import { JWT_SECRET } from "../config/config.js";
import UserSchemaModel from "../models/UsersSchema.js";
export const Protect = async (req, res, next) => {
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    token = req?.headers?.authorization?.split(" ")?.[1];
  }
  if (!token) {
    return new Error("not Authorized to access this route");
  }
  try {
    console.log("entered================", token);
    //jwt verify or decode token
    const decode = verify(token, JWT_SECRET);
    console.log("decode", decode);
    req.user = await UserSchemaModel.findById(decode.id);
    next();
  } catch (error) {
    console.error(error);
    return next(new Error("not authorized to access this route"));
  }
};

//Grant access to specific roles
export const ROLE = (...roles) => {
  console.log(roles);
  return (req, res, next) => {
    console.log(req.user.role);
    if (!roles.includes(req?.user?.role)) {
      return next(
        res.status(401).json({
          message: `User role ${req?.user?.role} is not authorized to access this route`,
        })
      );
    }
    next();
  };
};
