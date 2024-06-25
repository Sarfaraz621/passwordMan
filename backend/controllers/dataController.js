import asyncHandler from "express-async-handler";
import Data from "../models/dataModel.js";
import { v4 as uuidv4 } from "uuid";

const readData = asyncHandler(async (req, res) => {
  const dataset = await Data.find();
  res.status(200).json(dataset);
});

const createData = async (req, res) => {
  const { username, site, password } = req.body;

  if (!username || !site || !password) {
    res.status(400).json({ error: "All fields are mandatory!" });
    return;
  }

  const uuid = uuidv4(); // Generate UUID

  try {
    const newData = new Data({ username, site, password, uuid });
    const savedData = await newData.save();
    res.status(201).json(savedData);
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};

const updateData = asyncHandler(async (req, res) => {
  const data = await Data.findById(req.params.id);
  if (!data) {
    res.status(404);
    throw new Error("No such data!");
  }
  const updatedData = await Data.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });
  res.status(200).json(updatedData);
});

const deleteAll = asyncHandler(async (req, res) => {
  try {
    await Data.deleteMany({});
    res.status(200).json({ message: "All documents deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Failed to delete documents", error });
  }
});
////
const deleteData = asyncHandler(async (req, res) => {
  const data = await Data.findById(req.params.id); // Use findById with _id
  if (!data) {
    res.status(404);
    throw new Error("No such data!");
  }
  await Data.findByIdAndDelete(req.params.id); // Use findByIdAndDelete with _id
  res.status(200).json(data);
});
/////////////////////////////////////////////////////
const readDataById = asyncHandler(async (req, res) => {
  const data = await Data.findById(req.params.id);
  if (!data) {
    res.status(404);
    throw new Error("No such data!");
  }
  res.status(200).json(data);
});

export {
  readData,
  createData,
  updateData,
  deleteData,
  deleteAll,
  readDataById,
};
