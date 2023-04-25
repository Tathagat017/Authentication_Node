const express = require("express");
const userRouter = express.Router();
const { userModel } = require("../Model/userModel");
userRouter.post("/register", async (req, res) => {
  //logic
  res.status(200).send("registered successfully!");
});

userRouter.post("/login", async (req, res) => {
  //logic
  res.status(200).send("login successful!");
});

module.exports = { userRouter };
