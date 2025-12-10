// const mongoose = require("mongoose");
import { connect } from "mongoose";
import { MONGODB_URL } from "./config.js";
// const { MONGODB_URL } = require("./config");
export const dbConnection = async () => {
  await connect(MONGODB_URL);
  console.log("MongoDB connected");
};
// module.exports = { dbConnection };
