import { ObjectId } from "mongodb";
import mongoose from "mongoose";
import { v4 as uuidv4 } from "uuid";
uuidv4();

const dataSchema = mongoose.Schema(
  {
    username: {
      type: String,
      required: [true, "Please add the username"],
    },
    site: {
      type: String,
      required: [true, "Please add the site url"],
    },
    password: {
      type: String,
      required: [true, "Please add the data password"],
    },
  },
  {
    timestamps: true,
  }
);

const data = mongoose.model("Data", dataSchema);

export default data;
