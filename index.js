import express from "express";
import cors from "cors";
import { PORT } from "./config/config.js";
import { dbConnection } from "./config/db.js";
// const cors = require("cors");
import { router } from "./routes/PostRoute.js";
// const { PORT } = require("./config/config");
// const { dbConnection } = require("./config/db");
// const PostRoute = require("./routes/PostRoute");
const app = express();

let startServer = async () => {
  // Connect to the database
  dbConnection();

  //middleware
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  app.use(express.static("public"));
  app.use(cors());

  app.use("/api", router);
  //listen to the server
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
};

startServer();
