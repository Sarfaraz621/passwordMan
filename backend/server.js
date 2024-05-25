/* eslint-disable no-undef */
import express from "express";
import cors from "cors";
import { config } from "dotenv";
import dbConnect from "./config/dbConnect.js";
import errorHandler from "./middlewares/errorHandler.js";
import apiData from "./routes/dataRoute.js";

config();
dbConnect();
const app = express();
const port = process.env.PORT || 5001;

app.use(express.json());
app.use(cors());
app.use(errorHandler);
app.get("/", (req, res) => {
  res.send(`${process.env.PORT}`);
});
app.use("/api", apiData);

//////////////////**********HEROKU************//////////////
if (process.env.NODE_ENV === "production") {
  app.use(express.static("frontend/build"));
  const path = require("path");
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "frontend", "build", "index.html"));
  });
}
/////////////////////////////////////////////////

app.listen(port, () => {
  console.log(`Example app listening on port http://localhost:${port}`);
});
