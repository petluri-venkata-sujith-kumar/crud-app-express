// const mongoose = require("mongoose");
import { connect } from "mongoose";
import { MONGODB_URL, NODE_ENV, CLOUD_MONGODB_URL } from "./config.js";
// const { MONGODB_URL } = require("./config");
export const dbConnection = async () => {
  if (NODE_ENV === "production") {
    await connect(CLOUD_MONGODB_URL);
    console.log("Cloud MongoDB connected");
  } else if (NODE_ENV === "development") {
    await connect(MONGODB_URL);
    console.log("Local MongoDB connected");
  }
};
// module.exports = { dbConnection };
