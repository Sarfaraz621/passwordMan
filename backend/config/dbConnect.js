/* eslint-disable no-undef */
import mongoose from "mongoose";
import { config } from "dotenv";

config();
const dbConnect = async () => {
  try {
    const connect = await mongoose.connect(process.env.connection_string);
    console.log(
      "Database Connected : ",
      connect.connection.host,
      connect.connection.name
    );
  } catch (err) {
    console.log(err);
    process.exit(1);
  }
};

export default dbConnect;
