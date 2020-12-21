const User = require("../models/User");
const { errorHandler } = require("../helpers/errorHandler");

//create user
exports.createUser = async (req, res) => {
  const user = new User(req.body);
  try {
    await user.save();

    return res.status(200).json({
      message: "Successfully signed up!",
    });
  } catch (err) {
    return res.status(400).json({
      error: errorHandler(err),
    });
  }
};

//get all users
exports.getUsers = async (req, res) => {
  try {
    let users = await User.find().select("_id name email createdAt");

    res.json(users);
  } catch (err) {
    return res.status(400).json({
      error: errorHandler(err),
    });
  }
};

//get user id
exports.userId = async (req, res, next, id) => {
  try {
    let user = await User.findById(id);

    if (!user)
      return res.status("400").json({
        error: "User not found",
      });

    req.profile = user;

    next();
  } catch (err) {
    return res.status("400").json({
      error: "Could not retrieve user",
    });
  }
};

//get user by id
exports.getUser = (req, res) => {
  req.profile.hashed_password = undefined;
  req.profile.salt = undefined;
  return res.json(req.profile);
};

//update user
exports.updateUser = async (req, res) => {
  try {
    const user = await User.findOneAndUpdate(
      { _id: req.profile._id },
      { $set: req.body },
      { new: true }
    )
      .select("_id name email createdAt")
      .exec();

    res.json(user);
  } catch (err) {
    return res.status(400).json({
      error: "You are not authorized to this action",
    });
  }
};

//delete user
exports.deleteUser = async (req, res) => {
  try {
    const user = req.profile;
    const deletedUser = await user.remove();
    deletedUser.hashed_password = undefined;
    deletedUser.salt = undefined;
    res.json(deletedUser);
  } catch (err) {
    return res.status(400).json({
      error: errorHandler(err),
    });
  }
};
