const User = require("../models/UserModel");

const showUsers = (req, res) =>
  User.find()
    .then((users) =>
      res
        .status(201)
        .json({ success: true, messsage: "Show all Users", data: users })
    )
    .catch((err) =>
      res.status(500).json({
        success: false,
        message: "server error. Please try again.",
        error: err.message,
      })
    );

const getUserByEmail = (req, res) =>
  User.findOne({ email: req.params.email })
    .then((user) =>
      res.status(201).json({
        success: true,
        codeStatus: 201,
        messsage: `Show Users with email ${req.params.email}`,
        data: user,
      })
    )
    .catch((err) =>
      res.status(500).json({
        success: false,
        message: "server error. Please try again.",
        error: err.message,
      })
    );

const createUser = (req, res) => {
  const user = new User({ ...req.body, passwordHash: bcr });
  return user
    .save()
    .then((savedUser) =>
      res.status(201).json({
        success: true,
        codeStatus: 201,
        messsage: "Show all Users",
        data: savedUser,
      })
    )
    .catch((err) =>
      res.status(500).json({
        success: false,
        message: "server error. Please try again.",
        error: err.message,
      })
    );
};
module.exports = { showUsers, getUserByEmail, createUser };
