const router = require("express").Router();
const {
  userSignupValidator,
  userSigninValidator,
} = require("../validators/auth");
const { runValidation } = require("../validators");
const { register } = require("../controllers/users");

router.post("/register", userSignupValidator, runValidation, register);

module.exports = router;
