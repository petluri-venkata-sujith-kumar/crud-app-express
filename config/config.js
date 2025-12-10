// require("dotenv").config();
import dotenv from "dotenv";

dotenv.config();

// module.exports = {
//   PORT: process.env.PORT,
//   MONGODB_URL: process.env.MONGODB_URL,
// };

export const PORT = process.env.PORT;
export const MONGODB_URL = process.env.MONGODB_URL;
export const NODE_ENV = process.env.NODE_ENV;
export const CLOUD_MONGODB_URL = process.env.CLOUD_MONGODB_URL;
