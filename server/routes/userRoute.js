const express = require("express");
const {
  showUsers,
  getUserByEmail,
  createUser,
  loginMethod,
} = require("../controllers/UserController");
const router = express.Router();

router.route("/").get(showUsers).post(createUser);
router.route("/:email").get(getUserByEmail);
router.route("/login").post(loginMethod);
module.exports = router;
