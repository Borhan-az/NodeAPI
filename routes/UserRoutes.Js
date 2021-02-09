const express = require("express");
const Mongoose = require("mongoose");
const router = express.Router();
const User = require("../models/User");
const {
  ValidateUser,
  ValidateUserUpdate,
} = require("../validators/UserValidator.JS");

router.get("/api/Users", async (req, res) => {
  const users = await User.find();
  res.send(users);
});

router.get("/api/User/:id", async (req, res) => {
  if (!Mongoose.isValidObjectId(req.params.id))
    return res.status(400).send("Id is Not Valid");
  const user = await User.findById(req.params.id);
  if (user) res.send(user);
  else res.status(404).send("User Not Found");
});

router.post("/api/user", async (req, res) => {
  try {
    
    const { error } = ValidateUser(req.body);
  
    if (error) return res.status(400).send({ message: error.message });
    const user = new User({
      name: req.body.name,
    });
    await user.save();
    res.send(user);
  } catch (error) {
    console.log(error.message);
    res.send(error.message);
  }
});

router.put("/api/user/:userId", async (req, res) => {
  try {
    // console.log(req.params.userId);
    console.log(req.body.userId);
    const { error } = ValidateUserUpdate({
      ...req.body,
      userId: req.params.userId,
    });
    if (error) return res.status(400).send({ message: error.message });
    
    let user = await User.findByIdAndUpdate(req.params.userId, req.body);
    if (!user) return res.status(404).send({ message: "user Not Found" });
    user = await user.save();
    res.send(user);
  } catch (error) {
   console.log(error.message); 
  }
});

router.delete("/api/user/:userId", async (req, res) => {
  await User.findByIdAndRemove(req.params.userId);
  res.status(200).send("deleted successfully");
});
module.exports = router;
