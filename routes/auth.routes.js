// const {Router} = require("express")
// const router = Router()

// const express = require("express")
// const router = express.Router()
const router = require("express").Router();
const User = require("../models/User.model");
const bcrypt = require("bcryptjs");

router.get("/signin", (req, res) => {
  res.render("signup");
});

router.post("/signin", (req, res) => {
  const { username, password } = req.body;
  //   console.log("req.body:", req.body);
  if (!username || !password) {
    res.render("signup", { errorMessage: "Please fill out all fields" });
    return;
  }

  User.findOne({ username }).then((userBack) => {
    if (userBack) {
      //   this only happens if youre trying to signup a user, and that username already exists
      res.render("signup", { errorMessage: "Username already taken" });
      return;
    }

    const hashingAlgorithm = bcrypt.genSaltSync(10);
    console.log("hashingAlgorithm:", hashingAlgorithm);
    const hashedPassword = bcrypt.hashSync(password, hashingAlgorithm);

    User.create({
      username,
      password: hashedPassword,
    }).then((newUser) => {
      console.log("newUser:", newUser);
      res.redirect("/");
    });
  });
});

module.exports = router;
