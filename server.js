import express from "express";
import cors from "cors";
import { PORT } from "./config/config.js";
import { dbConnection } from "./config/db.js";
import { router } from "./routes/PostRoute.js";
import { authRouter } from "./routes/authRoute.js";
const app = express();

let startServer = async () => {
  // Connect to the database
  dbConnection();

  //middleware
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  app.use(express.static("public"));
  app.use(cors());

  // app.use("/api", router);

  app.use("/api", authRouter);
  //listen to the server
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
};

startServer();
