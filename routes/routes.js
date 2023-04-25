const express = require("express");
const userRouter = express.Router();
const jwt = require("jsonwebtoken");
const { userModel } = require("../Model/userModel");
userRouter.post("/register", async (req, res) => {
  //logic
  try {
    const user = new userModel(req.body);
    await user.save();
    res.status(200).send({ message: "registered successfully!" });
  } catch (err) {
    res.status(404).send({ message: err.message });
  }
});

userRouter.post("/login", async (req, res) => {
  const { email, password } = req.body;
  var token = jwt.sign({ course: "backend" }, "secretkey");
  try {
    console.log(password, email);
    let user = await userModel.findOne({ email, password });
    console.log(user);
    if (user) {
      res.status(200).send({ msg: "Login successful", token: token });
    } else {
      res.status(404).send({ message: "credentials not found" });
    }
  } catch (err) {
    res.status(404).send({ message: err.message });
  }
});

module.exports = { userRouter };
