/* eslint-disable no-undef */
import express from "express";
import cors from "cors";
import { config } from "dotenv";
import dbConnect from "./config/dbConnect.js";
import errorHandler from "./middlewares/errorHandler.js";
import authRouter from "./routes/authRoute.js";
import apiData from "./routes/dataRoute.js";
import path from "path";

config();
dbConnect();
const app = express();
const port = process.env.PORT || 5001;
const _dirname = path.resolve();

app.use(express.json());
app.use(cors());
app.use(errorHandler);
app.use("/api/auth", authRouter);
app.use("/api", apiData);

app.use(express.static(path.join(_dirname, "frontend/dist")));

app.get("*", (req, res) => {
  res.sendFile(path.join(_dirname, "frontend", "dist", "index.html"));
});

app.listen(port, () => {
  console.log(`Example app listening on port http://localhost:${port}`);
});
