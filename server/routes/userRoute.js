const express = require("express");
const {
  showUsers,
  getUserByEmail,
  createUser,
} = require("../controllers/UserController");
const router = express.Router();

router.route("/").get(showUsers).post(createUser);
router.route("/:email").get(getUserByEmail);

module.exports = router;
