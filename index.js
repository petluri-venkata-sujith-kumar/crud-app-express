const express = require("express");
const cors = require("cors");
const { PORT } = require("./config/config");
const { dbConnection } = require("./config/db");
const PostRoute = require("./routes/PostRoute");
const app = express();

let startServer = async () => {
  // Connect to the database
  dbConnection();

  //middleware
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  app.use(express.static("public"));
  app.use(cors());

  app.use("/api", PostRoute);
  //listen to the server
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
};

startServer();
