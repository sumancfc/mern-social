const router = require("express").Router();
const {
  userSignupValidator,
  userSigninValidator,
} = require("../validators/auth");
const { runValidation } = require("../validators");
const { register, login } = require("../controllers/users");

router.post("/register", userSignupValidator, runValidation, register);
router.post("/login", userSigninValidator, runValidation, login);

module.exports = router;
