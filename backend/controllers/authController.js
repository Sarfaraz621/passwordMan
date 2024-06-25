import asyncHandler from "express-async-handler";
import User from "../models/userModel.js";

const home = asyncHandler(async (req, res) => {
  try {
    res.status(200).json({ msg: "Welcome to our home page" });
  } catch (error) {
    console.log(error);
  }
});

// *-------------------
// Registration Logic
// *-------------------
const readUser = asyncHandler(async (req, res) => {
  const dataset = await User.find();
  res.status(200).json(dataset);
});
const createUser = asyncHandler(async (req, res) => {
  try {
    console.log(req.body);
    const { username, email, phone, password } = req.body;

    const userExist = await User.findOne({ email: email });

    if (userExist) {
      return res.status(400).json({ msg: "email already exists" });
    }
    const newUser = new User({ username, email, phone, password });
    const savedUser = await newUser.save();

    res.status(201).json(savedUser);
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
});

export { home, createUser, readUser };
