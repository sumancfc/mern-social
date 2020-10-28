const router = require("express").Router();
const {
  userSigninValidator,
  userSigninValidator,
} = require("../validators/auth");
const { runValidation } = require("../validators");

router.get("/", (req, res) => {
  res.send("User ");
});

module.exports = router;
