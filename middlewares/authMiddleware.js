const jwt = require("jsonwebtoken");
const asycnHandler = require("express-async-handler");
const User = require("../model/User");

exports.auth = asycnHandler(async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      token = req.headers.authorization.split(" ")[1];

      const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);

      req.user = await User.findById(decoded.id).select("-password");

      next();
    } catch (error) {
      console.error(error);
      res.status(401);
      throw new Error("No authorized, access denied");
    }
  }

  if (!token) {
    res.status(401);
    throw new Error("No authorized, no token");
  }
});

exports.isAdmin = (req, res, next) => {
  if (req.user && req.user.isAdmin) {
    next();
  } else {
    res.status(401);
    throw new Error("No Admin, access denied");
  }
};
