const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/UserModel");

const showUsers = (req, res) =>
  User.find()
    .select("-_id -passwordHash")
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
    .select("-_id -passwordHash")
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
  const user = new User({
    ...req.body,
    passwordHash: bcrypt.hashSync(req.body.passwordHash, 10),
  });
  return user
    .save()
    .then((savedUser) =>
      res.status(201).json({
        success: true,
        codeStatus: 201,
        messsage: `User Created with id ${savedUser._id}`,
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

const loginMethod = (req, res) =>
  User.findOne({ email: req.body.email })
    .then((user) => {
      if (!user)
        return res.status(400).json({
          success: false,
          message: `user with email ${req.body.email} not found!`,
        });

      if (bcrypt.compareSync("" + req.body.password, user.passwordHash)) {
        const token = jwt.sign(
          { userID: user._id },
          process.env.API_SECRET_KEY,
          { expiresIn: "1d" }
        );
        return res.status(200).json({
          success: true,
          message: `user with email ${req.body.email} is authenticated!`,
          data: user,
          token,
        });
      }
      return res.status(400).json({
        success: false,
        message: `user with wrong password !`,
      });
    })
    .catch((err) =>
      res.status(500).json({
        success: false,
        message: "server error. Please try again.",
        error: err.message,
      })
    );

module.exports = { showUsers, getUserByEmail, createUser, loginMethod };
