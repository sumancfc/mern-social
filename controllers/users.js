const User = require("../models/User");
const asyncHandler = require("express-async-handler");
const gravatar = require("gravatar");
const { generateToken } = require("../utils/generateToken");

//User Register
exports.register = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;

  const userExist = await User.findOne({ email });

  if (userExist) {
    res.status(400);
    throw new Error("User already present");
  }

  const avatar = gravatar.url(email, {
    s: "200", // Size
    r: "pg", // Rating
    d: "mm", // Default
  });

  const user = await User.create({
    name,
    email,
    password,
    avatar,
  });

  if (user) {
    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      token: generateToken(user._id),
    });
  } else {
    res.status(400);
    throw new Error("Invalid user");
  }
});
