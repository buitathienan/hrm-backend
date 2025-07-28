import express from "express";
import { AppDataSource } from "./config/data-source";
const app = express();
const port = "3000";

AppDataSource.initialize()
  .then(() => {
    console.log("Data initialized successfully!");
    app.listen(port, () => {
      console.log(`Sever listening on port ${port}`);
    });
  })
  .catch((err) => console.log("Error on creating data source.", err));
