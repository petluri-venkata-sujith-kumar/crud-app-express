const mongoose = require("mongoose");
const { MONGODB_URL } = require("./config");
const dbConnection = async () => {
  await mongoose.connect(MONGODB_URL);
  console.log("MongoDB connected");
};
module.exports = { dbConnection };
